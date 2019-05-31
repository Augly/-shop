// pages/personl/subordinate/subordinate.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInit()
  },
  getInit() {
    app.config.ajax('GET', {
      token: wx.getStorageSync('token')
    }, `user/lowers/${this.data.page}`, (res) => {
      if (res.data.length > 0) {
        let list = this.data.list
        let arr = res.data.map((item) => {
          item.create_time = config.timeForm(item.create_time).chatTime.year + '/' + config.timeForm(item.create_time).chatTime.month + '/' + config.timeForm(item.create_time).chatTime.day
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
        app.config.mytoast('暂无更多数据~')
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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