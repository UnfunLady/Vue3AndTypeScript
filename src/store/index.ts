import useUserStore from './user/user';
export default function useStore() {
    return {
        user: useUserStore()
    }
}
