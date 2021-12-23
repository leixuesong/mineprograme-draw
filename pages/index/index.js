Page({
  data: {
    boxData: {
      width: 320,
      height: 320
    },

    prizeList: [],
    // 中奖下标
    targetIndex: 0
  },
  onLoad() {
    var _this = this;
    setTimeout(function () {
      _this.setData({
        prizeList: [{
            name: '0.1元现金奖现金奖现金奖现金奖现金奖',
            image: '/img/chose.png'
          },
          {
            name: '10元现金奖',
            image: '/img/chose.png'
          },
          {
            name: '5元话费',
            image: '/img/chose.png'
          },
          {
            name: '50元现金奖',
            image: '/img/chose.png'
          },
          {
            name: '1卷抽纸',
            image: '/img/chose.png'
          },
          {
            name: '0.05元现金奖',
            image: '/img/chose.png'
          }
        ]
      })

    }, 1500);
  },
  befoterClick() {
    // 设置中奖index,并开始抽奖
    this.setData({
      targetIndex:Math.floor((Math.random()*6))
    })
    this.selectComponent('#draw').rotoreAction(this.data.targetIndex)
  },
  afterClick() {
    
    // 中奖后的逻辑
    wx.showToast({
      title: this.data.prizeList[this.data.targetIndex].name
    })
  },
})