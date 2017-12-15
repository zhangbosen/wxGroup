//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    groupList: []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this
    wx.request({
      url: 'https://group.mrourou.com/wx/group',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({groupList:res.data.data.list})
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //自己定义的方法
  toDetail: function(){
    wx.navigateTo({
      url: "/pages/detail/index"
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: '各种各样的群',
      path: '/pages/add/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
