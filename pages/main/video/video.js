// pages/main/video/video.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      videoPath:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        videoPath: options.videoPath
      })
  },

  videoErrorCallback(e) {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
  }

})