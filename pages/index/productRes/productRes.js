// pages/index/productRes/productRes.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    details: null,
    mask:false,
    car_count:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      goodId: options.goodId
    })
    this.getDetail(options)
    this.getFirst(options)
  },
  //加入购物车
  join_cart(){
    app.config.ajax('PUT', {
      token: wx.getStorageSync('token'),
    }, `shop/addcart/${this.data.goodId}`, (res) => {
      console.log(212)
      let car_count = this.data.car_count
      car_count++
      this.setData({
        car_count: car_count
      })
    })
  },
  //关闭弹框
  hidemask(){
    this.setData({
      mask:false
    })
  },
  //打开弹框
  showmask(){
    this.setData({
      mask: true
    })
  },
  //获取产品详情
  getDetail(options) {
    app.config.ajax('GET', {
      token: wx.getStorageSync('token'),
    }, `shop/details/${options.goodId}/${options.datatype}`, (res) => {
      this.setData({
        details: res.data.details,
        hot_data: res.data.hot_data,
        latest_data:   res.data.latest_data,
        car_count: res.data.car_count
      })
      this.goTop()
    })
  },
  getFirst(options) {
    app.config.ajax('GET', {
      token: wx.getStorageSync('token'),
    }, `shop/evaluates/${options.goodId}/1`, (res) => {
      this.setData({
        count: res.data.eval_count,
        list: res.data.evaluates
      })
    })
  },
  getId(e) {
    this.getDetail(e.detail)
    this.getFirst(e.detail)
    
  },
  //回到顶部
  goTop: function () { // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
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