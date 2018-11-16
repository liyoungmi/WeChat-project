// pages/index/index.js
var fileData = require('../../utils/goods.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showData: fileData.mtData().list,
    allText: '查看详情',
    imgUrls: [
      '../../img/b1.jpg',
      '../../img/b2.jpg',
      '../../img/b3.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,
  },
  addGoods: function (event) {  
    

    //存储数据
    console.log(event.currentTarget.dataset.hi)
    try {
      // 同步接口立即写入
      wx.setStorageSync("orderInfo", event.currentTarget.dataset.hi,)
      console.log('写入value2成功')
    } catch (e) {
      console.log('写入value2发生错误')
    }



      wx.showToast({
        title: '成功加入购物车~',
        icon: 'success',
        duration: 2000
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
   
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

})