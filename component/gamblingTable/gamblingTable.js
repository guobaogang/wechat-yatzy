// component/gamblingTable/index.js
import store from '../../store/index';
import calcScore from '../../utils/calc';

Component(store.createComponent({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  globalData: ['dice', 'game'],
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
      wx.sendSocketMessage({
        data: JSON.stringify({
          type: 'startRoll',
          data: {}
        })
      })

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
        this.data.game.times = this.data.game.times - 1;
        console.log(this.data.game.times );
        store.dispatch('dice', this.data.dice);
        store.dispatch('game', this.data.game);
        wx.sendSocketMessage({
          data: JSON.stringify({
            type: 'endRoll',
            data: {
              dice: this.data.dice,
              times: this.data.game.times
            }
          })
        })
        this.calcMyScore();
        clearTimeout(timer);
      }, 1000)
    },
    selectDice: function (event) {
      if(this.data.game.times === 3) return;
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
      wx.sendSocketMessage({
        data: JSON.stringify({
          type: 'selectDice',
          data: { key, selected }
        })
      })
    },
    calcMyScore: function(){
      const {
        dices,
        rollTimes
      } = this.data.dice;
      let me = this.data.game.players.find(play=>play.isMe);
      let tempScore = calcScore(dices, me.score);
      me.score = tempScore;
      store.dispatch('game', this.data.game);
    }
  }
}))
