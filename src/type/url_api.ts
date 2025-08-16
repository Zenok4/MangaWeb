import { auth_enpoint } from "./endpoints";

export const auth = {
    login: auth_enpoint + '/login',
    register: auth_enpoint + '/register',
    logout: auth_enpoint + '/logout',
    user: (id: string) => `${auth_enpoint}/user/${id}`,
    me: auth_enpoint + '/me',
}