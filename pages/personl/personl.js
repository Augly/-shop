// pages/personl/personl.js
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

  },
  /**
   * 我的积分
   */
  to_point(){
    wx.navigateTo({
      url: '/pages/personl/points/points',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //收货地址
  to_adder(){
    wx.navigateTo({
      url: '/pages/personl/adder/adder',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 产品订单
   */
  to_product_ordel(){
    wx.navigateTo({
      url: '/pages/personl/product_ordel/product_ordel',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 服务订单
   */
  to_server(){
    wx.navigateTo({
      url: '/pages/personl/serve_ordel/serve_ordel',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 我的拼团
   */
  to_pt(){
    wx.navigateTo({
      url: '/pages/personl/Regiment/Regiment',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   *我的分销
   */
  to_myshare_ordel(){
    wx.navigateTo({
      url: '/pages/distribution/distribution',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
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