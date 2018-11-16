// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  phoneInput: function (e) {
    this.setData({
      account: e.detail.value
    })
  },
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  login: function () {
    var that = this;
  
    wx.request({
      url: 'http://127.0.0.1:8080/login',
      
      data: {
        username: that.data.account,
        password: that.data.password,
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.username === "常酱油" && res.data.password === "123456"){
          console.log(res.data)
          wx.switchTab({
            url: '/pages/index/index'
          })  
          // wx.navigateTo({
          //   url: 'pages/index/index'
          // }) 
        }else{
          console.log('用户名或密码错误');
        }
      },
      fail: function (res) {
        console.log("--------fail--------");
      }

    })
  }
})