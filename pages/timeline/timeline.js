// pages/timeline/timeline.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listHeight: 0,
    userToken: 0,
    //关注头像
    userList: {},
    //关注的动态
    timelineList: {},
    videoId: 0,
    videoSrc: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this

    wx.getSystemInfo({

      success: function(res) {

        that.setData({
          listHeight: res.windowHeight - 100
        })

      }

    });

    that.getUserData()
    that.getUserToken()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  /**
   * 视频错误
   */
  videoErrorCallback(e) {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
  },
  /**
   * 播放视频
   */
  startPlay: function(e) {
    var that = this;
    this.setData({
      videoId: e.currentTarget.dataset.id,
      videoSrc: e.currentTarget.dataset.src,
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  getUserData: function() {
    var params = {
      user_id: 587
    }
    var that = this
    app.getApiData(params, "v2/user/attention-list", function success(result) {
      that.setData({
        userList: result.data.obj
      })
    })
  },

  getTimelineData: function() {
    var that = this
    var params = {
      user_id: 587,
      page: 0,
      access_token: that.data.userToken,
    }
    app.getApiData(params, "v5/user/friend-dynamics", function success(result) {
      that.setData({
        timelineList: result.data.obj
      })
    })
  },

  getUserToken: function() {
    var that = this
    var params = {
      user_id: 587
    }
    app.getApiData(params, "v5/user/mt", function success(result) {
      that.setData({
        userToken: result.data.obj
      }, function() {
        that.getTimelineData()
      })
    })
  },


})