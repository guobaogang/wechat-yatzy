// pages/home/index.js
import store from '../../store/index';

Page(store.createPage({

  /**
   * 页面的初始数据
   */
  data: {

  },
  globalData: ['dice', 'game'],
  socketSendMessage: function () {
    this.socket.emit('login', {
      id: new Date().getTime(),
      name: 'guobg'
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.onSocketMessage((res) => {
      const { type, data } = JSON.parse(res.data);
      switch (type) {
        case 'userJoin':
          this.userJoin(data);
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

  userJoin: function(data){
    console.log(this.data);
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
  }
}))