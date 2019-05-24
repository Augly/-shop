// pages/personl/shopping_cart/shopping_cart.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    list: [],
    myheight: 0,
    all_check: false,
    sum: 0,
    number: 0,
    edit: false,
    defautAdder: '',
    maxPrice:0,
  },
  changeEdit() {
    this.setData({
      edit: !this.data.edit
    })
  },
  /**
   * 操作
   */
  scope() {
    let list = []
    this.data.list.forEach((item) => {
      if (item.check === true) {
        list.push(item.goods_id)
      }
    })

    if (this.data.edit) {
      app.config.ajax('POST', {
        token: wx.getStorageSync('token'),
        goodids: JSON.stringify(list)
      }, `shop/delcart`, (res) => {
        this.setData({
          list: [],
          page: 1
        })
        this.getList()
      })
    } else {
      let list = JSON.stringify(this.data.list)
      let shopName = this.data.shopName
      wx.navigateTo({
        url: `/pages/personl/fill_order/fill_order?list=${list}&shopName=${shopName}`,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getList()
    this.defautAdder()
    app.config.rem((78 + 78 + 80), (res) => {
      this.setData({
        myheight: res
      })
    })
  },
  /**
   * 实现全选
   */
  checkAll() {
    let all = !this.data.all_check
    let list = this.data.list
    list.forEach((item) => {
      item.check = all
    })
    this.setData({
      list: list,
      all_check: all
    })
    this.sumData()
  },
  /**
   * 实现单选
   */
  checkItem(e) {
    let list = this.data.list
    list[e.currentTarget.dataset.index].check = !list[e.currentTarget.dataset.index].check

    this.setData({
      list: list,
      all_check: list.every((item) => {
        return item.check === true
      })
    })
    this.sumData()
  },
  /**
   * 购物车做加法
   */
  reduce(e) {
    let list = this.data.list
    this.num_change(list[e.currentTarget.dataset.index].goods_id, 0, (res) => {
      list[e.currentTarget.dataset.index].goods_num++
        this.setData({
          list: list
        })
      this.sumData()
    })

  },
  /**
   * 选择收货地址
   */
  select_adder() {
    wx.switchTab({
      url: '/pages/personl/adder/adder',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 获取默认地址
   */
  defautAdder() {
    app.config.ajax('GET', {
      token: wx.getStorageSync('token'),
    }, `address/getdefault`, (res) => {
      res.data.length > 0 ? res.data.forEach((item) => {
        if (item) {
          if (item.is_default == 1) {
            this.setData({
              defautAdder: item.add_less + item.add_more
            })
          }
        }

      }) : this.setData({
        defautAdder: ''
      })


    })
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
    this.num_change(list[e.currentTarget.dataset.index].goods_id, 1, (res) => {
      list[e.currentTarget.dataset.index].goods_num == 1 ? 1 : list[e.currentTarget.dataset.index].goods_num--
        this.setData({
          list: list
        })
      this.sumData()
    })

  },
  getList() {
    app.config.ajax('GET', {
      token: wx.getStorageSync('token'),
    }, `shop/carts/${this.data.page}`, (res) => {
      console.log(res.data)
      if (res.data.data.length > 0) {
        let list = this.data.list
        let page = this.data.page
        let newList = res.data.data.map((item) => {
          item.check = false
          item.de_price = Number(item.de_price)
          return item
        })
        
        page++
        list.push.apply(list, newList);
        let arr = list.map((item) => {
          return item.de_price
        })
        this.setData({
          page: page,
          list: list,
          shopName: res.data.shop_name,
          maxPrice: Boolean(Math.max(arr)) ? Math.max(arr):0
        })
      } else {
        app.config.mytoast('暂无更多数据~')
      }
    })
  },
  /**
   * 购物车数量变化
   */
  num_change(id, type, successData) {
    app.config.ajax('PUT', {
      token: wx.getStorageSync('token'),
    }, `shop/editcart/${id}/${type}`, (res) => {
      successData(res)
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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