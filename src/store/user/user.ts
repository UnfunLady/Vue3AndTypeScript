import { defineStore } from "pinia";

interface userInfo {
    isLogin: boolean,
    userToken: string | number,
    userInfo: []
}
class userInit {
    userList: userInfo = {
        isLogin: false,
        userToken: localStorage.getItem('userToken') || '',
        userInfo: []
    }
}
export default defineStore("user", {
    state: () => {
        return {
            userInfo: new userInit()
        }
    },
    actions: {
        setToken(token: string) {
            this.userInfo.userList.userToken = token;
            // localStorage.setItem('userToken', token);
            this.userInfo.userList.isLogin = true;
        },
        // 设置用户信息
        setUserInfo(userInfo: []) {
            this.userInfo.userList.userInfo = userInfo;
            // localStorage.setItem('userLoginInfo', JSON.stringify(userInfo))
        },
        // 退出登录
        userOut() {
            this.userInfo.userList = {
                isLogin: false,
                userToken: '',
                userInfo: []
            }

        }

    },
    getters: {
        // 获取token
        getUserToken(state) {
            return state.userInfo.userList.userToken
        }
    },
    persist: {
        enabled: true,
    }
})