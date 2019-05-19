// pages/personl/serve_ordel/serve_ordel.js
const config = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 'serverOrdel',
    tab_index: 0,
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
      tab_index: e.target.dataset.id
    })
  },
  swiperChange(e) {
    console.log(e)
    this.setData({
      tab_index: e.detail.current
    })
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