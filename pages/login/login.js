// pages/login/login.js
import https from '../../service/net.js'
import sysConfig from '../../service/path.js'
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    usernameMsg: "",
    passwordMsg: "",
    isLogin: false
  },
  formSubmit: function (e) {
    this.setData({
      passwordMsg: "",
      usernameMsg: ""
    })
    const username = e.detail.value.username;
    const password = e.detail.value.password;
    const user = {
      'username': username,
      'password': password
    }
    if (!username) {
      this.setData({
        usernameMsg: "账号不能为空"
      })
    } else if (!password) {
      this.setData({
        passwordMsg: "密码不能为空"
      })
    } else {
      this.setData({
        isLogin: true
      })
      https.requestPost(sysConfig.userPath + '/oauth/login', user).then((res) => {
        if (res.state === 200) {
          wx.setStorage({
            data: res.data.jwtToken,
            key: sysConfig.accessTokenKey,
          })
          wx.setStorage({
            data: res.data.refreshToken,
            key: sysConfig.refreshTokenKey,
          })
          res.data.jwtToken = ''
          res.data.refreshToken = ''
          res.data.tokenKey = ''
          app.globalData.user = res.data
          wx.switchTab({
            url: '/pages/index/index',
          })
          this.setData({
            isLogin: false
          })
        } else {
          wx.showToast({
            title: res.fail,
            icon: 'none',
            duration: 2000
          })
          this.setData({
            isLogin: false
          })
        }
      }).catch((err) => {
        this.setData({
          isLogin: false
        })
      })
    }

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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