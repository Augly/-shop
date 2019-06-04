// pages/personl/assemble_success/assemble_success.js
let app = getApp()
let timeI = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    data: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInit(options)
  },
  //获取拼团活动
  getId(e) {
    wx.redirectTo({
      url: `/pages/personl/join_delegation/join_delegation?goodId=${e.detail.goodId}&datatype=${e.detail.datatype}`,
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });
  },
  more() {
    if (this.data.data.goods_detail.spell_is_success == 1) {
      wx.switchTab({
        url: '/pages/Regiment_list/Regiment_list',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else {
      wx.navigateTo({
        url: '/pages/personl/Regiment/Regiment',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },
  /**
 * 倒计时函数
 */
  countDown() {
    clearTimeout(timeI)
    timeI = null
    let data = this.data.data
    let newTime = new Date().getTime();
    let endTime = this.data.data.goods_detail.end_time * 1000
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
    data.goods_detail.timeGroup = obj
    this.setData({ data: data })
    timeI = setTimeout(this.countDown, 1000);
  },
  getInit(options) {
    app.config.ajax('GET', {
      token: wx.getStorageInfoSync('token')
    }, `order/groupstatus/${options.orderid}/${options.leaderorderid}`, (res) => {
      let groupNum = res.data.goods_detail.group_num
      let list = []
      for (let s = 0; s < groupNum; s++) {
        list.push({
          head_url: "/static/images/none.png"
        })
      }
      for (let n = 0; n < res.data.team_members.length; n++) {
        console.log(res.data.team_members[n].head_url)
        list[n].head_url = res.data.team_members[n].head_url
      }
      this.setData({
        data: res.data,
        list: list
      })
      this.countDown()
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

    clearTimeout(timeI)
    timeI = null
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
  onShareAppMessage: function(e) {
    return {
      title: '快来一起拼团吧',
      path: `/pages/person/delegation_success/delegation_success?orderid=${e.target.dataset.id}&leaderorderid=${e.target.dataset.leader_order_id}`,
      success: function (res) {
        console.log("转发成功" + res);
      }
    }
  }
})