//app.js
const config = require("/utils/util.js")
App({
    data: {

    },
    config: config,
    getToken: function () {
        wx.getLocation({
            type: 'wgs84',
            success(res) {
                console.log(res)
                const latitude = res.latitude
                const longitude = res.longitude
                wx.setStorageSync('location', res)
            }
        })
        // if (!wx.getStorageSync('token')) {
            wx.login({
                success: res => {
                    config.ajax('POST', {
                        code: res.code
                    }, 'user/login', (res) => {
                        //获取用户token
                        console.log(res.data)
                        wx.setStorageSync('token', res.data.token)
                        wx.setStorageSync('user_info', res.data.user_info)
                        wx.setStorageSync('inviterid', res.data.user_info.user_id)
                      if (!res.data.user_info.shop_id || res.data.user_info.shop_id==0) {
                            wx.navigateTo({
                                url: '/pages/index/selection/selection',
                                success: function (res) { },
                                fail: function (res) { },
                                complete: function (res) { },
                            })
                        }
                    },(err)=>{
                      console.log(err)
                    },(com)=>{
                      console.log(com)
                    })
                }
            })
        // }

    },
    onLaunch: function () {
        // 登录
        this.getToken()
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo
                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },
    globalData: {
        userInfo: null,
    }
})