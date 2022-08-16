import useUserStore from './user/user';
import useEvilStore from './evilControl/evilControl'
export default function useStore() {
    return {
        user: useUserStore(),
        evilInfo: useEvilStore()
    }
}
