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
    good_type: [{
      name: '产品拼团',
      value: 0
    }, {
      name: '项目拼团',
      value: 1
    }],
  },
  onLoad: function () {
    this.getData(this.data.tab_index)
  },
  /**
   * 
   * 
   * 
   * @param {类型} type 
   */
  getData(type) {
    app.config.ajax('GET', {
      token: wx.getStorageSync('token'),
    }, `shop/groups/${type}`, (res) => {
      console.log(res.data)
      this.setData({
        imgUrls: res.data.banners,
        group_data: res.data.group_data,
      })
      this.goTop()
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
    this.setData({
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
    this.getData(e.target.dataset.index)
  },
  //普通商品
  getmore(e) {
    console.log(e)
    wx.navigateTo({
      url: `/pages/personl/join_delegation/join_delegation?goodId=${e.currentTarget.dataset.goodid}&datatype=1`,
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