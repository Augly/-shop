//Page Object
const app = getApp()
Page({
  data: {
    showmore: false,
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    indicatorColor: 'rgba(255, 255, 255, 1)',
    indicatorActiveColor: 'rgba(69, 208, 174, 1)',
    interval: 2000,
    duration: 500,
    details: null
  },
  onLoad: function (options) {
    this.getDetail(options)
    this.getFirst(options)
    wx.getSystemInfo({ //获取屏幕高度
      success: (res => {
        this.setData({
          screenHeight: res.screenHeight
        })
      })
    })
  },
  /**
   * 
   * 
   * @param {any} e 
   */
  creact_ordel(e) {
    let list = [{
      goods_id: this.data.details.goods_id,
      goods_num: 1,
      goods_thumb: this.data.details.goods_thumb,
      goods_name: this.data.details.goods_name,
      shop_price: '',
      check: true,
      goods_brief: this.data.details.goods_brief,
      de_price: this.data.details.de_price
    }];
    let shopName = '未知店铺'
    console.log(e.currentTarget.dataset.number)
    switch (e.currentTarget.dataset.number) {
      case '3':
        list[0].shop_price = this.data.details.three_group_price
        break;
      case '5':
        list[0].shop_price = this.data.details.five_group_price
        break;
      case '8':
        list[0].shop_price = this.data.details.eight_group_price
        break;
      default:
        list[0].shop_price = this.data.details.market_price
        break;
    }
    console.log(e)
    list = JSON.stringify(list)
    wx.navigateTo({
      url: `/pages/personl/fill_order/fill_order?list=${list}&shopName=${shopName}&number=${e.currentTarget.dataset.number}`,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
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
  fq(e) {
    console.log(e.scrollTop)
    this.setData({
      showmore: true
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
        imgUrls: [{
          img_url: res.data.details.goods_thumb
        }],
        latest_data: res.data.latest_data.map((item) => {
          item.payment_time = app.config.timeForm(item.payment_time).chatTime.timeStr
          return item
        })
      })
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
  getId(e) {
    this.getDetail(e.detail)
    this.getFirst(e.detail)
    this.goTop()
  },
  hide() {
    this.setData({
      showmore: false
    })
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  onPageScroll: function (e) {
    // console.log(e, this.data.screenHeight)

  },
  //item(index,pagePath,text)
  onTabItemTap: function (item) {

  }
});