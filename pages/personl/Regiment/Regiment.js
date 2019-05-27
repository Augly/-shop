// pages/personl/serve_ordel/serve_ordel.js
const config = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 'serverOrdel',
    tab_index: 0,
    list: [],
    page: 1,
    tab: [{
      title: '全部',
    }, {
      title: '拼团中',
    }, {
      title: '拼团成功',
    }, {
      title: '拼团失败',
    }]
  },
  /**
   * 获取初始化数据
   */
  getInit() {
    config.ajax('GET', {
      token: wx.getStorageSync('token')
    }, `order/spells/${this.data.tab_index}/${this.data.page}`, (res) => {
      if (res.data.length > 0) {
        let list = this.data.list
        let arr = res.data.map((item) => {
          // item.start_time = setInterval((item) => {
          //   item.start_time
          // },1000)
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
  tabChange(e) {
    this.setData({
      tab_index: e.target.dataset.id,
      list: [],
      page: 1
    })
    this.getInit()
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