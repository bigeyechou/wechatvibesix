//app.js
const request = require('app.js')
App({
  request: request,
  //网络
  getApiData: function(data, url, func) {
    // todo 上线前更改BASE_URL
      // 测试
      var BASE_URL = 'http://testapi.wujike.com.cn/';
      // 正式
      // var BASE_URL = 'https://api.wujike.com.cn/';
      //本地
    // var BASE_URL = 'http://api.wujike.com.cn/';
    wx.request({
      url: BASE_URL + url,
      data: data,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        func(res)
      },
      fail: function() {},
      complete: function(res) {
        wx.getNetworkType({
          success(res) {
            if (res.networkType == 'none') {
              wx.hideLoading()
              wx.showToast({
                title: '无网络',
                icon: 'none',
              })
            }
          }
        })
      }
    })
  },
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,

  }
})