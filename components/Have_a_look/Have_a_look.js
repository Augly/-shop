// components/Have_a_look.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    getItem(e) {
      const eventDetail = {
        goodId: e.currentTarget.dataset.id,
        datatype: 1
      }
      this.triggerEvent('getId', eventDetail)
    }
  }
})