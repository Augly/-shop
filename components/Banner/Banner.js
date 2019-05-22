// components/Banner/Banner.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgList:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    indicatorColor: 'rgba(255, 255, 255, 1)',
    indicatorActiveColor: 'rgba(69, 208, 174, 1)',
    interval: 1000,
    duration: 1000
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
