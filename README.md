# day01
## 1. 项目开发准备
    1). 项目描述: 整体业务功能/功能模块/主体的技术/开发模式
    2). 技术选型: 数据展现/用户交互/组件化, 后端, 前后台交互, 模块化, 项目构建/工程化, 其它
    3). API接口: 接口的4个组成部分, 接口文档, 对/调/测接口

## 2. git管理项目的常用操作
    1). 创建本地仓库
        创建.gitignore配置文件
        git init
        git add *
        git commit -m "xxx"
    2). 创建github远程仓库
        New Repository
        指定名称
        创建
    3). 将本地仓库推送到远程仓库
        git remote add origin https://github.com/zxfjd3g/170612_JSAdvance.git 关联远程仓库
        git push origin master
    
    4). push本地的更新 
        git add *
        git commit -m "xxx"
        git push origin master
    
    5). pull远程的更新
            git pull origin master
            
    6). 克隆github上的项目:
        git clone https://github.com/zxfjd3g/170612_JSAdvance.git
            
    7). 撤消本地修改
        git status  查看变化
        git checkout -- xxx文件  撤消指定文件的修改

## 2. 搭建项目
    1). 使用create-react-app脚手架创建模板项目(工程化)
    2). 引入antd-mobile, 并实现按需打包和自定义主题
    3). 引入react-router-dom(v4): 
        BrowserRouter/Route/Switch
        history: push()/replace()
    4). 引入redux
        redux/react-redux/redux-thunk
        redux: createStore()/combineReducers()/applyMiddleware()
        react-redux: <Provider store={store}> / connect()(Xxx)
        4个重要模块: reducers/store/action-types/actions

## 3. 登陆/注册界面
    1). 创建3个1级路由: dashboard/login/register
    2). 完成登陆/注册的静态组件
        antd组件: NavBar/WingBlank/WhiteSpace/List/InputItem/Radio/RadioItem/Button
        路由跳转: this.props.history.replace('/login')

## 4. 实现简单后台
    1). 使用express搭建简单的服务器端
    2). 使用mongoose操作mongodb数据库

# day02
## 1. 登陆/注册后台实现
    1). models.js
        连接数据库: mongoose.connect(url)
        定义集合结构: schema
        定义操作集合的model: UserModel
    2). appRouter.js
        注册: 流程
        登陆: 流程
        响应数据结构{code: 0, data: user}, {code: 1, msg: 'xxx'}
    3). server.js
        解析请求体/解析cookie
        注册路由器

## 2. 登陆/注册前台实现
    1). ajax
        ajax请求函数
        后台接口请求函数
    2). redux
        store.js
          生成并暴露一个store管理对象
        reducers.js
          包含n个reducer函数
          根据老state和指定action来产生返回一个新的state
        actions.js
          包含n个action creator函数
          同步action: 返回一个action对象({type: 'XXX', data: xxx})
          异步action: 返回一个函数: disptach => {执行异步代理, 结束时dispatch一个同步action}
        action-types.js
          action的type名称常量
    3). 组件
        UI组件: 
            组件内部没有使用任何redux相关的API
            通过props接收容器组件传入的从redux获取数据
             数据类型: 一般和函数
        容器组件
            connect(
              state => ({user: state.user}),
              {action1, action2}
            )(UI组件)

## 3. 前后台应用结构图


# day03
## 1. 使用async/await实现ajax异步编码
    1). 使用
      使用await: 通过调用返回promise的函数获取异步的结果, 函数调用的左侧
      使用async: 使用了await的函数定义左侧
    2). 作用:
      同步编码方式实现程序的异步执行
      依赖于promise/简化promise编码
## 2. 实现user信息完善功能

## 3. 搭建整体界面