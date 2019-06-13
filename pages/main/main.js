// pages/main/main.js
var app = getApp();
var util = require("../../utils/util.js");
Page({
  data: {
    // 页面配置  
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,
    //dialog显示隐藏
    isHideLoadMore: true,
    //活动页数
    activityPage: 0,
    // 首页课程
    bannerList: {},
    cityList: {},
    allWeek: [],
    day:0,
    weekState: '',
    shopList: {},
    courseListHeight:0,

    //首页老师
    teacherList: {},
    teacherVideoPath:'',

    //首页活动
    activityList: {},
  },

  onLoad: function() {

    var that = this

    // 获取系统信息

    wx.getSystemInfo({

      success: function(res) {

        that.setData({

          winWidth: res.windowWidth,

          winHeight: res.windowHeight,

          courseListHeight: res.windowHeight -300
        })

      }

    });
    this.getDate()
    this.getBannerData()
    this.getTeacherData()
    this.getActivityData()
    this.getShopData()
  },

  // 滑动切换tab

  bindChange: function(e) {

    var that = this;

    that.setData({
      currentTab: e.detail.current
    })
  },

  // 点击tab切换

  swichNav: function(e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {

      return false

    } else {

      that.setData({

        currentTab: e.target.dataset.current

      })

    }

  },


  /** 下拉刷新 */
  onPullDownRefresh: function() {
    wx.stopPullDownRefresh()
    var that = this
    if (this.data.currentTab != 1) {
      this.setData({
        isHideLoadMore: false,
        activityPage: 0
      })
    }
    wx.showLoading({
      title: '正在加载...',
    })
    switch (this.data.currentTab) {
      case 0:
        that.getBannerData()
        break;
      case 1:
        that.getTeacherData()
        break
      case 2:
        that.getActivityData()
        break;
    }
  },

  onReachBottom: function() {
    var that = this
    activityPage++
    if (currentTab = 2) {
      that.getActivityData()
    }
  },

  /** 请求banner数据 */
  getBannerData: function() {
    var params = ""
    var that = this
    app.getApiData(params, "v2-5-7/home/banner", function success(result) {
      that.setData({
        bannerList: result.data.obj
      })
      that.stopLoading()
    })
  },

  /**获取日历列表 */
  getDate: function() {
    var that = this
    this.setData({
      allWeek: util.allWeek(new Date(new Date().toLocaleDateString()))
    },function(){
      that.setData({
        day: that.data.allWeek[0].dates,
      },function(){
        that.getShopData()
      })

    })
  },
  /** 请求店铺数据 */
  getShopData: function() {
    var that = this
    var params = {
      city_id: 2,
      date: that.data.day,
      lng: 116.442124028309,
      lat: 39.92350900940819,
      user_id: 0,
      shop_id: 0,
    }

    app.getApiData(params, "v2-5-7/course/shop-list", function success(result) {
      that.setData({
        shopList: result.data.obj.list
      })
      that.stopLoading()
    })
  },

  /** 请求教师列表数据 */
  getTeacherData: function() {
    var params = ""
    var that = this
    app.getApiData(params, "v5/recommend/teacher-list", function success(result) {
      that.setData({
        teacherList: result.data.obj
      })
      that.stopLoading()
    })
  },

  /** 请求活动列表数据 */
  getActivityData: function() {
    var params = {
      page: 0
    }
    var that = this
    app.getApiData(params, "v5/recommend/activity-list", function success(result) {
      that.setData({
        activityList: result.data.obj.list
      })
      that.stopLoading()
    })
  },

  /** 停止加载 */
  stopLoading: function() {
    var that = this;
    setTimeout(function() {
      that.setData({
        isHideLoadMore: true
      })
      wx.hideLoading()
    }, 1500)
  },

  //选择用途后加样式
  selectDate: function(e) {
    var that = this
    this.setData({
      weekState: e.currentTarget.dataset.key,
      day: e.currentTarget.dataset.day, 
    },function(){
      that.getShopData()
    })
   
  },


  //跳转老师视频
  onClickVideo: function (e) {
    var that = this
    this.setData({
      teacherVideoPath: e.currentTarget.dataset.videopath,
    })
    console.log(that.data.teacherVideoPath)
    wx.navigateTo({
      url: "../../pages/main/video/video?videoPath=" + that.data.teacherVideoPath,
    })
  },
})