// pages/personl/service/service.js
let app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab_index: 0,
    reson:'请选择退款原因',
    resonlist: ['商品无货', '配送时间问题', '不想要了', '商品信息填写错误','地址信息填写错误'],
    file:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      data:options
    })
  },
  choose(){
    app.config.chooseImage((res)=>{
      this.setData({
        file: res.tempFilePaths[0]
      })
    })
  },
  sure(){
    wx.uploadFile({
      url: 'https://shop.mayspie.com/api/order/apply',
      filePath: this.data.file,
      name: 'file',
      formData: {
        token: wx.getStorageSync('token'),
        goodid: this.data.data.goodid,
        datatype: this.data.data.datatype,
        opertype: 0,
        orderid: this.data.data.orderid,
        goodstate: this.data.tab_index,
        refundreson: this.data.reson == '请选择退款原因' ? '' : this.data.reson
      },
      success: (res) => {
        console.log(res)
        wx.hideLoading()
        var data = JSON.parse(res.data)
        if (data.status == 0) {
          
        } else {
          app.config.mytoast(data.msg)
        }
      },
      error(res) {
        
      },
      complete(res) {
        
      }
    })
  },
  change_tab(e){
    console.log(e)
    this.setData({
      tab_index: e.currentTarget.dataset.index
    })
  },
  change_reason(e){
    let list = this.data.resonlist
    this.setData({
      reson: list[e.detail.value]
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