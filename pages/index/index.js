//index.js
//获取应用实例
var app = getApp();
var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');
var qqmapsdk = new QQMapWX({
  key: 'ACWBZ-XGQKO-SRPWW-SHFCA-XIYGS-NHBQK'
});

Page({
  data: {
    imgUrls: [
      '/imgs/circle_1.jpg',
      '/imgs/circle_2.jpg',
      '/imgs/circle_3.jpg'
    ],
    webSite: app.globalData.webSite,
    shopAddress: "云南省昆明市西山区H公寓",
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    shoplng: '',//商家地址
    shoplat: '',
    personlng: '',
    personlat: '',
  },
  //点击跳转到相应的店铺点餐页面
  jump: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var img = e.currentTarget.dataset.img;
    wx.navigateTo({
      url: '/pages/order/index/index?id=' + id+'&img='+img,
    })
  },
  onLoad: function () {
    //var shopList=[];
    var that = this;
    //地址解析，把地址解析成经纬度
    qqmapsdk.geocoder({
      address: that.data.shopAddress,
      success: function (res) {
        that.setData({
          shoplng: res.result.location.lng,
          shoplat: res.result.location.lat,
        });
        //计算距离
        qqmapsdk.calculateDistance({
          mode: 'driving',
          to: [
            {
              latitude: that.data.shoplat,
              longitude: that.data.shoplng,
            }
          ],
          success: function (res) {
            console.log(res);
            var far = res.result.elements[0].distance / 1000;
            var duration = (res.result.elements[0].duration) / 60;
            var sendTime = Math.round(duration);

            wx.setStorage({
              key: 'sendTime',
              data: sendTime,
            })
            that.setData({
              distance: far.toFixed(2),//距离保留两位小数 
            });
          },
          fail: function (res) {
            console.log("fail");
            that.setData({
              distance: '超过10'
            });
          },
        });
      },
      fail: function (res) {
        // console.log(fail);
      }
    });
    //////////////////////////////不能删//////////////////////////
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
          wx.request({
            url: 'http://192.168.3.172/weixin.php/wechat/saveUserinfo', //仅为示例，并非真实的接口地址
            data: {
              rawData: res.rawData,
              weixin_user_id: wx.getStorageSync('weixin_user_id'),
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            method: 'POST',
            success: function (res) {
              if (res.data.code == 0) {
                console.log(res.data.info);
              }
            }
          })
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        },
      })
    }
    /////////////////////////////不能删///////////////////////////////////////
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'get',
      url: app.globalData.webSite + '/weixin.php/wechat/getstore',
      success: function (res) {
        
        //console.log(res);
        that.setData({
          shopList: res.data
        })

        //console.log(that.data.shopList);
      },
    })




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
