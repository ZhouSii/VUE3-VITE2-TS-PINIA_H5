```

`api` : 项目中接口做统一管理，按照模块来划分

在 `api` 文件下新增 `login` 文件夹,用于存放登录模块的请求接口,login 文件夹下分别新增 `login.ts` `types.ts` :

`login.ts`:

```js
import http from '@/service/http'
import * as T from './types'

const loginApi: T.ILoginApi = {
    login(params){
        return http.post('/login', params)
    }

}
export default loginApi
```
`types.ts`:

```ts
export interface ILoginParams {
    userName: string
    passWord: string | number
}
export interface ILoginApi {
    login: (params: ILoginParams)=> Promise<any>
}
```