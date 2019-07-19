var global = {
  baseUrl: 'http://119.3.107.239:5000',
  token: null
}

var util = {
  getDataByTree(data, arr) {
    if (data.length === 0) return arr
    var items = data.pop()
    var { url, title, children } = items

    if (url) arr.push({ url, title, remark: '导入', type: 1 })
    if (children) data = [...data, ...children]

    return this.getDataByTree(data, arr)
  }
}
