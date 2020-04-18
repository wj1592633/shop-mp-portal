export default {
  requestGet(url, params={}){
    return new Promise((resolve, reject)=>{
      wx.request({
        url: url,
        method: "GET",
        data: params,
        header:{},
        success: (res)=>{
        //  wx.navigateTo({
        //    url: '/pages/login/login'
        //  });
        //  return;
          resolve(res)
        },
        fail: reject
      })
    })
  },
  requestPost(url, params={}){
    return new Promise((resolve, reject)=>{
      wx.request({
        url: url,
        method: "POST",
        data: params,
        success: resolve,
        fail: reject
      })
    })
  },
}