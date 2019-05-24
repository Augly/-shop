// pages/personl/adder_edit/adder_edit.js
let app = getApp();


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
      "is_default": true,
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAdderRes(options)
  },
  /**
   * 
   * @param {adderId=>'地址id'} options 
   */
  getAdderRes(options) {
    if (options.adderId) {
      this.setData({
        adderId: options.adderId
      })
      app.config.ajax('GET', {
        token: wx.getStorageSync('token')
      }, `address/details/${options.adderId}`, (res) => {
        console.log(res.data)
        this.setData({
          adder: res.data
        })
      })
    }
  },
  /**
   * 
   * @param {*} e 
   */
  bindRegionChange(e) {
    this.setData({
      region: e.detail.value,
      'adder.add_less': e.detail.value[0] + e.detail.value[1] + e.detail.value[2]
    })
    console.log(e.detail.value)
  },
  /**
   * 改变默认地址
   */
  changes_default(e) {
    console.log(e.detail)
    this.setData({
      'adder.is_default': e.detail.value
    })
  },
  /**
   * 
   * @param {*} e 
   */
  getName(e) {
    this.setData({
      'adder.name': e.detail.value
    })
  },
  /**
   * 
   * @param {*} e 
   */
  getTell(e) {
    this.setData({
      'adder.mobile': e.detail.value
    })
  },
  /**
   * 
   * @param {*} e 
   */
  getText(e) {
    this.setData({
      'adder.add_more': e.detail.value
    })
  },
  /**
   * 保存地址,更新或者添加地址
   */
  save() {
    let adder;
    if (this.data.adderId) {
      adder = {
        token: wx.getStorageSync('token'),
        addrid: this.data.adderId,
        name: this.data.adder.name,
        mobile: this.data.adder.mobile,
        addmore: this.data.adder.add_more,
        addless: this.data.adder.add_less,
        isdefault: this.data.adder.is_default ? 1 : 0,
      }
    } else {
      adder = {
        token: wx.getStorageSync('token'),
        name: this.data.adder.name,
        mobile: this.data.adder.mobile,
        addmore: this.data.adder.add_more,
        addless: this.data.adder.add_less,
        isdefault: this.data.adder.is_default ? 1 : 0,
      }
    }
    app.config.ajax('POST', adder, `address/save`, (res) => {
      app.config.mytoast(this.data.adderId ?'地址信息已修改':'已成功添加新地址', (res) => {
        wx.navigateBack({
          delta: 1
        });
      })
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