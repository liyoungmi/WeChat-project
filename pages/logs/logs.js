// pages/logs/logs.js
var fileData = require('../../utils/goods.js')   
var goodsId = null;
var goods = null;                    
Page({
  data:{
    intCart: '加入购物车',
    buyNow: "立即购买",
    goods: null,
  },
  onLoad: function (options) {
    var init = fileData.searchmtdata(options.id)
    this.setData({
      data_ID: options.id,
      data_status: init.thumb,
      data_MTId: init.title,
      data_duration: init.money,
    })
  },

  addGoods: function (e){
    var that = this;
    var goodid = e.currentTarget.dataset.goodid;

    var init = fileData.searchmtdata(goodid);
    var pictureOld = init.thumb;
    var titleOld  = init.title;
    var moneyOld  = init.money;

    goods = {
      thumb: pictureOld,
      title: titleOld,
      money: moneyOld,
      count: 1,
      id: goodid
    }
    that.setData({
      goods: goods
    })

    var goods = this.data.goods;
    // goods.isSelect = false;
    var thumb = this.data.goods.thumb;
    var count = this.data.goods.count;
    var title = this.data.goods.title; 
    var money = this.data.goods.money;
    var id = this.data.goods.id;

    if (title.length > 13) {
      goods.title = title.substring(0, 13) + '...';
    }
    // 获取购物车的缓存数组（没有数据，则赋予一个空数组）  
    var arr = wx.getStorageSync('cart') || [];
    console.log(arr)

    if (arr.length > 0) {
      // 遍历购物车数组  
      for (var j in arr) {
        // 判断购物车内的item的id，和事件传递过来的id，是否相等  
        if (arr[j].id == id) {
          console.log(arr[j])
          // 相等的话，给count+1（即再次添加入购物车，数量+1）  
          arr[j].count = arr[j].count +1;
          // 最后，把购物车数据，存放入缓存（此处不用再给购物车数组push元素进去，因为这个是购物车有的，直接更新当前数组即可）  
          try {
            wx.setStorageSync('cart', arr)
          } catch (e) {
            console.log(e)
          }
          //关闭窗口
          wx.showToast({
            title: '加入购物车成功！',
            icon: 'success',
            duration: 2000
          });
          // this.closeDialog();
          // 返回（在if内使用return，跳出循环节约运算，节约性能） 
          return;
        }
      }
      // 遍历完购物车后，没有对应的item项，把goodslist的当前项放入购物车数组  
      arr.push(goods);
    } else {
      arr.push(goods);
    }
    // 最后，把购物车数据，存放入缓存  
    try {
      wx.setStorageSync('cart', arr)
      // 返回（在if内使用return，跳出循环节约运算，节约性能） 
      //关闭窗口
      wx.showToast({
        title: '加入购物车成功！',
        icon: 'success',
        duration: 2000
      });
      // this.closeDialog();
      return;
    } catch (e) {
      console.log(e)
    }

    // wx.showToast({
    //   title: '成功加入购物车~',
    //   icon: 'success',
    //   duration: 2000
    // })
  },
  buyNow: function(){
    wx.showToast({
      title: '去达购买页面还未完成~',
      icon: 'success',
      duration: 2000
    })
  }
})
