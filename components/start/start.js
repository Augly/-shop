// compand/start.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    onlyRead: {
      type: Boolean,
      value: true
    },
    score: {
      type: Number,
      value: 1
    },
    fontSize: {
      type: String,
      value: '30rpx'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    start: [1, 2, 3, 4, 5],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tabStart(e) {
      if (this.data.onlyRead) {

      } else {
        this.setData({
          score: e.currentTarget.dataset.index+1
        })
        const eventDetail = {
          score: this.data.score,
        }
        this.triggerEvent('tabStart', eventDetail)
      }
    }
  }
})