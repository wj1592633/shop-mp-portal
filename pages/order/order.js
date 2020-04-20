// pages/order/order.js
import https from '../../service/net.js'
import sysConfig from '../../service/path.js'
const app = getApp()
Page({
  data: {
    isPaying: false,
    pageData: {
      current: 1,
      size: 10
    },
    orders: []
  },
  
  getOrdersList() {
    var _this = this;
    https.requestGet(sysConfig.orderPath + '/order/records', _this.data.pageData).then(res => {
      if (res.state === 200) {
        if (res.data.records.length > 0) {
          _this.setData({
            orders: _this.data.orders.concat(res.data.records)
          })
        } else {
          if (this.data.pageData.current > 1) {
            var newPage = JSON.parse(JSON.stringify(this.data.pageData))
            newPage.current = newPage.current - 1;
            this.setData({
              pageData: newPage
            })
          }
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrdersList();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var newPage = JSON.parse(JSON.stringify(this.data.pageData))
    newPage.current = 1;
    this.setData({
      orders: [],
      pageData: newPage
    })
    this.getOrdersList();
  },
  // payOrder(event) {
  //   console.log('event', event)
  // },
  payOrder(event) {
    const _this = this;
    console.log(event.currentTarget.dataset)
    wx.showModal({
      cancelColor: '#cccccc',
      title: '确定付款',
      
      success(res) {
        if (res.confirm) {
          _this.setData({
            isPaying: true
          })
          var arg1 = {'userId': event.currentTarget.dataset.userid, 'orderId': event.currentTarget.dataset.orderid}
          https.requestGet(sysConfig.userPath + '/user/pay', arg1).then(res => {
            if (res.state === 200) {
              wx.showToast({
                title: res.data,
                icon: 'success',
                duration: 2000
              }) 
            } else {
              wx.showToast({
                title: res.fail,
                icon: 'none',
                duration: 2000
              }) 
            }
            _this.setData({
              isPaying: false
            })
            _this.onLoad()
          }).catch(err => {
            _this.setData({
              isPaying: false
            })
          })

        }
      }
    })

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var newPage = JSON.parse(JSON.stringify(this.data.pageData))
    newPage.current = newPage.current + 1;
    this.data.pageData.current + 1
    this.setData({
      pageData: newPage
    })
    this.getOrdersList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})