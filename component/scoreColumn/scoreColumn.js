// component/scoreItem/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isTitle: Boolean,
    player: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    keyMap: {
      name: '',
      one: '一点',
      two: '两点',
      three: '三点',
      four: '四点',
      five: '五点',
      six: '六点',
      subtotal: '小计',
      reward: '奖励分+35',
      all: '全选',
      sameFour: '四骰同花',
      fullHouse: '葫芦',
      bicycle: '小顺',
      broadway: '大顺',
      yatzy: '快艇',
      total: '总计点数'
    },
    displays: ['name', 'subtotal', 'reward', 'total']
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
