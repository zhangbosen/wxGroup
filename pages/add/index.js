const app = getApp()
Page({
  data: {
    src: "../../res/003.png",
    shareTicket: "",
    openGId:"",
    groupName:"",
    groupDesc:"",
    //模态窗旗帜
    showModalStatus: false,
    wxName: ""

  },
  onLoad: function (option) {
    var that = this
    wx.getShareInfo({
      shareTicket: option.shareTicket,
      success: function(res) {
        // console.log(res)
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
            // console.log(res)
            that.setData({
              openGId:res.data.data.openGId
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
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e);
    this.setData({
      groupName: e.detail.value.input,
      groupDesc: e.detail.value.textarea
    });

    var that = this;

    wx.request({
      url: 'https://group.mrourou.com/wx/group',
      header: {
        'content-type': 'application/json', // 默认值
        'wx-group-token': app.globalData.token
      },
      method: 'PUT',
      data: {
        groupImage: that.data.src,
        groupName: that.data.groupName,
        groupDesc: that.data.groupDesc,
        openGId: that.data.openGId
      },
      success: res => {
        //判断群主跟机器人是否为好友
        if(!res.isFriend){
          //让群主拉机器人进群
          wx.showModal({
            title: '提示',
            content: '输入您的微信号，加好友',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                //显示模态窗
                that.setData({
                  showModalStatus: true
                })

              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })

        }
      }
    })
  },

  //点击模态窗消失
  disappear: function(){
    this.setData({
      showModalStatus: false
    })
  },

  //点击模态窗的确定
  tapOk: function(){

    // 关闭模态窗
    this.setData({
      showModalStatus: false
    })
    
  },

  //模态窗确定按钮
  perSubmit: function(e) {
    console.log(e);
  }


})