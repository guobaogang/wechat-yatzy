//index.js
import store from '../../store/index';

//获取应用实例
const app = getApp()

Page(store.createPage({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  globalData: ['dice', 'game'],
  //事件处理函数
  joinGame: function () {
    wx.connectSocket({
      url: 'ws://192.168.124.17:8181'
    });
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！')

      wx.sendSocketMessage({
        data: JSON.stringify({
          type: 'login',
          data: {
            id: new Date().getTime(),
            name: app.globalData.userInfo.nickName,
            avatar: app.globalData.userInfo.avatarUrl
          }
        })
      })
    })
    wx.onSocketMessage((res) => {
      const { type, data } = JSON.parse(res.data);
      if (type === 'initData') {
        console.log(data);
        this.initData(data);
      }
    })
  },
  initData: function (data) {
    console.log(this.data);
    const {clients =[], myInfo} = data;
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
    store.dispatch('dice', dice);
    let game = {
      players: [],
      rounds: 1, //轮次
      isMyTurn: clients.length === 0,
      start: false,
      position: 0
    }
    clients.forEach(client=>{
      game.players.push({
        id: client.id,
        name: client.name,
        avatar: client.avatar,
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
    });
    game.players.push({
      isMe: true,
      id: myInfo.id,
      name: myInfo.name,
      avatar: myInfo.avatar,
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
    store.dispatch('game', game);
    wx.navigateTo({
      url: '../home/home',
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
)