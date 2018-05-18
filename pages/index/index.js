Page({
  data: {
    movies: [],
    moviesLen: 0,
    moviesNum:0,
    current: 1
  },

  onReady: function () {
    this.fetchMovies();
  },

  handleAnimationFinish: function (e) {
    this.setData({
      current: e.detail.current + 1
    });

    if (this.data.current == this.data.moviesNum - 3) {
      this.fetchMovies(this.data.moviesNum);
    }
  },

  fetchMovies: function (start) {
    const url = start
      ? `https://dbj.onedayl.com/movie/online?start=${start}`
      : 'https://dbj.onedayl.com/movie/online';
    wx.request({
      url: url,
      success: function (reply) {
        const res = reply.data;
        if (res.data.length) {
          this.setData({
            movies: this.data.movies.concat(res.data),
            moviesLen: res.data.length,
            moviesNum: this.data.moviesNum + res.data.length,
          });
        }
      }.bind(this)
    });
  },

  navToPage: function (e) {
    const page = e.currentTarget.dataset.page;
    if (page == 'search') {
      // 搜索页直接跳转
      wx.navigateTo({
        url: '/pages/search/search'
      });
    } else {
      // 非搜索页先获取用户授权
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            // 已授权，跳转到对应页面
            wx.navigateTo({
              url: `/pages/${page}/${page}`
            });
          } else {
            // 未授权，先跳转到授权页面
            wx.navigateTo({
              url: `/pages/auth/auth?page=${page}`
            });
          }
        }
      });
    }
  },

  navToSubject: function (e) {
    wx.navigateTo({
      url: `/pages/subject/subject?id=${e.currentTarget.dataset.id}`
    });
  }
});