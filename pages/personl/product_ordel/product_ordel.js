// pages/personl/serve_ordel/serve_ordel.js
const config = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 'serverOrdel',
    tab_index: 0,
    page: 1,
    list: [],
    tab: [{
      title: '待付款',
    }, {
      title: '待发货',
    }, {
      title: '待收货',
    }, {
      title: '已完成',
    }, {
      title: '售后',
    }]
  },
  tabChange(e) {
    this.setData({
      tab_index: e.target.dataset.id,
      list: [],
      page: 1
    })
    this.getInit()
  },
  /**
   * 取消订单
   */
  cendel_ordrl(e){
    config.ajax('GET', {
      token: wx.getStorageSync('token')
    }, `order/cancel/${e.target.dataset.id}/0`, (res) => {
      let list = this.data.list
      list.splice(e.target.dataset.index, 1)
      this.setData({
        list: list
      })
    })
  },
  /**
   * 订单支付
   */
  pay(e){
    config.ajax('POST', {
      token: wx.getStorageSync('token'),
      datatype: 0,
      out_trade_no: e.target.dataset.ordelNo,
      totalprice: e.target.dataset.totalPrice,
    }, `order/pay`, (res) => {
      config.pay(res.data, (res) => {
        
      })
    })
  },
  /**
   * 确认收货
   */
  sureConfirm(e){
    config.ajax('PUT', {
      token: wx.getStorageSync('token'),
    }, `order/confirm/${e.target.dataset.id}/0`, (res) => {
      
    })
  },
  /**
   * 寄回商品
   */
  sendBack(e){
    config.ajax('POST', {
      token: wx.getStorageSync('token'),
    }, `order/confirm/${e.target.dataset.id}/0`, (res) => {
      
    })
  },
  getInit() {
    config.ajax('GET', {
      token: wx.getStorageSync('token')
    }, `order/goods/${this.data.tab_index}/${this.data.page}`, (res) => {
      if (res.data.length > 0) {
        let list = this.data.list
        let arr = res.data.map((item) => {
          // item.create_time = config.timeForm(item.create_time).chatTime.year + '/' + config.timeForm(item.create_time).chatTime.month + '/' + config.timeForm(item.create_time).chatTime.day + '  ' + config.timeForm(item.create_time).chatTime.hour + ':' + config.timeForm(item.create_time).chatTime.minute + ':00'
          return item
        })
        let page = this.data.page
        page++
        list.push.apply(list, arr);
        this.setData({
          page: page,
          list: list
        })
      } else {
        config.mytoast('暂无更多数据~')
      }
    })
  },
  swiperChange(e) {
    console.log(e)
    this.setData({
      tab_index: e.detail.current,
      list: [],
      page: 1
    })
    this.getInit()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    config.rem(78, (res) => {
      this.setData({
        myheight: res
      })
      this.getInit()
    })
  },
  getmore(e) {
    this.getInit()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getId(e) {
    console.log(e)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})