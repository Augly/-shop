// pages/personl/fill_order/fill_order.js
let app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    sum: 0,
    maxPrice: 0,
  },
  /**
   * 选择收货地址
   */
  select_adder() {
    wx.switchTab({
      url: '/pages/personl/adder/adder',
      success: function (res) {},
      fail: function (res) {},
      complete: function (res) {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.list && options.shopName) {
      let arr = JSON.parse(options.list).map((item) => {
        return item.de_price
      })

      this.setData({
        list: JSON.parse(options.list),
        shopName: options.shopName,
        maxPrice: Boolean(Math.max(arr)) ? Math.max(arr) : 0
      })
      this.defautAdder()
      this.sumData()
    }
  },
  /**
   * 购物车做加法
   */
  reduce(e) {
    let list = this.data.list
    list[e.currentTarget.dataset.index].goods_num++
    this.setData({
      list: list
    })
    this.sumData()
  },
  /**
   * 选择收货地址
   */
  select_adder() {
    wx.switchTab({
      url: '/pages/personl/adder/adder',
      success: function (res) {},
      fail: function (res) {},
      complete: function (res) {},
    })
  },
  /**
   * 求和
   */
  sumData() {
    let list = this.data.list.map((item) => {
      if (item.check) {
        return item
      }
    })
    var sum = list.reduce((prev, cur) => {
      return cur ? cur.goods_num * parseFloat(cur.shop_price).toFixed(2) + prev : 0 + prev;
    }, 0);
    var number = list.reduce((prev, cur) => {
      return cur ? cur.goods_num + prev : 0 + prev;
    }, 0);
    this.setData({
      sum: sum,
      number: number
    })
  },
  /**
   * 购物车做减法
   */
  plus(e) {
    let list = this.data.list
    list[e.currentTarget.dataset.index].goods_num == 1 ? 1 : list[e.currentTarget.dataset.index].goods_num--
    this.setData({
      list: list
    })
    this.sumData()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 获取默认地址
   */
  defautAdder() {
    app.config.ajax('GET', {
      token: wx.getStorageSync('token'),
    }, `address/getdefault`, (res) => {
      res.data.length > 0 ? res.data.forEach((item) => {
        if (item) {
          if (item.is_default == 1) {
            this.setData({
              defautAdder: item
            })
          }
        }
      }) : this.setData({
        defautAdder: ''
      })
      console.log(this.data.defautAdder)
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