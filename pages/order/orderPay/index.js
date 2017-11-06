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

    // that.setData({
    //   result: options.result
    // });
    wx.getStorage({
      key: 'orderList',
      success: function (res) {
        that.setData({
          price: res.data.price
        })
      }
    })
  },
  clickChecked: function () {
    var that = this;
    that.setData({
      checked: true,
      active: 'active'
    });
  },
  switchTab:function(e){
    var that = this;
    if (that.data.checked == true){
      wx.getStorage({
        key: 'orderList',
        success: function (orderList) {
          var now_score = orderList.data.now_score;
          wx.getStorage({
            key: 'spec',
            success: function (spec) {
              //生成detail
              var member = spec.data.member;
              var spec = spec.data.spec;
              var detail = member + ',' + spec;

              //微信支付-----------------------------------------------------------------------------
              //微信支付所需参数
              var mch_id = '1488832592';  //商户号
              var mch_key = 'G1524ghj861473f42h5s7211cr5FG261';   //商户号密钥
              var body = '云南悦途酒店管理有限公司-嘉优隆酒店预定';  //商家名称-销售商品类目
              var total_fee = orderList.data.price * 100;   //总价(单位为分!)
              var spbill_create_ip = '127.0.0.1';   //支付提交用户端IP(随便写)
              var trade_type = 'JSAPI';   //交易类型(小程序用JSAPI)


              //微信支付参数生成方法---------------------
              var payArr = {
                appid: app.globalData.appid,
                mch_id: mch_id,
                nonce_str: app.globalData.randomString(),
                body: body,
                openid: app.globalData.openId,
                out_trade_no: app.globalData.outTradeNo(),
                total_fee: total_fee,
                spbill_create_ip: spbill_create_ip,
                notify_url: app.globalData.webSite + '/Home/Admin/wecahtPayBack',
                trade_type: trade_type
              }
              //生成sign (签名)-------------------------
              var sign = 'appid=' + payArr.appid +
                '&body=' + payArr.body +
                '&mch_id=' + payArr.mch_id +
                '&nonce_str=' + payArr.nonce_str +
                '&notify_url=' + payArr.notify_url +
                '&openid=' + payArr.openid +
                '&out_trade_no=' + payArr.out_trade_no +
                '&spbill_create_ip=' + payArr.spbill_create_ip +
                '&total_fee=' + payArr.total_fee +
                '&trade_type=' + payArr.trade_type +
                '&key=' + mch_key;


              //统一下单--------------------------------
              wx.request({
                url: app.globalData.webSite + '/Home/Admin/keyMD5',
                data: { sign: sign },
                success: function (res) {
                  payArr.sign = res.data.toUpperCase();

                  // console.log('payArr---------------');
                  // console.log(payArr);

                  wx.request({
                    header: {
                      "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: 'POST',
                    url: 'https://api.mch.weixin.qq.com/pay/unifiedorder',
                    data: "<xml>" +
                    "<appid><![CDATA[" + payArr.appid + "]]></appid>" +
                    "<body><![CDATA[" + payArr.body + "]]></body>" +
                    "<mch_id><![CDATA[" + payArr.mch_id + "]]></mch_id>" +
                    "<nonce_str><![CDATA[" + payArr.nonce_str + "]]></nonce_str>" +
                    "<notify_url><![CDATA[" + payArr.notify_url + "]]></notify_url>" +
                    "<openid><![CDATA[" + payArr.openid + "]]></openid>" +
                    "<out_trade_no><![CDATA[" + payArr.out_trade_no + "]]></out_trade_no>" +

                    "<spbill_create_ip><![CDATA[" + payArr.spbill_create_ip + "]]></spbill_create_ip>" +
                    "<total_fee><![CDATA[" + payArr.total_fee + "]]></total_fee>" +
                    "<trade_type><![CDATA[" + payArr.trade_type + "]]></trade_type>" +
                    "<sign><![CDATA[" + payArr.sign + "]]></sign>" +
                    "</xml>",
                    success: function (res) {
                      var xmlData = res.data;

                      //XML解析单条数据------------------------------
                      var xmlStr1 = '<prepay_id>';
                      var xmlStr2 = '</prepay_id>';
                      xmlData = xmlData.split(xmlStr1);
                      xmlData = xmlData[1].split(xmlStr2);
                      xmlData = xmlData[0].split('<![CDATA[');
                      xmlData = xmlData[1].split(']]>');
                      var prepay_id = xmlData[0]; //最后数据(值)

                      //发起微信支付----------------------------
                      //当前时间戳
                      var timestamp = Date.parse(new Date());

                      //调起微信支付的签名
                      var wechatPayArr = {
                        appId: payArr.appid,
                        nonceStr: app.globalData.randomString(),
                        package: 'prepay_id=' + prepay_id,
                        signType: 'MD5',
                        timeStamp: timestamp.toString()
                      }
                      // console.log('wechatPayArr---------------');
                      // console.log(wechatPayArr);

                      var paySign = 'appId=' + wechatPayArr.appId +
                        '&nonceStr=' + wechatPayArr.nonceStr +
                        '&package=' + wechatPayArr.package +
                        '&signType=' + wechatPayArr.signType +
                        '&timeStamp=' + wechatPayArr.timeStamp +
                        '&key=' + mch_key;

                      //后台加密
                      wx.request({
                        url: app.globalData.webSite + '/Home/Admin/keyMD5',
                        data: { sign: paySign },
                        success: function (res) {
                          wechatPayArr.paySign = res.data.toUpperCase();

                          //发起支付
                          wx.requestPayment({
                            timeStamp: wechatPayArr.timeStamp,
                            nonceStr: wechatPayArr.nonceStr,
                            package: wechatPayArr.package,
                            signType: wechatPayArr.signType,
                            paySign: wechatPayArr.paySign,
                            success: function (pay) {
                              //支付成功后------------------------------------
                              wx.request({
                                header: {
                                  "Content-Type": "application/x-www-form-urlencoded"
                                },
                                url: app.globalData.webSite + '/Home/Wechat/orderAdd',
                                method: 'POST',
                                data: {
                                  order_number: payArr.out_trade_no,     //订单号
                                  hotel_id: orderList.data.hotel_id,    //酒店id
                                  hotel_name: orderList.data.hotel_name,//酒店名称
                                  hotel_phone: orderList.data.hotel_phone,   //酒店电话
                                  theme: orderList.data.theme,        //酒店房间类型
                                  address: orderList.data.address,      //酒店地址
                                  check_in: orderList.data.check_in,    //入住时间
                                  check_out: orderList.data.check_out,  //离宿时间
                                  detail: detail,                 //酒店详情
                                  cost_price: orderList.data.cost_price,//酒店原价格
                                  price: orderList.data.price,          //酒店实际价格
                                  used_score: orderList.data.used_score,//会员积分
                                  now_score: now_score,  //剩余积分
                                  status: 0,                      //状态
                                  user_name: orderList.data.user_name,  //入住人姓名
                                  user_phone: orderList.data.user_phone,//入住人电话  
                                },
                                success: function (res) {
                                  var code = res.data.code;
                                  if (code == 200) {
                                    app.globalData.userInfo.score = now_score;
                                    wx.switchTab({
                                      url: '/pages/me/index/index'
                                    });
                                    wx.request({
                                      header: {
                                        "Content-Type": "application/x-www-form-urlencoded"
                                      },
                                      url: app.globalData.webSite + '/Home/Admin/sendPhoneMessage',
                                      data: {
                                        send_model: 'order_remind',
                                      },
                                      method: 'POST',
                                      success: function (res) {
                                      }
                                    });
                                  }
                                }
                              })
                            },
                            fail: function (res) {
                              console.log('支付失败------------------------');
                              console.log(res);
                            }
                          });
                        }
                      })

                    }
                  });
                }
              })
              //微信支付结束--------------------------------------------------------------------------------

            }
          });
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