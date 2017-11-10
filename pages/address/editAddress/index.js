// pages/address/editAddress/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  //点击确定按钮
  formSubmit: function (e) {
    var that = this;
    var isAddress=that.data.address;
    // console.log("空地址");
    // console.log(isAddress);
   // console.log('form发生了submit事件，携带数据为：', e.detail.value);
    var editAddress=e.detail.value; 
    //表单内容为空校验
    if (editAddress.phone.length == 0 || editAddress.name.length == 0 || editAddress.address.length == 0 || editAddress.street.length==0 || editAddress.sex.length==0){
      wx.showModal({
        title: '提示',
        content: '请确保所有信息已填完整',
        success: function (res) {
        }
      })
    }
    else{
      //请求接口
      if (isAddress=="empty") {
        console.log("没数据11111111111");
        wx.request({
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: 'post',
          url: app.globalData.webSite + '/weixin.php/wechat/addressadd',
          data: {
            phone: editAddress.phone,
            name: editAddress.name,
            sex: editAddress.sex,
            address: editAddress.address,
            street: editAddress.street,
            weixin_user_id: wx.getStorageSync("weixin_user_id")
          },

          success: function (res) {
            console.log("scuesss");
            if (res.data.code == 0) {
              //console.log(res);
              wx.navigateBack();
            }
          },
        })
        
      }else{
        console.log("有数据222222222");
        wx.request({
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: 'post',
          url: app.globalData.webSite + '/weixin.php/wechat/addressEdit',
          data: {
            id:isAddress.id,
            weixin_user_id: wx.getStorageSync("weixin_user_id")
          },
          success: function (res) {
            console.log("11111144444");
            console.log(res);
            if (res.data.code == 0) {
              console.log("121212121212121");
              //console.log(res);
              wx.navigateTo({
                url: '/pages/address/addressList/index',
                fail:function(res){
                  console.log("cccvv");
                  console.log(res);
                }
              })
            }
          },
        })
      }
    
    }
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    if(options.obj==''){
      that.setData({
        address: "empty",
      })
    }else{
      that.setData({
        address: JSON.parse(options.obj),
      })
    } 
    console.log("22222222222222222222");
    console.log(that.data.address);
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