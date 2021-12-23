// components/draw.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    canvaswidth: {
      type: Number,
      value: 320
    },
    canvasheight: {
      type: Number,
      value: 320
    },
    // 奖品列表
    prizelist: {
      type: Array
    },
    // 奖品区块对应背景颜色
    colors: {
      type: Array,
      value: [
        'red',
        'green'
      ],
      // 必须是偶数且仅为 2 个颜色相互交替
      validator: function (value) {
        return value.length === 2
      }
    },
    // 旋转动画时间 单位s
    duration: {
      type: Number,
      value: 8
    },
    // 旋转的圈数
    ringCount: {
      type: Number,
      value: 8
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isClick: true, // 当前是否可点击
    isShow: true, // 是否初始化
    skew: 0, // 偏移角度
    degs: 0, // 旋转角度
    color1: 'red',
    color2: 'green',
    textwidth: '50%',
    rotates: 0, // box旋转角度
    isRoteIndex: 0 // 已经选中的key
  },

  observers: {
    'prizelist': function (val) {
      this.setData({
        color1: this.data.colors[0],
        color2: this.data.colors[1]
      })
      this.setView()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 计算当前每个deg
    setView() {
      let length = this.data.prizelist.length
      this.setData({
        textwidth: 180 / length + '%'
      })
      let _degs = 360 / length // 每个距离上一个的偏移角度
      if (length < 4) {

      } else { // 奖项大于等于4个
        this.setData({
          degs: _degs,
          skew: _degs - 90
        })
      }
    },
    // 点击抽奖
    handleAction() {
      if (!this.data.isClick) {
        return false
      }
      this.setData({
        isClick: false
      })
      this.triggerEvent('befoterClick')
    },
    rotoreAction(index) {
      let _rotates = 0
      if (this.data.isShow) {
        let _len = this.data.prizelist.length - 1
        // 第一次角度 => (总项 - 当前项) * 角度 + 360 * 圈数
        _rotates = (_len - index) * this.data.degs + 360 * this.data.ringCount
        this.setData({
          isShow: false,
          rotates: this.data.rotates + _rotates + (this.data.degs / 2),
          isRoteIndex: index
        })
      } else {
        // 不是第一次 => 
        _rotates = -(index - this.data.isRoteIndex) * this.data.degs + 360 * this.data.ringCount
        this.setData({
          rotates: this.data.rotates +_rotates,
          isRoteIndex: index
        })
      }
      setTimeout(() => {
        this.setData({
          isClick: true
        })
        this.triggerEvent('afterClick', {})
      }, this.data.duration * 1000 + 100)
    }
  }
})