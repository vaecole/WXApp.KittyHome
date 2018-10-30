// miniprogram/pages/publish/publish.js
const app = getApp()
Page({
  
  /**
   * Page initial data
   */
  data: {
    title:"",
    description:"",
    age:"",
    publisherName:"",
    publisherMobile:"",
    publisherIDCardNo:"",
    submitEnabled:true,
    addResultId:""
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  bindKeyInput1: function (e) {
    this.setData({
      title: e.detail.value
    })
  },
  bindKeyInput2: function (e) {
    this.setData({
      description: e.detail.value
    })
  },
  bindKeyInput3: function (e) {
    this.setData({
      age: e.detail.value
    })
  },
  bindKeyInput4: function (e) {
    this.setData({
      publisherName: e.detail.value
    })
  },
  bindKeyInput5: function (e) {
    this.setData({
      publisherMobile: e.detail.value
    })
  },
  bindKeyInput6: function (e) {
    this.setData({
      publisherIDCardNo: e.detail.value
    })
  },

  onSubmit: function(){
    if(!this.data.title)
    {
      wx.showToast({
        icon:'none',
        title: '请填写领养标题',
      })
      return;
    }

    if (!this.data.age)
    {
      wx.showToast({
        icon: 'none',
        title: '请填写宠物年龄，几年几个月',
      })
      return;
    }

    if (!this.data.publisherName)
    {
      wx.showToast({
        icon: 'none',
        title: '请填写发布者姓名',
      })
      return;
    }

    if (!this.data.publisherMobile)
    {
      wx.showToast({
        icon: 'none',
        title: '请填写电话',
      })
      return;
    }

    if (!this.data.publisherIDCardNo)
    {
      wx.showToast({
        icon: 'none',
        title: '请填写身份证号',
      })
      return;
    }

    this.setData({
      submitEnabled:false
    })

    wx.showToast({
      title: '提交成功',
    })

    setTimeout(function () {
      wx.redirectTo({
        url: '../myCat/myCat',
      })
    }, 2000)

    const db = wx.cloud.database()
    db.collection('kittyRecords').add({
      data: this.data,
      success: res => {
        this.setData({
          counterId: res._id,
        })
        wx.showToast({
          title: '新增记录成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },

})