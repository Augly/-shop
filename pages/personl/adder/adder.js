// pages/personl/adder/adder.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 获取地址列表
   */
  getAdderList(){
    app.config.ajax('GET', {
      token: wx.getStorageSync('token')
    }, 'address/list', (res) => {
      this.setData({
        list: res.data
      })
    })
  },
  /**
   * 设置默认地址
   */
  setAdder(){
    app.config.ajax('PUT', {
      token: wx.getStorageSync('token')
    }, `address/setdefault/${e}/${datatype}`, (res) => {
      
    })
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