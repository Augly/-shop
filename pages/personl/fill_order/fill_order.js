// pages/personl/fill_order/fill_order.js
let app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    sum: 0,
    maxPrice: 0,
    buyermsg: '',
    wl_type: [{
      label: '快递',
      value: 0
    }, {
      label: '自提',
      value: 1
    }],
    wl_index: 0,
    leaderorderid: 0,
  },
  bindPickerChange(e) {
    this.setData({
      wl_index: e.detail.value
    })
  },
  /**
 * 选择收货地址
 */
  select_adder() {
    wx.navigateTo({
      url: '/pages/personl/adder/adder',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 
   * 获取买家留言
   * 
   * @param {any} e 
   */
  getBuyermsg(e) {
    console.log(e)
    this.setData({
      buyermsg: e.detail.value
    })
  },
  /**
   * 
   * 提交订单
   * 
   */
  sumbit_ordel(e) {
    wx.showLoading({
      title: '正在提交~',
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    wx.login({
      success: function (res) {
        app.config.ajax('POST', {
          token: wx.getStorageSync('token'),
          code: res.code,
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
          datatype: 1,
          lng: wx.getStorageSync('location').longitude,
          lat: wx.getStorageSync('location').latitude,
          nickname: e.detail.userInfo.nickName,
          headurl: e.detail.userInfo.avatarUrl,
          gender: e.detail.userInfo.gender
        }, `user/update`, (res) => {
          wx.hideLoading()
          console.log(res)
          if (this.data.number) {
            if (this.data.defautAdder == '') {
              app.config.mytoast('请选择收货地址')
              return false
            }
            let list = this.data.list.map((item) => {
              return {
                goodid: item.goods_id,
                goodnum: item.goods_num
              }
            })

            app.config.ajax('POST', {
              token: wx.getStorageSync('token'),
              addrid: this.data.defautAdder.id,
              goods: JSON.stringify(list),
              totalprice: this.data.sum,
              expressprice: this.data.maxPrice,
              takemethod: this.data.wl_index,
              buyermsg: this.data.buyermsg
            }, `order/submit`, (res) => {
              console.log(res.data)
              app.config.pay(res.data, (res) => {
                console.log(res)
              })
            })
          } else {
            if (this.data.defautAdder == '') {
              app.config.mytoast('请选择收货地址')
              return false
            }
            let goodid = this.data.list[0].goods_id

            app.config.ajax('POST', {
              token: wx.getStorageSync('token'),
              addrid: this.data.defautAdder.id,
              goodid: goodid,
              groupnum: this.data.number,
              leaderorderid: this.data.leaderorderid,
              totalprice: this.data.sum,
              expressprice: this.data.maxPrice,
              takemethod: this.data.wl_index,
              buyermsg: this.data.buyermsg
            }, `order/submitgroup`, (res) => {
              console.log(res.data)
              app.config.pay(res.data, (res) => {
                console.log(res)
              })
            })
          }
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
    console.log(e)


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.number) {
      this.setData({
        groupnum: options.number
      })
    }
    if (options.id) {
      this.setData({
        leaderorderid: options.id
      })
    }
    if (options.list && options.shopName) {
      console.log(options.list)
      console.log(JSON.parse(options.list))
      let arr = JSON.parse(options.list).map((item) => {
        return item.de_price
      })

      this.setData({
        list: JSON.parse(options.list),
        shopName: options.shopName,
        maxPrice: Boolean(Math.max(arr)) ? Math.max(arr) : 0
      })
      this.getDefautAdder()
      this.sumData()
    }
  },
  /**
   * 购物车做加法
   */
  reduce(e) {
    let list = this.data.list
    list[e.currentTarget.dataset.index].goods_num++
    this.setData({
      list: list
    })
    this.sumData()
  },
  /**
   * 求和
   */
  sumData() {
    let list = this.data.list.map((item) => {
      if (item.check) {
        return item
      }
    })
    var sum = list.reduce((prev, cur) => {
      return cur ? cur.goods_num * parseFloat(cur.shop_price).toFixed(2) + prev : 0 + prev;
    }, 0);
    var number = list.reduce((prev, cur) => {
      return cur ? cur.goods_num + prev : 0 + prev;
    }, 0);
    this.setData({
      sum: sum,
      number: number
    })
  },
  /**
   * 购物车做减法
   */
  plus(e) {
    let list = this.data.list
    list[e.currentTarget.dataset.index].goods_num == 1 ? 1 : list[e.currentTarget.dataset.index].goods_num--
    this.setData({
      list: list
    })
    this.sumData()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 获取默认地址
   */
  getDefautAdder() {
    app.config.ajax('GET', {
      token: wx.getStorageSync('token'),
    }, `address/getdefault`, (res) => {
      res.data.length > 0 ? res.data.forEach((item) => {
        if (item) {
          if (item.is_default == 1) {
            this.setData({
              defautAdder: item
            })
          }
        }
      }) : this.setData({
        defautAdder: ''
      })
      console.log(this.data.defautAdder)
    })
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