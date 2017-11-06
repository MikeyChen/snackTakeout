// pages/order/orderList/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    percent:"0",
    animation: 'animation0',
  },
  //点击订单类型
  orderNavClick:function(e){
    var that=this;
    console.log(e);
    var num=e.currentTarget.dataset.active;
    var animation = 'animation' + num;
    that.setData({
      active:num,
      animation: animation
    })
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