// pages/personl/eva_ordel/eva_ordel.js
let app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    read: false,
    fontSize: '50rpx'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = JSON.parse(options.data)
    data.goods = data.goods.map(item => {
      item.evalmsg = '',
        item.star = 3,
        item.shopstar = 3,
        item.servicestar = 3,
        item.evalfile = '',
        item.orderid = data.id
      return item
    })
    this.setData({
      data: data
    })
    console.log(data)
  },
  /**
   * 
   * @param {*} e 
   */
  chooseImage(e) {
    let list = this.data.data.goods
    app.config.chooseImage((res) => {
      console.log(res)
      console.log(list)
      list[e.currentTarget.dataset.index].evalfile = res.tempFilePaths[0]
      this.setData({
        'data.goods': list
      })
    })
  },
  /**
   * 删除图片
   * @param {*} e 
   */
  delete(e) {
    let list = this.data.data.goods
    list[e.currentTarget.dataset.index].evalfile = ''
    this.setData({
      'data.goods': list
    })
  },
  /**
   * 总评星
   * @param {*} e 
   */
  tabStart(e) {
    let list = this.data.data.goods
    list[e.currentTarget.dataset.index].star = e.detail.score
    this.setData({
      'data.goods': list
    })
  },
  /**
   * 店铺评星
   * @param {*} e 
   */
  shopstar(e) {
    let list = this.data.data.goods
    list[e.currentTarget.dataset.index].shopstar = e.detail.score
    this.setData({
      'data.goods': list
    })
  },
  /**
   * 服务评分
   * @param {*} e 
   */
  servicestar(e) {
    let list = this.data.data.goods
    list[e.currentTarget.dataset.index].servicestar = e.detail.score
    this.setData({
      'data.goods': list
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 提交评论
   */
  sumbit() {
    let s = this.data.data.goods.length
    let n = 0
    var upImg = (data) => {
      console.log(data)
      app.config.ajax('img', {
        token: wx.getStorageSync('token'),
        evalmsg: data.evalmsg,
        star: data.star,
        shopstar: data.shopstar,
        servicestar: data.servicestar,
        orderid: data.orderid,
      }, `shop/evalsave/${this.data.data.id}`, (res) => {
        n++
        if (n < s) {
          upImg(this.data.data.goods[n])
        } else {
          app.config.mytoast('提交评论成功!', () => {
            wx.navigateBack({
              delta: 1
            });
          })
        }

      }, (err) => {

      }, (res) => {

      }, data.evalfile)
    }
    upImg(this.data.data.goods[n])
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