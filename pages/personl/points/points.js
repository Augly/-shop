// pages/personl/points/points.js
let app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    myheight: 0,
    records: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.config.rem(302, (res) => {
      this.setData({
        myheight: res
      })
    })
    this.getInit()
  },
  /**
   * 获取初始化数据
   * 
   */
  getInit() {
    app.config.ajax('GET', {
      token: wx.getStorageSync('token')
    }, `user/integral/${this.data.page}`, (res) => {
      console.log(res)
      if (res.data.records.length > 0) {
        let list = this.data.records
        let arr = res.data.records.map((item) => {
          item.update_time = app.config.timeForm(item.update_time).chatTime.year + '/' + app.config.timeForm(item.update_time).chatTime.month + '/' + app.config.timeForm(item.update_time).chatTime.day + '  ' + app.config.timeForm(item.update_time).chatTime.hour + ':' + app.config.timeForm(item.update_time).chatTime.minute + ':00'
          item.is_logical_del = item.is_logical_del == 0 ? '+' : '-'
          item.integral = item.is_logical_del + item.integral
          return item
        })
        let page = this.data.page
        page++
        list.push.apply(list, arr);
        this.setData({
          page: page,
          total_integral: res.data.total_integral,
          banner: res.data.banners,
          records: list
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