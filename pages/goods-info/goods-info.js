import https from '../../service/net.js'
import sysConfig from '../../service/path.js'
var app = getApp();
Page({
  data: {
    skus:[],
    currentGoods:{},
    selectColor:'#CCCCCC',
    currentSkuIndex:0,
    currentSku:{},
    isLoading:false
  },
  onSubmit(){
    var _this = this;
    var orderData = JSON.parse(JSON.stringify(this.data.currentSku))
    orderData.name = this.data.currentGoods.name;
    orderData.userId = this.data.currentGoods.userId;
    orderData.goodsPricePer = this.data.currentSku.price;
    _this.setData({isLoading:true})
    https.requestPost(sysConfig.orderPath + '/order/add', orderData).then(res => {
      console.log('resssss',res)
      if (res.state === 200){
        wx.showToast({
          title: res.data,
          icon: 'success',
          duration: 2000
        }) 
      }else {
        wx.showToast({
          title: res.fail,
          icon: 'none',
          duration: 2000
        }) 
      }
      _this.setData({isLoading:false})
    }).catch(err => {
      console.log('errrrrrrrrrrrrrrrr',err)
    })
  },
  onPullDownRefresh:function(){
    this.onLoad();
  },
  selectSku(options){
    this.setData({
      currentSkuIndex: options.currentTarget.dataset.index,
      currentSku: options.currentTarget.dataset.sku,
    });
  },
  onLoad: function(event){
    var _this = this;
    var appCurrentGoods = app.globalData.currentGoods
    https.requestGet(sysConfig.goodsPath + '/sku/' + appCurrentGoods.goodsId).then(res => {
      if (res.state === 200){
        _this.setData({
          skus: res.data,
          currentSkuIndex: 0, 
          currentGoods: appCurrentGoods,
          currentSku: res.data[0]
        })
      }
    })
   
  }
  
})