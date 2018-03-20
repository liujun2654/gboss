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
    1). 后台
      更新user信息的后台路由
    2). 前台
      api:
          reqUpdateUser(user): 请求更新用户的接口
      redux
          action-types.js
          actions.js
          reducers.js
      组件
          boss-info.jsx
          genius-info.jsx
## 3. 搭建整体界面路由
    1). 相关路由组件的定义和注册
       boss.jsx
       genius.jsx
       msg.jsx
       user.jsx
       not-found.jsx
    2). 统一在dashboard.jsx中检查用户是否登陆

# day04
## 1. 搭建整体界面
    1). 抽取底部组件: nav-footer.jsx
    2). 在非路由组件中使用router相关API: withRoute()
    3). 选择使用{}还[]作为多个数据的容器

## 2. user组件
    1). 读取redux中的user显示相关信息
    2). 解决点击事件不响应问题

## 3. 用户列表组件
    1). 抽取组件: user-list.jsx
    2). 从后台异步获取指定类型的用户列表


# day05
## 1. 聊天的后台
    1). 绑定接收聊天消息的监听
    2). 保存聊天消息到数据库(创建集合chats)
    3). 向from/to对应的2个客户端发送消息
    4). 提供获取聊天列表(当前用户的)的接口
## 2. 聊天的前台
    1). 聊天组件: chat.jsx
    2). 从后台读取聊天记录列表显示
    3). 向后台发送消息
    4). 自动读取显示后台发送过来的消息


## day06
## 1. 聊天列表的显示

## 2. 未读数量显示



