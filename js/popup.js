var token = null
$(function() {
  chrome.storage.sync.get('token', function(v) {
    token = v.token
    if (token) {
      $('.login').hide()
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

    // 向后台发起请求
    $.ajax({
      method: 'POST',
      url: 'http://119.3.107.239:5000/auth/verifyUserInfo',
      data: value
    }).done(function(res) {
      if (res.code !== 0) return
      chrome.storage.sync.set({ token: res.token }, function() {
        token = res.token
        // 请求结束切换显示
        $('.login').hide()
        $('.bookmark').show()
      })
    })
  })

  $('.logout').on('click', function() {
    chrome.storage.sync.remove('token', function() {
      $('.login').show()
      $('.bookmark').hide()
    })
  })
})
