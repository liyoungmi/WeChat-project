var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  data: {
    latitude: 0,
    longitude: 0,
    markers: [],

    showMapwords:false,
    mapwords: {},

    mapAddress: {},
    hasmapAddress: false,
    showResult: false,
  
    mobileLocation: {//移动选择位置数据
      longitude: 0,
      latitude: 0,
      address: '',
    },
    controls: [{
      id: 1,
      iconPath: '../../img/map.png',
      position: {
        left: 5,
        top: 300 - 50,
        width: 20,
        height: 30
      },
      clickable: true
    }]
  },
  onLoad: function () {
    // 实例化API核心类
      qqmapsdk = new QQMapWX({
      key: 'YVTBZ-DG2LU-DBEVY-BLZXT-ZUDO5-HDBBK'
    }); 

    var that = this;
    //获取位置
    wx.getLocation({
      type: 'gcj02',//默认为 wgs84 返回 gps 坐标，gcj02 返回可用于wx.openLocation的坐标
      success: function (res) {
        var marker = [{
          id: 0,
          latitude: res.latitude,
          longitude: res.longitude,
          iconPath: "../../img/map.png",
          width: 20,
          height: 30
        }];
        var mobileLocation = {
          latitude: res.latitude,
          longitude: res.longitude,
        };
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          markers: marker,
        });
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },
})
},

  storemapwords(e){
    let storemapwords = e.currentTarget.dataset.text.title;
    wx.setStorageSync('storemapwords', storemapwords);
  },

  storemwords(e){
    let storemapwords = e.currentTarget.dataset.text.title;
    console.log(storemapwords)
    wx.setStorageSync('storemapwords', storemapwords);
  },

  onShow: function () {
    var that = this;
    // 调用接口
    qqmapsdk.search({
      keyword: '大楼',
      success: function (res) {
        that.setData({
          mapAddress: res.data,
          hasmapAddress: true
        })
      },
      fail: function (res) {
        
      },
      complete: function (res) {
        
      }
    });
  },

//key的每秒请求量不够用，嘤嘤嘤，想通过尝试缓存结果来降低key的请求量
  searchAddress:function(e){
    var that = this;
    qqmapsdk.getSuggestion({
      keyword: e.detail.value,
      // region: '广州',  限制范围是广州境内
      success: function (res) {
        for(let i=0;i<10;i++){
            
        }
        that.setData({
          mapwords: res.data,
          showMapwords: true,
          hasmapAddress:false,
          showResult:true,
        })
      },
      fail: function (res) {
        
      },
      complete: function (res) {
        
      }
    })
  },
  cancelSearch() {
    this.setData({
      showMapwords: false,
      
    })
  },

storePlace:function(e){
  console.log(e)
},  

})
