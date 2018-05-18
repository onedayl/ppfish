Page({

  data: {
    windowHeight: 0,
    id: '',
    title: '',
    director: '',
    year: '',
    genre: '',
    runtime: '',
    summary: '',
    playSource: [],
    url: '',
    playSourceName: [
      '腾讯视频',
      '优酷视频',
      '爱奇艺视频',
      '芒果 TV',
      '搜狐视频',
      '乐视视频',
      'PP视频',
      '哔哩哔哩',
      '央视网'
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: function(res) {
        wx.request({
          url: `https://dbj.onedayl.com/movie/subject/${options.id}`,
          success: function (reply) {
            const data = reply.data.data;
            this.setData({
              windowHeight: res.windowHeight,
              title: data.title,
              director: data.director ? data.director : '',
              year: data.year,
              genre: data.genre,
              runtime: data.runtime ? data.runtime : '',
              cover: data.cover,
              rating: data.rating,
              summary: data.summary,
              playSource: data.play_source
            })
          }.bind(this)
        })
      }.bind(this)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})