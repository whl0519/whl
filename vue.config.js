// vue-cli配置文件
module.exports = {
  devServer: { // 开发服务
    proxy: { // 请求/api地址，就相当于请求的target的url的值
      '/api': {
        target: 'http://140.143.128.100:3000',
        ws: true,
        changeOrigin: true,
        pathRewrite: { // 路径重写
          '^/api': '' // 匹配以/api路径的，路径重写地址是什么
        }
      }
    }
  }
}
