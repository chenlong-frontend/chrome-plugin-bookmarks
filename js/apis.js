function Apis() {
  var instance = axios.create({
    baseURL: global.baseUrl,
    timeout: 15000
  })
  var defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': '*'
  }
  var request = function(url, method, data) {
    let options = method === 'GET' ? { params: data } : { data }
    return instance
      .request({
        url,
        method,
        headers: {
          ...defaultHeaders,
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
          if (err.response.status === 403) mainVue.$Message.error('请重新登录')
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
    // 登录
    login: function(data) {
      return request('/auth/verifyUserInfo', 'POST', data)
    },
    // 添加书签
    addBookmark: function(data) {
      return request('/opt/save', 'POST', data)
    },
    // 批量添加书签
    addBookmarks: function(data) {
      return request('/opt/batch', 'POST', data)
    },
    // 获取书签
    getBookmarks: function(data) {
      return request('/opt/search', 'POST', data)
    },
    // 删除书签
    deleteBookmark: function(data) {
      return request('/opt/delete', 'POST', data)
    }
  }
}
