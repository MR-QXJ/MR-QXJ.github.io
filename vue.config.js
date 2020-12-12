module.exports = {  
  devServer: {	  
    port: 8000,    
    proxy: {      
      "/api": {        
        target: 'http://esc.api.uuudoo.com',
        secure: true, 
        changeOrigin: true,  // needed for virtual hosted sites
        pathRewrite: {
          '^/api': ''
        }
		  }    
    },
  },
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        'components': '@/components',
        'network': '@/network',
        'common': '@/common',
        'img': '@/assets/img' 
      }
    }
  }
};