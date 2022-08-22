import type { FormInstance } from "element-plus";
import { ref } from 'vue'
export interface TestLoginFormInt {
    username: string,
    password: string
}
export class InitData {
    testLoginForm: TestLoginFormInt = {
        username: '',
        password: ''
    }
    testLoginRef = ref<FormInstance>()
}