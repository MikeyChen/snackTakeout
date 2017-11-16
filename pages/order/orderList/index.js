// pages/order/orderList/index.js
var app = getApp(); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    percent:"0",
    animation: 'animation0',
    webSite: app.globalData.webSite,
    isHid:false,
    isShow:false,
    empty:'empty_box'
  },
  //点击订单类型
  orderNavClick:function(e){
    var that=this;
    console.log(e);
    var num=e.currentTarget.dataset.active;
    var animation = 'animation' + num;
    var list=[];
    var index=parseInt(num)-1;
    that.setData({
      active:num,
      animation: animation
    })
    console.log("index");
    console.log(index);
    var orderList = [];
    var list = [];
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
      data: {
        weixin_user_id: wx.getStorageSync("weixin_user_id"),
        status:index,
      },
      url: app.globalData.webSite + 'weixin.php/Wechat/getOrder/weixin_user_id/1',
      success: function (res) {
        var data = res.data;
        console.log("订单列表");
        //console.log(data);
        // 0 待付款 1 配送中 2退款中 3 已完成
      
        if (data.code == 0) {
         
          if(data.data.length==0){
            that.setData({
              empty: 'empty_box1'
            })
          }
          if (data.data.length != 0) {
            that.setData({
              empty: 'empty_box'
            })
          }
          //orderList.push(data.data);
          data.data.forEach(function (val, key) {
            orderList.push(val)
          })
          orderList.forEach(function (val, key) {
            if (val.status == '0') {
              orderList[key].status = "待付款";
              that.setData({
                isHid: true
              })
            }
            if (val.status == '1') {
              orderList[key].status = "配送中";
              that.setData({
                isShow: true
              })
            }
            if (val.status == '2') {
              orderList[key].status = "退款中";
              that.setData({
                isHid: true,
                isShow: true
              })
            }
            if (val.status == '3') {
              orderList[key].status = "已完成";
              that.setData({
                isShow: true
              })
            }
          })
          
        } else {
          console.log("武术家");
          data.data=[];
          
        }
        that.setData({
          orderList: orderList, 
        })
      },
  
    })
    console.log(that.data.empty);
  },
  //支付
  pay:function(){
    wx.navigateTo({
      url: '/pages/order/orderPay/index',
    })
  },
  //点击再来一单按钮
  again:function(){
    wx.navigateTo({
      url:'/pages/order/index/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var orderList=[];
    var list=[];
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
      data: {
        weixin_user_id: wx.getStorageSync("weixin_user_id"),
        status:-1,
      },
      url: app.globalData.webSite + 'weixin.php/Wechat/getOrder/weixin_user_id/1',
      success: function (res) {
        var data=res.data;
          // 0 待付款 1 配送中 2退款中 3 已完成
        if(data.code == 0){
          if (data.data.length == 0) {
            that.setData({
              empty: 'empty_box1'
            })
          }
          if (data.data.length != 0) {
            that.setData({
              empty: 'empty_box'
            })
          }
          //orderList.push(data.data);
          data.data.forEach(function(val,key){
            orderList.push(val)
          })
          orderList.forEach(function (val, key) {
            if (val.status == '0') {
              orderList[key].status = "待付款";
              that.setData({
                isHid:true
              })
            }
            if (val.status == '1') {
              orderList[key].status = "配送中";
              that.setData({
                isShow: true
              })
            }
            if (val.status == '2') {
              orderList[key].status = "已完成";
              that.setData({
                isHid: true,
                isShow: true
              })
            }
            if (val.status == '3') {
              orderList[key].status = "退款中";
              that.setData({
                isShow: true
              })
            }
          })
          
          
        }else{
         data.data=[];
         that.setData({
           empty: 'empty_box1'
         })
         
        }
        that.setData({
          orderList: orderList,
          
        })
      },
     
    })
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        var height = res.windowHeight / 2;
        console.log(height);
        that.setData({
          height: height
        });
      },
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