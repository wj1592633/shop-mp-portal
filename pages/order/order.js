// pages/order/order.js
Page({
  data: {
    isPaying: false,
    orders: [{
        tag: "正品",
        price: "10.00",
        desc: "商品1",
        title: "商品1标题"
      },
      {
        tag: "正品",
        price: "110.00",
        desc: "商品2",
        title: "商品2标题"
      },
      {
        tag: "正品",
        price: "1.00",
        desc: "商品3",
        title: "商品3标题"
      },
      {
        tag: "正品",
        price: "1.00",
        desc: "商品3",
        title: "商品3标题"
      }
    ]
  },
  payOrder(event){
    console.log('event',event)
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
    console.log('onPullDownRefresh')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('onReachBottom')
    var newArr = [{
        tag: "正品",
        price: Math.random() * 10,
        desc: "商品3",
        title: "商品3标题"
      },
      {
        tag: "正品",
        price: Math.random() * 10,
        desc: "商品3",
        title: "商品3标题"
      }
    ]
   
    this.setData({
      orders:  this.data.orders.concat(newArr)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})