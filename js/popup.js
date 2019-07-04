$(function() {
  $('.get-url').on('click', function() {
    // chrome.bookmarks.create({
    //   parentId: '1',
    //   title: '扩展程序文档',
    //   url: 'https://developer.chrome.com/extensions'
    // })
    //

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      $('.show-url').text(tabs[0].url)
    })
  })

  $('.set-data').on('click', function() {
    chrome.storage.sync.set({ token: 'token' }, function() {
      console.log('值保存好了')
    })
  })
  $('.get-data').on('click', function() {
    chrome.storage.sync.get('token', function(v) {
      console.log(v)
      $('.show-data').text(v.token)
    })
  })
})
