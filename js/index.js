var apis = Apis()
new Vue({
  el: '#main',
  data: {
    login: {
      username: '',
      password: ''
    },
    bookmark: {
      url: '',
      remark: ''
    },
    isAuth: false
  },
  mounted() {
    chrome.storage.sync.get('token', v => {
      global.token = v.token
      if (global.token) {
        this.isAuth = true
      }
    })
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      this.bookmark.url = tabs[0].url
    })
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(() => {
        apis
          .login(this.login)
          .then(res => {
            this.$refs[name].resetFields()
            chrome.storage.sync.set({ token: res.token }, () => {
              global.token = res.token
              this.$refs[name].resetFields()
              this.isAuth = true
            })
          })
          .catch(() => {
            this.$Message.error('登录失败')
          })
      })
    },
    logout() {
      chrome.storage.sync.remove('token', () => {
        global.token = null
        this.isAuth = false
      })
    },
    bookmarkSubmit(name) {
      apis
        .addBookmark(this.bookmark)
        .then(() => {
          this.$refs[name].resetFields()
        })
        .catch(() => {
          this.$Message.error('新增失败')
        })
    }
  }
})
