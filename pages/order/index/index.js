// pages/order/index/index.js
var app = getApp(); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //购餐数量
    num:0,
    price:15.58,
    sum:0, 
    show:'',
    flag:true,
    shadeShow:"",
    colorNum:0,
    webSite: app.globalData.webSite,
  },
  //点击添加购餐数量
 add:function(e){
   var that=this;
   var nums=that.data.num;
   var singlePrice = e.currentTarget.dataset.price;
   var id = e.currentTarget.dataset.id;
   //console.log("添加按钮");
  // console.log(id);
   var typeList = that.data.typeList;
   typeList.forEach(function(val,key){
      if(val.dish_id==id){
        that.setData({
          num: nums + 1,
          sum: ((nums + 1) * singlePrice).toFixed(2),//输出结果保留两位小数
          id:id
        })
      }
   })
   //console.log(id);
   
 },
 //点击减少购餐数量
 reduce: function (e) {
   var that = this;
   var nums = that.data.num;
   var singlePrice = e.currentTarget.dataset.price;
   var sums=that.data.sum;
   var typeList = that.data.typeList;
   var id = e.currentTarget.dataset.id;
   
   typeList.forEach(function(val,key){
     if (val.dish_id == id) {
       if (nums == 0) {
         that.setData({
           num: 0,
         })
       }
       else {
         if (sums <= 0) {
           that.setData({
             sum: 0,
           })
         } else {
           that.setData({
             num: nums - 1,
             sum: (sums - singlePrice).toFixed(2),
             id: id
           })
         }

       }
     }
   })
   
   
 },
 //点击购物车显示具体购物信息
 bindImg:function(){
   var that = this;
   var _flag = that.data.flag;
   if(_flag){
     that.setData({
       show: "show",
       flag:false,
       shadeShow:'shadeShow'
     })
   }
   if(!_flag){
     that.setData({
       show: "",
       flag:true,
       shadeShow: ''
     })
   }
    
    
 },
//  点击美食分类改变背景色
changeColor:function(e){
  var that=this;
  var num=e.currentTarget.dataset.num;
  var id = e.currentTarget.dataset.id;
  var name = e.currentTarget.dataset.name;
  var categoryList = that.data.categoryList;
 categoryList.forEach(function(val,key){
   if (val.id == id){
       console.log(val.child);
       if(val.child){
         that.setData({
           typeList: val.child
         })
       }else{
         that.setData({
           typeList: ''
         })
       } 
   }
 });
  //console.log(num);
  that.setData({
    colorNum: num,
    name:name
  });
 
},
//点击结算按钮
account:function(){
  wx.navigateTo({
    url: '/pages/order/addOrder/index',
  })
},
//点击cart消失
hidCart:function(){
  var that = this;
  var _flag = that.data.flag;
  if (_flag) {
    that.setData({
      show: "show",
      flag: false,
      shadeShow: 'shadeShow'
    })
  }
  if (!_flag) {
    that.setData({
      show: "",
      flag: true,
      shadeShow: ''
    })
  }
},
// //点击显示详情
// showDetail:function(){
//   wx.navigateTo({
//     url: '/pages/order/orderDetail/index',
//   })
// },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    //获取屏幕信息
    wx.getSystemInfo({
      success: function(res) {
       that.setData({
         height:res.windowHeight,
         width:res.windowWidth,
       })
      },
    })
    //请求接口
    var id = options.id;
    //var typeList=[];
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'get',
      url: app.globalData.webSite + '/weixin.php/wechat/getdish/id/3',
      data:{
          id:id,
      },
      success: function (res) {
        console.log("请求接口11111");
        console.log(res.data);
           that.setData({
             categoryList: res.data,
             name: res.data[0].category_name,
        });  
        res.data.forEach(function(val,key){
          if(val.child){
            //console.log(val.child);
            that.setData({
              typeList: val.child
            })
          }   
        })
        
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