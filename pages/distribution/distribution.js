// pages/personl/personl.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.gitInit()
  },
  gitInit() {
    app.config.ajax('GET', {
      token: wx.getStorageSync('token')
    }, 'user/userinfo', (res) => {
      console.log(res)
      this.setData({
        data: res.data[0]
      })
    })
  },
  sumbit_ordel(e) {
    wx.showLoading({
      title: '正在更新~',
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    wx.login({
      success: function (res) {
        app.config.ajax('POST', {
          token: wx.getStorageSync('token'),
          code: res.code,
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
          datatype: 1,
          lng: wx.getStorageSync('location').longitude,
          lat: wx.getStorageSync('location').latitude,
          nickname: e.detail.userInfo.nickName,
          headurl: e.detail.userInfo.avatarUrl,
          gender: e.detail.userInfo.gender
        }, `user/update`, (res) => {
          wx.hideLoading()
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 我的下级
   */
  to_child() {
    wx.navigateTo({
      url: '/pages/personl/subordinate/subordinate',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //分销记录
  to_record() {
    wx.navigateTo({
      url: '/pages/personl/distribution_ordel/distribution_ordel',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 推广海报
   */
  to_product_ordel() {
    wx.navigateTo({
      url: '/pages/personl/product_ordel/product_ordel',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
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