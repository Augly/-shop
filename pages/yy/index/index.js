// pages/yy/index/index.js
let app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop:null,
    list:[],
    page:1,
    keywords:'',
    type:null,
    data_index:0,
    time_index:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
    this.gitData()
  },
  /**
   * 获取某个门店的时间
   */
  getTimelist(){
    app.config.ajax('GET',{
      token: wx.getStorageSync('token'),
    },`appointment/timeslot/${this.data.shop.id}`,(res)=>{
      console.log(res)
      this.setData({
        type:null
      })
      // if(res.data.shops.length>0){  
      //   let list=this.data.list
      //   let page=this.data.page
      //   let newArr = res.data.shops.map((item)=>{
      //     item.check=false
      //     return item
      //   })
      //   page++
      //   list.push.apply(list, newArr);
      //   this.setData({
      //     page: page,
      //     list: list,
      //     banner: res.data.banners
      //   })
      // }else{
      //   app.config.mytoast('暂无更多数据~')
      // }
    }) 
  },
  /**
   * 获取门店列表
   */
  getList(){
    app.config.ajax('GET',{
      token: wx.getStorageSync('token'),
      keywords: this.data.keywords,
    },`appointment/shops/1/${this.data.page}`,(res)=>{
      if(res.data.shops.length>0){  
        let list=this.data.list
        let page=this.data.page
        let newArr = res.data.shops.map((item)=>{
          item.check=false
          return item
        })
        page++
        list.push.apply(list, newArr);
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
   * 选择门店
   */
  change_item(e){
    let list = this.data.list;
    list.forEach(item => {
      item.check=false
    });
    list[e.currentTarget.dataset.index].check=true;
    console.log(list[e.currentTarget.dataset.index].check)
    this.setData({
      list:list,
    })
  },
  save(){
    if(this.data.type=='yy'){
      let item=this.data.list.find(item=> {
        if (item.check) {
          return true
        }
      })
      this.setData({
          shop:item,
         
      })
      this.getTimelist()
    }else if(this.data.type=='time'){
      
    }
  },
  select_data(e){
    this.setData({
      data_index:e.currentTarget.dataset.index
    })
  },
  showMask(){

  },
  select_timeData(e){

    this.setData({
      time_index:e.currentTarget.dataset.index
    })
  },
  GetDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
    let y = dd.getFullYear();
    let m = dd.getMonth() + 1;//获取当前月份的日期
    let d = dd.getDate();
    let w = dd.getDay();
    let s = dd.getTime();
    let week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    return {
      mon: week[w],
      date: `${m}.${d}`,
      value: s,
      more: `${y}-${m < 10 ? '0' + m : m}-${d < 10 ? '0' + d : d}`
    }
  },
  //获取今天为起点得往后七天日期星期
  gitData() {
    let datalist = []
    let timelist=[]
    for (let s = 0; s < 7; s++) {
      datalist.push(this.GetDateStr(s))
    }
    for (let s = 8; s <24 ; s++) {
      timelist.push(`${s > 9 ? s : '0' + s}:00-${1+s > 9 ? 1+s : '0' + (1+s)}:00`)
    }
    this.setData({
      dataList: datalist,
      timelist: timelist
    })
    console.log(timelist)
  },
/**
 * 选择门店
 */
  yy(){
    this.setData({
      type:'yy'
    })
    // wx.navigateTo({
    //   url: '/pages/index/selection/selection',
    //   success: function(res) {},
    //   fail: function(res) {},
    //   complete: function(res) {},
    // })
  },
  select_time(){
    if(this.data.shop){
      this.setData({
        type: 'time'
      })
    }else{
      app.config.mytoast('请先选择门店')
    }
    
  },
  hideMask(){
    this.setData({
      type:null
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