// pages/personl/shopping_cart/shopping_cart.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
  },
  getList(){
    app.config.ajax('GET', {
      token: wx.getStorageSync('token'),
    }, `shop/carts/${this.data.page}`, (res) => {
      console.log(res.data)
      if (res.data.data.length > 0) {
        let list = this.data.list
        let page = this.data.page
        let newList = res.data.data.map((item)=>{
          item.check=false
          return item
        })
        page++
        list.push.apply(list, newList);
        this.setData({
          page: page,
          list: list,
          shopName: res.data.shop_name
        })
      } else {
        app.config.mytoast('暂无更多数据~')
      }
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