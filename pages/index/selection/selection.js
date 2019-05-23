// pages/index/selection/selection.js
let app=getApp();
var timeout = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    keywords:'',
    page:1,
    bannerlist:[],
    indicatorDots: true,
    autoplay: true,
    indicatorColor: 'rgba(255, 255, 255, 1)',
    indicatorActiveColor: 'rgba(69, 208, 174, 1)',
    interval: 1000,
    duration: 1000
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
  },
  /**
   * 选择门店
   */
  setShop(e){
    wx.setStorageSync('shop', e.currentTarget.dataset.id)
    wx.navigateBack({
      delta: 1,
    })
  },
  /**
   * 获取门店列表
   */
  getList(){
    app.config.ajax('GET',{
      token: wx.getStorageSync('token'),
      keywords: this.data.keywords,
    },`appointment/shops/0/${this.data.page}`,(res)=>{
      if(res.data.shops.length>0){  
        let list=this.data.list
        let page=this.data.page
        page++
        list.push.apply(list, res.data.shops);
        console.log(list)
        console.log(page)
        this.setData({
          page: page,
          list: list,
          banner: res.data.banners
        })
      }else{
        app.config.mytoast('暂无更多数据~')
      }
    })  
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getValue(e){
    this.setData({
      keywords: e.detail.value
    })
    this.setData({
      page:1,
      list:[]
    })
    if (timeout !== null) {
      clearTimeout(timeout);    
    } 
    timeout = setTimeout(() => {
      this.getList()
    }, 1000);
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
    this.getList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})