function Apis() {
  var instance = axios.create({
    baseURL: global.baseUrl,
    timeout: 15000
  })
  var request = function(url, method, data) {
    let options = method === 'GET' ? { params: data } : { data }
    return instance
      .request({
        url,
        method,
        headers: {
          ...(global.token ? { Authorization: global.token } : {})
        },
        ...options
      })
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          return res.data
        }

        return Promise.reject(res)
      })
      .then(res => {
        if (res.code === 0) {
          return res
        }
        return Promise.reject(res)
      })
      .catch(err => {
        if (err.response) {
          return Promise.reject({
            code: err.response.status,
            message:
              err.response.statusText ||
              `请求出错了 ${__DEV__ ? `code:${err.response.status}` : ''}`
          })
        }

        if (err instanceof Error) {
          if (/Error: timeout/.test(err)) {
            // tip("网络连接超时~");
            return Promise.reject({ code: 1, message: '网络连接超时~' })
          }

          return Promise.reject({ code: 1, message: '网络错误~' })
        }
        return Promise.reject(err)
      })
  }

  return {
    login: function(data) {
      return request('/auth/verifyUserInfo', 'POST', data)
    }
  }
}
