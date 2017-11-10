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
    arrInfo:[],
    allPrice:0,
    typeList:[],
    totalPrice:0,
    allNum:0
  },
  //计算总价，总数
  getTotalPrice() {
    let typeList = this.data.typeList;                  // 获取购物车列表
    let total = 0;
    let numbers=0;
    for (let i = 0; i < typeList.length; i++) {         // 循环列表得到每个数据
      total += typeList[i].flag * typeList[i].price;
      numbers += typeList[i].flag;     // 所有价格加起来 
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      typeList: typeList,
      totalPrice: total.toFixed(2),
      allNum: numbers
    });
  },
  //点击添加购餐数量
  add: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var typeList = that.data.typeList;
    let num = typeList[index].flag;
    let total= typeList[index].total;
    var arrInfo=that.data.arrInfo;
    var allPrice=that.data.allPrice;
    num = num + 1;
    typeList[index].flag = num;
    typeList[index].total = num * typeList[index].price;
    arrInfo.push(typeList[index]);
    that.setData({
      typeList: typeList,
      arrInfo: arrInfo,
      allPrice:allPrice
    });
    that.getTotalPrice();
    wx.setStorage({
      key: 'typeList',
      data:  { typeList: that.data.typeList, price: typeList[index].total },
    })   
    //console.log(that.data.typeList);
  },
  //点击减少购餐数量
  reduce: function (e) {
    var that = this;
    var typeList = that.data.typeList;
    var index = e.currentTarget.dataset.index;
    let num = typeList[index].flag;
    let discount = typeList[index].discount;
    if (num <= 0) {
      return false;
    }
    num = num - 1;
    typeList[index].flag = num;
    typeList[index].total = typeList[index].total - typeList[index].price;
    
    that.setData({
      typeList: typeList,
    });
    that.getTotalPrice();
    wx.setStorage({
      key: 'typeList',
      data: { typeList: that.data.typeList, price: typeList[index].total},
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
account:function(e){
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
           that.setData({
             categoryList: res.data,
             name: res.data[0].category_name,
        });  
            that.setData({
              typeList: res.data[0].child
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