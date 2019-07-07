var global = {
  token: null,
  domain: 'http://119.3.107.239:5000'
}

function post(url, data, success) {
  $.ajax({
    method: 'POST',
    url: global.domain + url,
    headers: {
      Authorization: global.token
    },
    data: data
  }).done(function(res) {
    if (res.code !== 0) return
    success && success(res)
  })
}
