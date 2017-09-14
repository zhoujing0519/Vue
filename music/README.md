# music

> music player

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

# 遗留问题
# 迷你播放器点击暂停后，再次全屏播放器，进度按钮归为
# IOS播放器旋转动画无法暂停
ios不支持animation-play-state属性
# Android播放器全屏-迷你切换，动画卡顿（无动画）
# 首页轮播图，暂无无限轮播（有问题）
better-scroll库更新，配置变更
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
