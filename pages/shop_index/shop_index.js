//index.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab_index: 0,
    imgUrls: null,
    group_data: null,
    indicatorDots: true,
    autoplay: true,
    indicatorColor: 'rgba(255, 255, 255, 1)',
    indicatorActiveColor: 'rgba(69, 208, 174, 1)',
    interval: 1000,
    duration: 1000,
    datatype: 0,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    app.config.ajax('GET', {
      token: wx.getStorageSync('token'),
    }, `shop/shops/${this.data.datatype}`, (res) => {
      console.log(res.data)
      let list = res.data.good_type[0].childtype ? res.data.good_type[0].childtype : []
      this.setData({
        imgUrls: res.data.banner_data,
        group_data: res.data.group_data,
        good_type: res.data.good_type,
        list: res.data.goods,
        kind_list: list,
        kind_list_index: 0,
        tab_index: 0
      })
    })
    // let s = setInterval(() => {
    //   console.log(wx.getStorageSync('token'))
    //   if (wx.getStorageSync('token')) {
    //     clearInterval(s)
    //     app.config.ajax('GET', {
    //       token: wx.getStorageSync('token'),
    //     }, 'shop/index', (res) => {
    //       console.log(res.data.group_data)
    //       this.setData({
    //         imgUrls: res.data.banners,
    //         group_data: res.data.group_data,
    //         hot_product: res.data.hot_product,
    //         hot_service: res.data.hot_service,
    //         list: res.data.hot_product
    //       })
    //     })
    //   }
    // }, 1000);
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     console.log(2121)
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  /**
   * 
   * 
   * 
   * @param {类型} type 
   * @param {种类} kind 
   */
  getData(type, kind) {
    app.config.ajax('GET', {
      token: wx.getStorageSync('token'),
    }, kind ? `shop/shops/${type}/${kind}` : `shop/shops/${type}`, (res) => {
      console.log(res.data)
      let list = res.data.good_type[this.data.tab_index].childtype ? res.data.good_type[this.data.tab_index].childtype : []
      this.setData({
        imgUrls: res.data.banner_data,
        group_data: res.data.group_data,
        good_type: res.data.good_type,
        list: res.data.goods,
        kind_list: list,
      })
      this.goTop()
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //获取拼团活动
  getId(e) {
    wx.navigateTo({
      url: `/pages/personl/join_delegation/join_delegation?goodId=${e.detail.goodId}&datatype=${e.detail.datatype}`,
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });
  },
  //切换产品或服务
  tab_change(e) {
    let list = this.data.good_type[e.target.dataset.index].childtype ? this.data.good_type[e.target.dataset.index].childtype : []
    this.setData({
      kind_list: list,
      kind_list_index: 0,
      tab_index: parseInt(e.target.dataset.index)
    })
    this.getData(parseInt(e.target.dataset.index))
  },
  //回到顶部
  goTop: function () {
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
  kind_change(e) {
    this.setData({
      kind_list_index: e.target.dataset.index,
    })
    this.getData(this.data.tab_index, this.data.kind_list[e.target.dataset.index].id)
  },
  //普通商品
  getmore(e) {
    console.log(e)
    wx.navigateTo({
      url: `/pages/index/productRes/productRes?goodId=${e.currentTarget.dataset.goodid}&datatype=0`,
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      shop: wx.getStorageSync('user_info')
    })
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