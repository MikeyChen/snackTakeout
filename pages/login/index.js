// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toView: '',
    scrollTop: 200,
    letter: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7']
  },
  click: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    console.log('1111111111111');
    console.log(index);
    that.data.letter.forEach(function (val, key) {
      if (index == val) {
        that.setData({
          toView: index
        })
      }
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