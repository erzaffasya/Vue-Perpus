import Api from '../apis/Api'

export default {
    tambahRuanganBaca(form) {
        return Api.post('http://127.0.0.1:8000/api/ruangan-baca', form);
    },
    lihatRuanganBaca() {
        return Api.get('http://127.0.0.1:8000/api/ruangan-baca');
    },
    editRuanganBaca(id, form) {
        return Api.put('http://127.0.0.1:8000/api/ruangan-baca/' + id, form);
    }, 
    showRuanganBaca(id) {
        return Api.get('http://127.0.0.1:8000/api/ruangan-baca/' + id);
    },
    hapusRuanganBaca(id) {
        return Api.delete('http://127.0.0.1:8000/api/ruangan-baca/' + id);
    },
}