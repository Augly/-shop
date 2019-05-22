// pages/personl/adder_edit/adder_edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    adder: {
      "name": "",
      "mobile": "",
      "add_more": "",
      "add_less": "",
      "is_default": 1,
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 获取地址列表
   */
  getAdderList(options) {
    this.setData({
      adderId: options.adderId
    })
    app.config.ajax('GET', {
      token: wx.getStorageSync('token')
    }, `address/details/${options.adderId}`, (res) => {
      this.setData({
        adder: res.data[0]
      })
    })
  },

  /**
   * 改变默认地址
   */
  changes_default(e) {
    this.setData({
      'adder.is_default': event.detail
    })
  },
  /**
   * 保存地址,更新或者添加地址
   */
  save() {
    if (this.data.adderId) {
      adder = {
        token: wx.getStorageSync('token'),
        addrid: this.data.adderId,
        name: this.data.adder.name,
        mobile: this.data.adder.mobile,
        add_more: this.data.adder.add_more,
        add_less: this.data.adder.add_less,
        is_default: this.data.adder.is_default,
      }
    } else {
      adder = {
        token: wx.getStorageSync('token'),
        name: this.data.adder.name,
        mobile: this.data.adder.mobile,
        add_more: this.data.adder.add_more,
        add_less: this.data.adder.add_less,
        is_default: this.data.adder.is_default,
      }
    }
    app.config.ajax('POST', adder, `address/details/${options.adderId}`, (res) => {

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