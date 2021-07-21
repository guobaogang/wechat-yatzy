// pages/home/index.js
import store from '../../store/index';
import calcScore from '../../utils/calc';

Page(store.createPage({

  /**
   * 页面的初始数据
   */
  data: {

  },
  globalData: ['dice', 'game'],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.onSocketMessage((res) => {
      const { type, data } = JSON.parse(res.data);
      console.log(type);
      switch (type) {
        case 'userJoin':
          this.userJoin(data);
          break;
        case 'userLeave':
          this.userLeave(data);
          break;
        case 'userStartRoll':
          this.userStartRoll(data);
          break;
        case 'userEndRoll':
          this.userEndRoll(data);
          break;
        case 'userSelectDice':
          this.userSelectDice(data);
          break;
        case 'userConfirmScore':
          this.userConfirmScore(data);
          break;
        default:
          break;
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  userJoin: function (data) {
    this.data.game.players.push({
      id: data.id,
      name: data.name,
      avatar: data.avatar,
      score: {
        one: {},
        two: {},
        three: {},
        four: {},
        five: {},
        six: {},
        all: {},
        sameFour: {},
        fullHouse: {},
        bicycle: {},
        broadway: {},
        yatzy: {}
      }
    })
    store.dispatch('game', this.data.game);
  },
  userLeave: function (data) {
    let index = this.data.game.players.findIndex(play => play.id === data.id);
    if (index > -1) {
      this.data.game.players.splice(index, 1);
      store.dispatch('game', this.data.game);
    }
  },
  userStartRoll: function (data) {
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
  },
  userEndRoll: function (data) {
    const {
      user,
      dice
    } = data;
    this.data.dice = dice;
    store.dispatch('dice', this.data.dice);
    let player = this.data.game.players.find(play => play.id === user.id);
    let tempScore = calcScore(dice.dices, player.score);
    player.score = tempScore;
    store.dispatch('game', this.data.game);
  },
  userSelectDice: function (data) {
    const {
      key,
      selected
    } = data;
    this.data.dice.dices[key - 1].selected = !selected
    store.dispatch('dice', this.data.dice);
  },
  userConfirmScore: function (data) {
    const {player, position} = data;
    let index = this.data.game.players.findIndex(play => play.id === player.id);
    this.data.game.position = position;
    this.data.game.isMyTurn = this.data.game.players[position].isMe;
    if(index>-1){
      this.data.game.players.splice(index,1,player)
      store.dispatch('game', this.data.game);
    }
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
    store.dispatch('dice',dice)
  }
}))