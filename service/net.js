import sysConfig from './path.js'
export default {
  requestGet(url, params={}){
    var headerJson = {'content-type': 'application/x-www-form-urlencoded'}
    if (url.indexOf('goods') == -1 &&  url.indexOf('oauth') == -1 && url.indexOf('sku') == -1){
      headerJson.Authorization = sysConfig.accessTokenPre + wx.getStorageSync('Authorization');
    }
    
    return new Promise((resolve, reject)=>{
      wx.request({
        url: url,
        method: "GET",
        header:  headerJson,
        data: params,
        success: (res)=>{
        //  wx.navigateTo({
        //    url: '/pages/login/login'
        //  });
        //  return;
          resolve(res.data)
        },
        fail: reject
      })
    })
  },
  requestPost(url, params={}){
    var headerJson = {'content-type': 'application/x-www-form-urlencoded'}
    if (url.indexOf('goods') == -1 &&  url.indexOf('oauth') == -1 && url.indexOf('sku') == -1){
      headerJson.Authorization = sysConfig.accessTokenPre + wx.getStorageSync('Authorization');
    }
    console.log(url,headerJson)
    return new Promise((resolve, reject)=>{
      wx.request({
        url: url,
        method: "POST",
        header: headerJson,
        data: params,
        success: (data)=>{
          resolve(data.data)
        },
        fail: reject
      })
    })
  },
}