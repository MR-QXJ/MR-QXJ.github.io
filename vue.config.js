const path = require('path')

//获取绝对路径
function resolve(dir) {
  return path.join(__dirname, dir)
}
const svgs = resolve('./src/assets/icons/svg')

module.exports = {
  devServer: {
    port: 8000,
    proxy: {
      '/api': {
        target: 'http://xxx',
        secure: true,
        changeOrigin: true, // needed for virtual hosted sites
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components',
        network: '@/network',
        common: '@/common',
        img: '@/assets/img'
      }
    }
  },
  chainWebpack(config) {
    //修改默认svg配置，排除icons目录
    config.module.rule('svg').exclude.add(svgs)

    //新增rule添加icons中的svg
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(svgs)
      .end()
      .use('svg-sprite-loader') //要安装此loader
      .loader('svg-sprite-loader')
      .options({ symbolId: 'icon-[name]' }) //之后加载svg图标的xlink:href就是#icon-文件名
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/服务器下路径' : '/',
  productionSourceMap: false //打包后是否生成map文件
}
