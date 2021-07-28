// component/scoreItem/index.js
import store from '../../store/index';

Component(store.createComponent({
  /**
   * 组件的属性列表
   */
  properties: {
    isTitle: Boolean,
    disabled: Boolean,
    isCurrent: Boolean,
    player: Object
  },
  globalData: ['game'],
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
    confirmScore: function (event) {
      if (this.data.disabled) return;
      const key = event.currentTarget.dataset.key;
      let tempScore = this.data.player.score;
      if (tempScore[key].temp === undefined || tempScore[key].temp === null) return;
      tempScore[key].confirm = tempScore[key].temp;
      tempScore.total = (tempScore.total || 0) + tempScore[key].confirm;

      if (['one', 'two', 'three', 'four', 'five', 'six'].includes(key)) {
        tempScore.subtotal = (tempScore.subtotal || 0) + tempScore[key].confirm;
        if (tempScore.reward !== 35 && tempScore.subtotal >= 63) {
          tempScore.reward = 35;
          tempScore.total = (tempScore.total || 0) + 35;
        }
      }
      this.clearTemp(tempScore);
      let curPlayer = this.data.game.players.find(item => item.id === this.data.player.id);
      curPlayer.score = tempScore;
      let position = this.data.game.position;
      position ++;
      this.data.game.position = position === this.data.game.players.length ? 0 : position;
      this.data.game.isMyTurn = this.data.game.players[position].isMe;;
      this.data.game.times = 3;
      store.dispatch('game', this.data.game);
      let dice = {
        dices: [{
          key: 1,
          point: 1,
          selected: false
        },
        {
          key: 2,
          point: 2,
          selected: false
        },
        {
          key: 3,
          point: 3,
          selected: false
        },
        {
          key: 4,
          point: 4,
          selected: false
        },
        {
          key: 5,
          point: 5,
          selected: false
        }],
        rollTimes: 0,
        isRolling: false
      };
      store.dispatch('dice', dice)
      wx.sendSocketMessage({
        data: JSON.stringify({
          type: 'confirmScore',
          data: { player: curPlayer, position }
        })
      })
    },
    clearTemp: function (score) {
      let keys = ['one', 'two', 'three', 'four', 'five', 'six', 'all', 'sameFour', 'fullHouse', 'bicycle', 'broadway', 'yatzy'];
      keys.forEach(key => {
        score[key].temp = undefined;
      })
    }
  }
})
)