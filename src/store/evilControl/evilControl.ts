import { defineStore } from "pinia";
interface evilData {
    // 疫情数据
    evilDataInfo: {
        evilData: []
    }
}

class evilDataInit {
    evilData: evilData = JSON.parse(localStorage.getItem('evilControl')) || []
}

export default defineStore("evilControl", {
    state: () => {
        return {
            evilDataInfo: new evilDataInit()
        }
    },
    actions: {
        savaEvilDataInfo(evilData: any) {
            this.evilDataInfo.evilData = evilData;
        },
        delEvilDataInfo() {
            this.evilDataInfo.evilData = []
        }
    },
    getters: {
        getEvilInfo(state) {
            return state.evilDataInfo.evilData || []
        }
    },
    persist: {
        enabled: true,
    }
})

