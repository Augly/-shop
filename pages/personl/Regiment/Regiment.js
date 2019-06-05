// pages/personl/serve_ordel/serve_ordel.js
const config = require('../../../utils/util.js')
let allTime = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 'serverOrdel',
    tab_index: 0,
    list: [],
    page: 1,
    tab: [{
      title: '全部',
    }, {
      title: '拼团中',
    }, {
      title: '拼团成功',
    }, {
      title: '拼团失败',
    }]
  },
  timeFormat(param) {//小于10的格式化函数
    return param < 10 ? '0' + param : param;
  },
  none() {

  },
  /**
   * 倒计时函数
   */
  countDown() {
    let newTime = new Date().getTime();
    let endTimeList = this.data.list;
    let list = [];
    endTimeList.forEach(item => {
      let endTime = item.end_time * 1000
      let obj = null;
      if (endTime - newTime > 0) {
        let time = (endTime - newTime) / 1000;
        let day = parseInt(time / (60 * 60 * 24));
        let hou = parseInt(time % (60 * 60 * 24) / 3600);
        let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
        let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
        obj = {
          day: this.timeFormat(day),
          hou: this.timeFormat(hou),
          min: this.timeFormat(min),
          sec: this.timeFormat(sec)
        }
      } else {
        obj = {
          day: '00',
          hou: '00',
          min: '00',
          sec: '00'
        }

      }
      item.time = `${obj.day}天${obj.hou}时${obj.min}分${obj.sec}秒`
      list.push(item);
    })
    this.setData({ list: list })
    setTimeout(this.countDown, 1000);
  },
  getInit() {
    config.ajax('GET', {
      token: wx.getStorageSync('token')
    }, `order/spells/${this.data.tab_index}/${this.data.page}`, (res) => {
      if (res.data.length > 0) {
        let list = this.data.list
        let arr = res.data.map((item) => {
          // item.start_time = setInterval((item) => {
          //   item.start_time
          // },1000)

          // item.create_time = config.timeForm(item.create_time).chatTime.year + '/' + config.timeForm(item.create_time).chatTime.month + '/' + config.timeForm(item.create_time).chatTime.day + '  ' + config.timeForm(item.create_time).chatTime.hour + ':' + config.timeForm(item.create_time).chatTime.minute + ':00'
          return item
        })
        let page = this.data.page
        page++
        list.push.apply(list, arr);
        this.setData({
          page: page,
          list: list
        })
        this.countDown()
      } else {
        config.mytoast('暂无更多数据~')
      }
    })
  },
  to_datails(e) {
    console.log(e)
    wx.navigateTo({
      url: `/pages/personl/assemble_success/assemble_success?orderid=${e.currentTarget.dataset.id}&leaderorderid=${e.currentTarget.dataset.leader_order_id}`,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  getDetail(e) {
    wx.navigateTo({
      url: `/pages/personl/ordel_details/ordel_details?orderid=${e.currentTarget.dataset.trade_no}&datatype=1`,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  tabChange(e) {
    this.setData({
      tab_index: e.target.dataset.id,
      list: [],
      page: 1
    })
    this.getInit()
  },
  swiperChange(e) {
    this.setData({
      tab_index: e.detail.current,
      list: [],
      page: 1
    })
    this.getInit()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    config.rem(78, (res) => {
      this.setData({
        myheight: res
      })
    })
    this.getInit()
  },
  getmore(e) {
    this.getInit()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getId(e) {
    console.log(e)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getInit()
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
  onShareAppMessage: function (e) {
    let inviterid = wx.getStorageSync('inviterid')
    return {
      title: '快来一起拼团吧',
      path: `/pages/person/delegation_success/delegation_success?orderid=${e.target.dataset.id}&leaderorderid=${e.target.dataset.leader_order_id}&inviterid=${inviterid}`,
      success: function (res) {
        console.log("转发成功" + res);
      }
    }
  }
})