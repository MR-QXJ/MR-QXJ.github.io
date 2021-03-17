//让webpack创建以svg目录为上下文的require函数
const req = require.context('./svg', false, /\.svg$/)
//keys获取所有svg文件全部加载
req.keys().map(req)
