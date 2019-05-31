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
  lifetimes: {
    created: function () {
      // 在组件实例刚刚被创建时执行
    },
    attached: function () {
      // 在组件实例进入页面节点树时执行
    },
    ready: function () {
      // 在组件在视图层布局完成后执行
    },
    moved: function () {
      // 在组件实例被移动到节点树另一个位置时执行
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
    error: function () {
      // 每当组件方法抛出错误时执行
    },
  },
  pageLifetimes: {
    show: function () {
      // 页面被展示
    },
    hide: function () {
      // 页面被隐藏
    },
    resize: function (size) {
      // 页面尺寸变化
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