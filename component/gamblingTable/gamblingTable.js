// component/gamblingTable/index.js
import store from '../../store/index';

Component(store.createComponent({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  globalData: ['dice'],
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    myRoll: function () {
      const {
        dices,
        rollTimes
      } = this.data.dice;
      for (let index = 0; index < dices.length; index++) {
        if (!dices[index].selected) {
          dices[index].point = 0
        }
      }

      this.data.dice = {
        ...this.data.dice,
        dices: dices,
        isRolling: true
      }
      store.dispatch('dice', this.data.dice);
      let timer = setTimeout(() => {
        for (let index = 0; index < dices.length; index++) {
          if (!dices[index].selected) {
            dices[index].point = Math.ceil(Math.random() * 6)
          }
        }
        this.data.dice = {
          ...this.data.dice,
          dices: dices,
          isRolling: false,
          rollTimes: rollTimes + 1
        }
        store.dispatch('dice', this.data.dice);
        clearTimeout(timer);
      }, 1000)
    },
    selectDice: function (event) {
      const { key, selected } = event.currentTarget.dataset.dice;
      const {
        dices
      } = this.data.dice;
      dices[key - 1].selected = !selected
      this.data.dice = {
        ...this.data.dice,
        dices
      }
      store.dispatch('dice', this.data.dice);
    }
  }
}))
