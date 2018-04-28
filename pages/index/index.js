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
        if (res.data) {
          this.setData({
            movies: this.data.movies.concat(res.data),
            moviesLen: res.data.length,
            moviesNum: this.data.moviesNum + res.data.length,
          });
        }
      }.bind(this)
    });
  },

  navToSubject: function (e) {
    wx.navigateTo({
      url: `/pages/subject/subject?id=${e.currentTarget.dataset.id}`
    });
  },

  navToMark: function () {
    wx.navigateTo({
      url: '/pages/mark/mark'
    })
  },
});