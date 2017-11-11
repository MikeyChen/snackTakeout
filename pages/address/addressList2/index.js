// pages/address/addressList/index.js
var app = getApp(); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
   grey:"#f5f5f5",
   green:"#7be22a",
   isSelected:false,
   id:0,
   selected:[],
   isShow:'isShow',
   isHide:'isHide',
   addressList:[]
  },
  //选择地址
  selected:function(e){
    var that=this;
    var id=e.currentTarget.dataset.id;
    var addressList=that.data.addressList;
    var selected=that.data.selected;
    addressList.forEach(function(val,key){
      if(val.id==id){
        val.isSelected = true;
      }else{
        val.isSelected = false;
      }
    })
    that.setData({
      addressList: addressList,
      id:id,
      isSelected:true,//为true选中地址s
      selected:selected
    })
    console.log(that.data.addressList);
  },
  //删除收货地址
  delAddr:function(e){
    var that=this;
    //var obj = e.currentTarget.dataset.obj;
    var weixin_user_id = wx.getStorageSync("weixin_user_id");
    var addressList = [];
    var id = e.currentTarget.dataset.id;
    console.log("删除");
    console.log(id);
    wx.showModal({
      title: '删除提示',
      content: '确定删除吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定');
          wx.request({
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            method: 'get',
            url: app.globalData.webSite + '/weixin.php/wechat/addressDelete',
            data: {
              id: id,
            },
            success: function (res) {
              wx.request({
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                method: 'get',
                url: app.globalData.webSite + '/weixin.php/wechat/addressGet',
                data: {
                  weixin_user_id: weixin_user_id,
                },
                success: function (res) {
                  console.log("//////////////////");
                  console.log(res);
                  if (res.data.code == 0) {
                    console.log("地址列表");
                    console.log(res.data.data);
                    res.data.data.forEach(function (val, key) {
                      addressList.push(val);
                    })
                    if (addressList.length != 0) {
                      console.log("地址列表不为空");
                      addressList[0].isSelected = true;
                      that.setData({
                        addressList: addressList,
                        id: addressList[0].id,//设置默认地址
                      })
                    } else {
                      console.log("地址列表为空");
                      that.setData({
                        addressList: [],
                      })
                    }

                  }
                },
              })

            },
          })
        } else {
          console.log('用户点击取消')
        }

      }
    })
    
  },
  // 新增收货地址
  addAddr:function(e){
    //console.log(obj);
    var that = this;
    var obj = e.currentTarget.dataset.obj; 
    wx.navigateTo({
      url: '/pages/address/editAddress/index?obj='+'',
    })
  },
  //修改地址
  editAddr:function(e){
    var obj=e.currentTarget.dataset.obj; 
      var str = JSON.stringify(e.currentTarget.dataset.obj);
      wx.navigateTo({
        url: '/pages/address/editAddress/index?obj=' + str,
      })
  },
  // 点击确定按钮
  confirm:function(){
    var that=this;
    var selected=[];
    var addressList=that.data.addressList;
    addressList.forEach(function(val,key){
      if(val.isSelected){
       //selected.push(val);
       wx.setStorage({
         key: 'selected',
         data: val,
       })
      }
    })
    //返回上一层页面
    wx.navigateBack();
    //console.log(selected);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var addressList = [];
    var weixin_user_id = wx.getStorageSync("weixin_user_id");
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'get',
      url: app.globalData.webSite + '/weixin.php/wechat/addressGet',
      data: {
        weixin_user_id: weixin_user_id,
      },
      success: function (res) {
        console.log("//////////////////");
        console.log(res);
        if (res.data.code == 0) {
          console.log("地址列表");
          console.log(res.data.data);
          res.data.data.forEach(function (val, key) {
            addressList.push(val);
          })
          if (addressList.length != 0) {
            console.log("地址列表不为空");
            addressList[0].isSelected = true;
            that.setData({
              addressList: addressList,
              id: addressList[0].id,//设置默认地址
            })
          } else {
            console.log("地址列表为空");
            that.setData({
              addressList: [],
            })
          }

        }
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