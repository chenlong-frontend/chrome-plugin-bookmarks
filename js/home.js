var apis = Apis()
var mainVue = new Vue({
  el: '#main',
  data: {
    isAuth: false,
    columns: [
      {
        title: '地址',
        key: 'url',
        render: (h, params) => {
          var url = params.row.url
          return h(
            'a',
            {
              domProps: {
                href: url,
                target: '_blank'
              }
            },
            url
          )
        }
      },
      {
        title: '备注',
        key: 'remark'
      }
    ],
    bookmarks: []
  },
  mounted() {
    chrome.storage.sync.get('token', v => {
      global.token = v.token
      if (global.token) {
        this.isAuth = true
        apis.getBookmarks().then(v => {
          this.bookmarks = v.data
        })
      }
    })
  },
  methods: {}
})
