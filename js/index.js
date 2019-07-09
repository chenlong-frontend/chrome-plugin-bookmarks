var apis = Apis()
new Vue({
  el: '#main',
  data: {
    login: {
      username: '',
      password: ''
    }
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
            })
          })
          .catch(() => {
            this.$Message.error('登录失败')
          })
      })
    }
  }
})
