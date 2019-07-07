$(function() {
  chrome.storage.sync.get('token', function(v) {
    global.token = v.token
    if (global.token) {
      $('.login').hide()
      $('.user').show()
      $('.empty').hide()
      $('.bookmark').show()
    }
  })

  $('.login-submit').on('click', function(event) {
    event.preventDefault()
    var valueArr = $('.login-form').serializeArray()
    var value = {}
    valueArr.forEach(item => {
      value[item.name] = item.value
    })

    post('/auth/verifyUserInfo', value, function(res) {
      chrome.storage.sync.set({ token: res.token }, function() {
        global.token = res.token
        // 请求结束切换显示
        $('.login').hide()
        $('.user').show()
        $('.empty').hide()
        $('.bookmark').show()
      })
    })
  })

  $('.logout').on('click', function() {
    chrome.storage.sync.remove('token', function() {
      $('.login').show()
      $('.user').hide()
      $('.empty').show()
      $('.bookmark').hide()
    })
  })
})
