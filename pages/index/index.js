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
    if (app.globalData.token) {
      this.getGroupList()
    } else {
      app.loginCallback = res => {
        this.getGroupList()
      }
    }
    
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  getGroupList: function() {
    var that = this
    wx.request({
      url: 'https://group.mrourou.com/wx/group',
      header: {
        'content-type': 'application/json', // 默认值
        'wx-group-token': app.globalData.token
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
        console.log(res)
        var navUrl = '/pages/add/index?shareTicket=' + res.shareTickets[0]
        console.log(navUrl)
        wx.navigateTo({
          url: navUrl
        })
      },
      fail: function (res) {
        console.log(res)
        // 转发失败
      }
    }
  }
})
