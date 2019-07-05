var global = {
  token: null
}

function post(url, data, success) {
  $.ajax({
    method: 'POST',
    url: url,
    data: data
  }).done(function(res) {
    success && success(res)
  })
}
