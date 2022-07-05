import Api from '../apis/Api'

export default {
    login(form) {
        return Api.post('http://perpustakaan_itk.test/api/login', form);
    },
    getUser() {
        return Api.get('http://perpustakaan_itk.test/api/profile');
    },
}