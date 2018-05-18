// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    disabled: false,
    movies: [],
    hint: ''
  },

  handleInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    });
  },

  handleConfirm: function () {
    wx.showLoading({
      title: '搜索中'
    })
    const q = this.data.inputValue.trim();
    if (q != '') {
      // 搜索过程中禁用输入框
      this.setData({
        disabled: true
      });

      const url = encodeURI(`https://dbj.onedayl.com/movie/search?q=${q}`);

      wx.request({
        url: url,
        success: function (reply) {
          const movies = reply.data;
          console.log(movies);
          if (movies.length !== 0) {
            this.setData({
              movies: movies
            });
          } else {
            this.setData({
              movies: [],
              hint: '(￣３￣) 啥都没搜到'
            });
          }
        }.bind(this),
        fail: function (reply) {
          this.setData({
            movies: [],
            hint: `(╯︵╰) 出错啦：${reply.statusCode}`
          });
        }.bind(this),
        // 搜索完成后重新启用搜索框并清空
        complete: function () {
          this.setData({
            disabled: false,
            inputValue: ''
          });
          
          wx.hideLoading();
        }.bind(this)
      });
    } else {
      this.setData({
        movies: [],
        hint: '╮(￣▽￣)╭ 求空得空'
      });
      wx.hideLoading();
    }
  },

  navToSubject: function (e) {
    wx.navigateTo({
      url: `/pages/subject/subject?id=${e.currentTarget.dataset.id}`
    });
  }
})