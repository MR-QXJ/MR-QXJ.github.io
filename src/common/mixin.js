//公共混入
export const mixGetCode = {
  data() {
    return {
      timeOut: null, //供元素内容显示的倒计时秒数
      storageName: 'getCodeEnd' //vue实例可重新定义storageName设置缓存key
    }
  },
  methods: {
    //可传入timeOut倒计时总秒数
    //传入success方法return的Promise实例异步resolve才开始计时,不返回Promise实例则直接开始计时
    async getCode(success, timeOut = 60) {
      if (this.timeOut) return

      await success()

      localStorage.setItem(this.storageName, parseInt(Date.now() / 1000) + timeOut)
      this.timeOut = timeOut
      this.myInterval()
    },
    myInterval() {
      let timer = setInterval(() => {
        if (this.timeOut <= 0) {
          clearInterval(timer)
          localStorage.removeItem(this.storageName)
          return (this.timeOut = null)
        }
        this.timeOut--
      }, 1000)
    }
  },
  computed: {
    getcodeText() {
      return this.timeOut ? `${this.timeOut}s重新获取` : '获取验证码'
    },
    getcodeColor() {
      return this.timeOut && '#333'
    }
  },
  created() {
    let getCodeEnd = localStorage.getItem(this.storageName) || ''
    if (!getCodeEnd) return

    const curTimeout = +getCodeEnd - parseInt(Date.now() / 1000)
    if (curTimeout <= 0) localStorage.removeItem(this.storageName)
    else {
      this.timeOut = curTimeout
      this.myInterval()
    }
  }
}

//需要组件内定义loadMore方法，页面滚动条触底会触发，每次触发需要增加page并判断hasMore是否为true
export const mixLoadMore = {
  data() {
    return {
      page: 0,
      hasMore: true,
      scrollPage: () => {
        const doc = document.documentElement
        const body = document.body
        const scrollH = doc.scrollHeight || body.scrollHeight
        const pageH = doc.clientHeight || body.clientHeight
        const scrollTop = doc.scrollTop || body.scrollTop
        if (pageH + scrollTop >= scrollH) {
          this.loadMore && this.loadMore()
        }
      }
    }
  },
  created() {
    //刷新页面时page初始化
    this.page = 0
  },
  beforeMount() {
    this.loadMore && this.loadMore() //created中可能在新建loadMore方法需要使用的参数
  },
  mounted() {
    window.addEventListener('scroll', this.scrollPage)
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollPage)
  }
}
