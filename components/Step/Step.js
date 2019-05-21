// components/Step/Step.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    active_step: {
      type: Number,
      value: 4
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    step_list: [{
      title: '开团'
    }, {
      title: '邀请好友'
    }, {
      title: '成团'
    }, {
      title: '发货'
    }]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})