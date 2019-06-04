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
  onLoad: function(options) {
    let data = JSON.parse(options.data)
    data.evalmsg = ''
    data.star = 3
    data.shopstar = 3
    data.servicestar = 3
    data.evalfile = ''
    data.id = data.goods_id
    data.orderid = options.orderid
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
    let data = this.data.data
    app.config.chooseImage((res) => {
      data.evalfile = res.tempFilePaths[0]
      this.setData({
        data: data
      })
    })
  },
  /**
   * 删除图片
   * @param {*} e 
   */
  delete(e) {
    let data = this.data.data
    data.evalfile = ''
    this.setData({
      'data': data
    })
  },
  /**
   * 总评星
   * @param {*} e 
   */
  tabStart(e) {
    let data = this.data.data
    data.star = e.detail.score
    this.setData({
      'data': data
    })
  },
  /**
   * 店铺评星
   * @param {*} e 
   */
  shopstar(e) {
    let data = this.data.data
    data.shopstar = e.detail.score
    this.setData({
      'data': data
    })
  },
  /**
   * 服务评分
   * @param {*} e 
   */
  servicestar(e) {
    let data = this.data.data
    data.servicestar = e.detail.score
    this.setData({
      'data': data
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  /**
   * 提交评论
   */
  sumbit() {
    let data = this.data.data
    app.config.ajax('img', {
      token: wx.getStorageSync('token'),
      evalmsg: data.evalmsg,
      star: data.star,
      shopstar: data.shopstar,
      servicestar: data.servicestar,
      orderid: data.orderid,
    }, `shop/evalsave/${data.id}`, (res) => {

      app.config.mytoast('提交评论成功!', () => {
        wx.navigateBack({
          delta: 1
        });
      })

    }, (err) => {

    }, (res) => {

    }, data.evalfile)

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})