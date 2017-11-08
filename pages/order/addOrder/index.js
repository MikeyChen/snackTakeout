// pages/order/addOrder/index.js
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
   
    
  },
  // 选择收货地址
  choseAddress:function(){
    wx.navigateTo({
      url: '/pages/address/addressList/index',
    })
  },
  //提交订单
  submitOrder:function(){
    wx.navigateTo({
      url: '/pages/order/orderList/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    //var duration=that.data.duration;
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
    
    // console.log("sendTime:" + that.data.duration);
    // console.log("seconds:"+seconds);
    //sendTime=sendTime+seconds;
    that.setData({
      hour:hour,
      //sendTime:sendTime,
    })
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
  
  }
})