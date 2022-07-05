import Api from '../apis/Api'

export default {
    login(form) {
        return Api.post('http://perpustakaan_itk.test/api/login', form);
    },
}