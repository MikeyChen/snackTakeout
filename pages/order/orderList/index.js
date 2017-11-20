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
    block:"block",
    none:"none",
    empty:'empty_box',
    again:"block",
    pay:'block',
    refund:'block'
  },
  //点击订单类型
  orderNavClick:function(e){
    var that=this;
    var num=e.currentTarget.dataset.active;
    var animation = 'animation' + num;
    var list=[];
    var index=parseInt(num)-1;
    that.setData({
      active:num,
      animation: animation
    })
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
            data.data[key]['sum'] = 0;
            val.dishData.forEach(function (val1, key1) {
              data.data[key]['sum'] += val1.total;
            })
            orderList.push(val)
          })
          // 再来一单 show 立即付款 none
          orderList.forEach(function (val, key) {
            if (val.status == '0') {
              orderList[key].status = "待付款";
            }
            if (val.status == '1') {
              orderList[key].status = "配送中";
            }
            if (val.status == '2') {
              orderList[key].status = "已完成";
            }
            if (val.status == '3') {
              orderList[key].status = "退款中";
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
  pay:function(e){
    var that=this;
    var price = e.currentTarget.dataset.sum;
    var orderid = e.currentTarget.dataset.orderid;
    wx.navigateTo({
      url: '/pages/order/orderPay/index?price=' + price + '&orderid=' + orderid,
    })


  },
  //点击再来一单按钮
  again:function(e){
   wx.switchTab({
     url: '/pages/index/index',
   })
  },
  //
  refund:function(e){
    var that=this;
    var price = e.currentTarget.dataset.sum;
    var orderid = e.currentTarget.dataset.orderid;
    wx.navigateTo({
      url: '/pages/order/refund/index?price='+price+'&orderid='+orderid,
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
          //list[key]['id'] = 'A' + val.id
          data.data.forEach(function(val,key){
            data.data[key]['sum']=0;
            val.dishData.forEach(function(val1,key1){
              data.data[key]['sum'] += val1.total;
            })
            orderList.push(val)
          })
          orderList.forEach(function (val, key) {
            if (val.status == '0') {
              console.log(val.status);
              orderList[key].status = "待付款";
            }
            if (val.status == '1') {
              orderList[key].status = "配送中";
            }
            if (val.status == '2') {
              orderList[key].status = "已完成";
            }
            if (val.status == '3') {
              orderList[key].status = "退款中";
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