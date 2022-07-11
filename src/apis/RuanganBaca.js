import {Api,url} from '../apis/Api'

export default {
    tambahRuanganBaca(form) {
        return Api.post(url +'/api/ruangan-baca', form);
    },
    lihatRuanganBaca() {
        return Api.get(url +'/api/ruangan-baca');
    },
    editRuanganBaca(id, form) {
        return Api.put(url +'/api/ruangan-baca/' + id, form);
    }, 
    showRuanganBaca(id) {
        return Api.get(url +'/api/ruangan-baca/' + id);
    },
    hapusRuanganBaca(id) {
        return Api.delete(url +'/api/ruangan-baca/' + id);
    },
}