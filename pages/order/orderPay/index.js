// pages/hotel/order_pay/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var price;
    console.log("2017嘉禾");
   console.log(options.price);
    that.setData({
      sum:options.price
    });
    
  },
  clickChecked: function () {
    var that = this;
    that.setData({
      checked: true,
      active: 'active'
    });
  },
  switchTab:function(e){
    //console.log("支付");
    var that = this;
    if (that.data.checked == true){
      wx.getStorage({
        key: 'sdkData',
        success: function (res) {
         // console.log("微信支付");

          //微信支付-----------------------------------------------------------------------------
          //微信支付所需参数
          //var mch_id = '1488832592';  //商户号
          //var mch_key = 'G1524ghj861473f42h5s7211cr5FG261';   //商户号密钥
         // var body = '云南悦途酒店管理有限公司-嘉优隆酒店预定';  //商家名称-销售商品类目
         // var spbill_create_ip = '127.0.0.1';   //支付提交用户端IP(随便写)
          var trade_type = 'JSAPI';   //交易类型(小程序用JSAPI)

          //发起微信支付----------------------------
          //当前时间戳
          var timestamp = String(res.data.timeStamp);
          var nonceStr = res.data.sdk.nonceStr;
          var paySign  = res.data.sdk.paySign;
          var Package  = res.data.sdk.package;
          var signType = 'MD5';
          wx.requestPayment({
            'timeStamp': timestamp,
            'nonceStr': nonceStr,
            'package': Package,
            'signType': signType,
            'paySign': paySign,
            'success': function (res) {
             // console.log("支付成功");
              var orderid;
              wx.getStorage({
                key: 'sdkData',
                success: function (res) {
                  //console.log("订单参数");
                  orderid = res.data.orderId;
                },
              })
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
              wx.navigateTo({
                url: '/pages/order/orderList/index',
              })
            },
            'fail': function (res) {
              console.log("-----------");
              console.log(res);
            },
            complete:function(res){
              console.log("++++++++++")
              console.log(res);
            }
          })
        }
      });
    }
   
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