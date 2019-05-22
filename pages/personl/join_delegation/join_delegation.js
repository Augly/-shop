//Page Object
const app = getApp()
Page({
  data: {
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    indicatorDots: true,
    autoplay: true,
    indicatorColor: 'rgba(255, 255, 255, 1)',
    indicatorActiveColor: 'rgba(69, 208, 174, 1)',
    interval: 1000,
    duration: 1000,
    details: null
  },
  //options(Object)
  onLoad: function (options) {
    this.getDetail(options)
    this.getFirst(options)
  },
  //获取产品详情
  getDetail(options) {
    app.config.ajax('GET', {
      token: wx.getStorageSync('token'),
    }, `shop/details/${options.goodId}/${options.datatype}`, (res) => {
      this.setData({
        details: res.data.details,
        hot_data: res.data.hot_data,
        latest_data: res.data.latest_data.map((item)=>{
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
  onPageScroll: function () {

  },
  //item(index,pagePath,text)
  onTabItemTap: function (item) {

  }
});