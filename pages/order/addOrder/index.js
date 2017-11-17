// pages/order/addOrder/index.js
var app = getApp(); 
var myDate=new Date();
var QQMapWX = require('../../../libs/qqmap-wx-jssdk.min.js');
var qqmapsdk = new QQMapWX({
  key: 'ACWBZ-XGQKO-SRPWW-SHFCA-XIYGS-NHBQK'
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    webSite: app.globalData.webSite, 
    hasAddress:false,
    addr:'请添加收货地址'
    
  },
  //提交订单
  submitOrder:function(e){
    var that=this;
    var selAddress = that.data.selAddress;
    var typeList=that.data.typeList;
    var isEmpty = that.data.addr;
    var orderid;
    //判断地址是否为空
    if (isEmpty == "" || isEmpty=="请添加收货地址"){
      wx.showModal({
        title: '提示',
        content: '收货地址不能为空',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else {
            console.log('用户点击取消')
          }

        }
      })
    }else{
      //地址不为空，跳转到订单页面
      wx.request({
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'post',
        data: {
          address_id: selAddress.id,
          weixin_user_id: selAddress.weixin_user_id,
          total: that.data.allPrice,
          dishData: JSON.stringify(typeList),
          store_id: typeList[0].store_id
        },
        url: app.globalData.webSite + '/weixin.php/wechat/createOrder',
        success: function (res) {
         console.log("价格");
          console.log(res.data);
          orderid = res.data.orderid;
          wx.setStorage({
            key: 'sdkData',
            data: {'sdk':res.data.sdkData,orderId:res.data.orderid},
          })
          //var str = JSON.stringify(res.data);
          
          wx.showModal({
            title: '提示',
            content: '立即支付吗',
            success: function (res) {
              if (res.confirm) {
              wx.getStorage({
                key: 'sdkData',
                success: function(parm) {
                  var timestamp = String(parm.data.sdk.timeStamp);
                  var nonceStr = parm.data.sdk.nonceStr;
                  var paySign = parm.data.sdk.paySign;
                  var Package = parm.data.sdk.package;
                  var signType = 'MD5';
                  wx.requestPayment({
                    'timeStamp': timestamp,
                    'nonceStr': nonceStr,
                    'package': Package,
                    'signType': signType,
                    'paySign': paySign,
                    'success': function (res) {
                      
                      wx.request({
                        header: {
                          "Content-Type": "application/x-www-form-urlencoded"
                        },
                        method: 'post',
                        data: {
                          //weixin_user_id: wx.getStorageSync("weixin_user_id"),
                          orderid: orderid,
                        },
                        url: app.globalData.webSite + 'weixin.php/wechat/confirmOrder',
                      })
                      
                    },
                    'fail': function (res) {
                      console.log("-----------");
                      console.log(res);
                    },
                    complete: function (res) {
                      console.log("++++++++++")
                      console.log(res);
                    }
                  })
                },
              })







                
              } else {
                wx.navigateTo({
                  url: '/pages/order/orderList/index?orderid='+orderid,
                })
              }

            }
          })

         
         
        },

      })
       
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var arr=[];
  //购物车食物
    wx.getStorage({
      key: 'typeList',
      success: function(res) {
        console.log("订单");
        console.log(res);
        res.data.typeList.forEach(function(val,key){
          console.log("val");
          if(val.child){
            val.child.forEach(function (val1, key1) {
              if (val1.flag != 0) {
                arr.push(val.child[key1]);
              }
            })
          }
         
           
        })
        that.setData({
          typeList:arr,
          price: res.data.price
        })
      },
    })
    wx.getStorage({
      key: 'price',
      success: function(res) {
        that.setData({
          allPrice:res.data
        })
      },
    })
    
    //送餐到达时间
    var hour = myDate.getHours();
    var seconds = myDate.getMinutes();
    wx.getStorage({
      key: 'sendTime',
      success: function(res) {
        var allTime = res.data + seconds;
        console.log(allTime);
        if (allTime>=60){
          hour++;
          allTime=allTime-60;
          if (allTime<=9){
            allTime="0"+allTime;
          }
        }
        that.setData({
            sendTime:allTime,
            hour:hour
        })
      },
    })
    
    that.setData({
      hour:hour,
    })
    //判断地址是否填写
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
    var that=this;
    //从缓存取地址
    wx.getStorage({
      key: 'selected',
      success: function (res) {
        // console.log("地址");
         console.log(res.data);
        //var addr = res.data.name + res.data.address + res.data.street;
        that.setData({
          selAddress: res.data,
          addr: res.data.name + res.data.address + res.data.street
        })
      },
    })
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
  
  }
})