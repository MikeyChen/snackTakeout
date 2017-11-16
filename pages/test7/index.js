// var order = ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
Page({
  data: {
    toView: '',
    scrollTop: 200,
    letter: ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  },
  click: function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    that.data.letter.forEach(function(val,key){
      if(index == val){
        that.setData({
          toView: index
        })
      }
    })
  }
})