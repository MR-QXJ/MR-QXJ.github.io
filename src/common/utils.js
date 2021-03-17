//公共方法
export const utils = {
  //设置cookie,exday不设置时游览器关闭会自动清除
  setCookie(cname, cvalue, exday = 1) {
    var d = new Date()
    var expires = ''
    if (exday) {
      d.setTime(d.getTime() + exday * 24 * 60 * 60 * 1000)
      expires = 'expires=' + d.toUTCString()
    }
    document.cookie = cname + '=' + cvalue + '; ' + expires
  },
  //获取cookie
  getCookie(cname) {
    var name = cname + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i]
      while (c.charAt(0) == ' ') c = c.substring(1)
      if (c.indexOf(name) != -1) return c.substring(name.length, c.length)
    }
    return ''
  },
  //清除cookie
  clearCookie(name) {
    this.setCookie(name, '', -1)
  },
  targetByRule(rule, param) {
    switch (rule) {
      case '1':
        window.open(param)
        break
    }
  }
}