//index.js
import https from '../../service/net.js'
import sysConfig from '../../service/path.js'
const app = getApp()

Page({
  data: {
    pageData: {
      current: 1,
      size: 10
    },
    goodsList:[]
  },
  showInfo(event){
    app.globalData.currentGoods = event.currentTarget.dataset.goods
    wx.navigateTo({
      url: '/pages/goods-info/goods-info'
    })
  },
  
  
  
  //事件处理函数
  bindViewTap: function() {
   
  },
  getGoodsList(){
    var _this = this;
   https.requestGet(sysConfig.goodsPath + '/goods/list', _this.data.pageData).then(res=>{
     if (res.state === 200){
       if(res.data.records.length > 0){
        _this.setData({
          goodsList: _this.data.goodsList.concat(res.data.records)
         })   
       } else {
         if(this.data.pageData.current > 1){
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
  onLoad: function () {
  this.getGoodsList()
  },
  onReachBottom: function(){
    var newPage = JSON.parse(JSON.stringify(this.data.pageData))
    newPage.current = newPage.current + 1;
    //this.data.pageData.current + 1
    this.setData({
      pageData: newPage
    })
    this.getGoodsList();
  }

})
