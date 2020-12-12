# vue-template

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### src目录结构
``` 
│  App.vue
│  main.js
│
├─assets
│  ├─css         //公共css
│  │      base.css
│  │      normalize.css
│  └─img  
|
├─common      //公共js
│      const.js
│      mixin.js
│      utils.js
|
├─components  //公共组件
│  ├─common   //可复用
│  └─content  //仅此项目复用
|
├─network     //网络请求
│      home.js   //一个页面的请求(首页)
│      request.js 
│
├─router
│      index.js
│
├─store
│  │  actions.js
│  │  getters.js
│  │  index.js
│  │  mutations.js
│  │
│  └─modules
|
└─views
        Home.vue  //页面级组件
```