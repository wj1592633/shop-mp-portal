// pages/profile/profile.js
import https from '../../service/net.js'
import sysConfig from '../../service/path.js'
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin:true,
    user:{},
    systemData:{
      windowHeight: '',
      screenHeight: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: res => {
          this.data.systemData.systemInfo = res
          this.data.systemData.windowHeight = res.windowHeight /(res.windowWidth /750)
          this.data.systemData.screenHeight = res.screenHeight /(res.screenWidth /750)
      }
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
    if (app.globalData.user){
      https.requestGet(sysConfig.userPath + '/user/amount').then((res)=>{
        console.log(res)
        if (res.state === 200){
          app.globalData.user.amount = res.data
        }
        
      })
      this.setData({
        user : app.globalData.user
      })
      this.setData({
        isLogin:true
      })
    }else {
      this.setData({
        isLogin:false
      })
    }

   
    
    
  },
  logout(){
    const _this = this;
    wx.showModal({
      title: '提示',
      content: '确定退出',
      success (res) {
        if (res.confirm) {
          app.globalData.user = null
          wx.removeStorage({
            key: sysConfig.accessTokenKey,
          })
          wx.removeStorage({
            key: sysConfig.refreshTokenKey,
          })
          _this.setData({
            user: null,
            isLogin:false
          })
          _this.onLoad()
        } else if (res.cancel) {
          
        }
      }
    })
  },
  toLogin(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
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