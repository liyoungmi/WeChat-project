// pages/carts/carts.js
var carts = require('../../utils/goods.js')
Page({
  data: {
    address: {},
    hasAddress: false,
    total: 0,
    orders: null
  },

  onReady() {
    this.getTotalPrice();
  },

  onShow: function () {
    const that = this;
    var arr = wx.getStorageSync('cart') || [];
    that.setData({
      orders: arr
    })
    wx.getStorage({
      key: 'address',
      success(res) {
        that.setData({
          address: res.data,
          hasAddress: true
        })
      }
    })
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let orders = this.data.orders;
    let total = 0;
    for (let i = 0; i < orders.length; i++) {
      total += orders[i].count * orders[i].money;
    }
    this.setData({
      total: total
    })
  },

  toPay() {
    wx.showModal({
      title: '提示',
      content: '本系统只做演示，支付系统已屏蔽',
      text: 'center',
      complete() {
        wx.switchTab({
          url: '/pages/profile/profile'
        })
      }
    })
  }
})
