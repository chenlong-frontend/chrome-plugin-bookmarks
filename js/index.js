new Vue({
  el: '#login',
  data: {
    formInline: {
      user: '',
      password: ''
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(() => {
        console.log(this.formInline)
      })
    }
  }
})
