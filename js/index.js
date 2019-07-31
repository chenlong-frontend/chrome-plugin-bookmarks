var apis = Apis()
new Vue({
  el: '#main',
  data: {
    login: {
      username: '',
      password: ''
    },
    register: {
      username: '',
      password: ''
    },
    bookmark: {
      url: '',
      remark: '',
      title: ''
    },
    isAuth: false,
    isLogin: true
  },
  mounted() {
    chrome.storage.sync.get('token', v => {
      global.token = v.token
      if (global.token) {
        this.isAuth = true
      } else {
        this.getRecommend()
      }
    })
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      this.bookmark.url = tabs[0].url
      this.bookmark.title = tabs[0].title
    })
  },
  methods: {
    // 登录
    handleSubmit(name) {
      this.$Loading.start()
      this.$refs[name].validate(() => {
        apis
          .login(this.login)
          .then(res => {
            this.$refs[name].resetFields()
            chrome.storage.sync.set({ token: res.token }, () => {
              global.token = res.token
              this.$refs[name].resetFields()
              this.isAuth = true
              this.$Loading.finish()
            })
          })
          .catch(() => {
            this.$Message.error('登录失败')
            this.$Loading.error()
          })
      })
    },
    onRegister(name) {
      this.$refs[name].validate(() => {
        // apis
        //   .register(this.register)
        //   .then(() => {
        //     this.$refs[name].resetFields()
        //     this.$Message.success('注册成功')
        //   })
        //   .catch(() => {
        //     this.$Message.error('登录失败')
        //   })
      })
    },
    // 退出登录
    logout() {
      chrome.storage.sync.remove('token', () => {
        global.token = null
        this.isAuth = false
      })
    },
    // 提交书签
    bookmarkSubmit(name) {
      this.$Loading.start()
      apis
        .addBookmark(this.bookmark)
        .then(() => {
          this.$refs[name].resetFields()
          this.$Message.success('添加成功')
          this.$Loading.finish()
        })
        .catch(() => {
          this.$Message.error('新增失败')
          this.$Loading.error()
        })
    },
    // 打开background页
    openBackground() {
      window.open(chrome.extension.getURL('background.html'))
    },
    // 从浏览器中导入书签
    importFromBrowser() {
      chrome.bookmarks.getTree(marks => {
        var importedMarks = util.getDataByTree(marks, [])
        this.$Loading.start()
        apis
          .addBookmarks({ batchRecord: { records: importedMarks } })
          .then(v => {
            this.$Message.success('导入成功')
            this.$Loading.finish()
          })
          .catch(v => {
            this.$Message.error('导入失败')
            this.$Loading.error()
          })
      })
    },
    // 切换登录与注册
    toggleLogin(v) {
      this.isLogin = v
    },
    openUrl(url) {
      chrome.tabs.create({ url })
    },
    getRecommend() {
      this.$Loading.start()
      apis
        .getRecommendedResource()
        .then(v => {
          console.log(v)
          this.$Loading.finish()
        })
        .catch(v => {
          this.$Loading.error()
        })
    }
  }
})
