import sysConfig from './path.js'
export default {
  requestGet(url, params = {}) {
    var headerJson = {
      'content-type': 'application/x-www-form-urlencoded'
    }
    if (url.indexOf('goods') == -1 && url.indexOf('oauth') == -1 && url.indexOf('sku') == -1) {
      headerJson.Authorization = sysConfig.accessTokenPre + wx.getStorageSync('Authorization');
    }

    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        method: "GET",
        header: headerJson,
        data: params,
        success: (data) => {
          this.needLoginOrNot(data.statusCode);
          this.needLoginOrNot(data.data.state);
          resolve(data.data)
        },
        fail: (data) => {
          this.needLoginOrNot(data.statusCode);
          this.needLoginOrNot(data.data.state);
          reject(data.data)
        }
      })
    })
  },
  requestPost(url, params = {}) {
    var headerJson = {
      'content-type': 'application/x-www-form-urlencoded'
    }
    if (url.indexOf('goods') == -1 && url.indexOf('oauth') == -1 && url.indexOf('sku') == -1) {
      headerJson.Authorization = sysConfig.accessTokenPre + wx.getStorageSync('Authorization');
    }

    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        method: "POST",
        header: headerJson,
        data: params,
        success: (data) => {
          this.needLoginOrNot(data.statusCode);
          this.needLoginOrNot(data.data.state);
          resolve(data.data)
        },
        fail: (data) => {
          this.needLoginOrNot(data.statusCode);
          this.needLoginOrNot(data.data.state);
          reject(data.data)
        }
      })
    })
  },
  needLoginOrNot(code) {
    if (code === 401) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  }
}