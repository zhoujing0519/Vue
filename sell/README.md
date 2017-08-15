# sell

> sell app

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Q&A
``` bash
#小球抛物线动画
Q: tansition标签貌似只会对最外层的DOM做过渡动画，子元素无效
A: 修改为改变外层DOM的left&&bottom值，做动画

#购物车列表弹出动画
Q: 因为购物车列表默认需要transform: translate3d(0, -100%, 0);
A: 在./static/css/reset.css中的样式无法覆盖购物车列表的transform属性，需要加!important

#商品详情从右往左移入
Q: transition标签加在food组件外层时，过渡动画无法生效
A: 需要将transition标签加在food组件内部的最外层
```
