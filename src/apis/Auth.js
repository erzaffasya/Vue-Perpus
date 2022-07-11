import {Api,url} from '../apis/Api'

export default {
    login(form) {
        return Api.post(url +'/api/login', form);
    },
    getUser() {
        return Api.get(url +'/api/profile');
    },
    logout() {
        return Api.get(url +'/api/logout');
    },
}