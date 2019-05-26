// pages/personl/distribution_ordel/distribution_ordel.js
let app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInit()
  },
  /**
   * 初始化数据
   * 
   */
  getInit() {
    app.config.ajax('GET', {
      token: wx.getStorageSync('token')
    }, `order/lowerorder`, (res) => {
      if (res.data.orders_data.length > 0) {
        let list = res.data.orders_data
        lisr.forEach(item => {
          item.orders = item.orders.map((citem) => {
            citem.payment_time = app.config.timeForm(citem.payment_time).chatTime.year + '/' + app.config.timeForm(citem.payment_time).chatTime.month + '/' + app.config.timeForm(citem.payment_time).chatTime.day + '  ' + app.config.timeForm(citem.payment_time).chatTime.hour + ':' + app.config.timeForm(citem.payment_time).chatTime.minute + ':00'
            return citem
          })
        });
        this.setData({
          list: list,
          ratio: res.data.ratio
        })
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