// components/Evalist/Evalist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showAll:{
      type:Boolean,
      value:false
    },
    list:{
      type:Array,
      value:[]
    },
    count:{
      type:Number,
      value:0
    }
  },
  
  /**
   * 组件的初始数据
   */
  data: {
    read:true                                                              
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
