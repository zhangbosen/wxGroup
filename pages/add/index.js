
Page({
  data: {
    src: ""
  },
  chooseImg: function(){
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'], 
      success: function (res) {
        that.setData({
          src: res.tempFilePaths
        })
      }
    })
  }
})