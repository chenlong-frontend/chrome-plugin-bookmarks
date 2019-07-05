$(function() {
  var url = ''
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    url = tabs[0].url
    $('.bookmark-url span').text(url)
  })

  $('.bookmark-submit').on('click', function(event) {
    event.preventDefault()

    var valueArr = $('.bookmark-form').serializeArray()
    var value = {}
    valueArr.forEach(item => {
      value[item.name] = item.value
    })
    value.url = url

    // 向后台发起请求
    $.ajax({
      method: 'POST',
      url: 'http://119.3.107.239:5000/opt/save',
      headers: {
        Authorization: token,
        Accept: 'application/json',
        'Access-Control-Allow-Credentials': '*'
      },
      data: value
    }).done(function() {
      console.log('值存好了')
    })
  })
})
