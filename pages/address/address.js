// pages/address/address.js
// page/component/new-pages/user/address/address.js
Page({
  data: {
    address: {
      name: '',
      phone: '',
      detail: '',
    },
   
  },
  onLoad() {
    var that = this;

    wx.getStorage({
      key: 'address',
      success: function (res) {
        const storemapwords = wx.getStorageSync('storemapwords');
        console.log(storemapwords)
        res.data.detail = storemapwords;
        that.setData({
          address: res.data
        })
      }
    })
  },
  formSubmit(e) {
    const value = e.detail.value;
    
  
    if (value.name && value.phone && value.detail) {
      wx.setStorage({
        key: 'address',
        data: value,
        success() {
          wx.navigateTo({
            url: '../carts/carts'
          })
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请填写完整资料',
        showCancel: false
      })
    }
  }
})
