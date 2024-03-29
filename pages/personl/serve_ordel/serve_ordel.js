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
      title: '待消费',
    }, {
      title: '已完成',
    }, {
      title: '售后',
    }]
  },
  tabChange(e) {
    this.setData({
      list: [],
      page: 1
    })
    if (e.target.dataset.id != this.data.tab_index) {
      this.setData({
        tab_index: e.target.dataset.id,
      })
    } else {
      this.getInit()
    }
  },
  /**
 * 评论订单
 */
  to_eval(e) {
    console.log(e)
    if (e.currentTarget.dataset.item.is_evaluate == 0) {
      wx.navigateTo({
        url: '/pages/personl/eva_ordel/eva_ordel?data=' + JSON.stringify(e.currentTarget.dataset.item),
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }

  },
  //申请售后
  sale(e) {
    // e.currentTarget.dataset.
    wx.navigateTo({
      url: `/pages/personl/service/service?orderid=${e.currentTarget.dataset.orderid}&goodid="${e.currentTarget.dataset.goodid}&datatype=${e.currentTarget.dataset.datatype}`,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 获取初始化数据
   */
  getInit() {
    config.ajax('GET', {
      token: wx.getStorageSync('token')
    }, `order/services/${this.data.tab_index}/${this.data.page}`, (res) => {
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
  /**
   * 取消订单
   */
  cendel_ordrl(e) {
    config.ajax('GET', {
      token: wx.getStorageSync('token')
    }, `order/cancel/${e.target.dataset.orderid}/0`, (res) => {
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
  pay(e) {
    config.ajax('POST', {
      token: wx.getStorageSync('token'),
      datatype: 0,
      out_trade_no: e.target.dataset.ordelno,
      totalprice: e.target.dataset.totalprice,
    }, `order/pay`, (res) => {
      config.pay(res.data, (res) => {

      })
    })
  },
  //申请售后
  after_Sale(e) {

  },
  //线下核销
  writeoff(e) {
    config.ajax('PUT', {
      token: wx.getStorageSync('token'),
    }, `order/writeoff/${e.currentTarget.dataset.orderid}/${e.currentTarget.dataset.id}/0`, (res) => {
      config.mytoast('核销成功!')
    })
  },
  //评价
  /**
   * 评论订单
   */
  to_eval(e) {
    console.log(e)
    if (e.currentTarget.dataset.item.is_evaluate == 0) {
      wx.navigateTo({
        url: '/pages/personl/eva_ordel/eva_ordel?data=' + JSON.stringify(e.currentTarget.dataset.item),
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }

  },
  swiperChange(e) {
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
    })
    this.getInit()
  },
  getmore(e) {
    console.log(1)
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
    this.getInit()
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