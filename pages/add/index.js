const app = getApp()
Page({
  data: {
    src: "../../res/003.png",
    shareTicket: ""
  },
  onLoad: function (option) {
    var that = this
    wx.getShareInfo({
      shareTicket: option.shareTicket,
      success: function(res) {
        console.log(res)
        wx.request({
          url: 'https://group.mrourou.com/wx/decrypt/data',
          header: {
            'content-type': 'application/json', // 默认值
            'wx-group-token': app.globalData.token
          },
          method: 'POST',
          data: {
            encryptedData: res.encryptedData,
            iv: res.iv
          },
          success: res => {
            console.log(res)
            that.setData({
              shareTicket:res.data.data.openGId
            })
          }
        })
      }
    })
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