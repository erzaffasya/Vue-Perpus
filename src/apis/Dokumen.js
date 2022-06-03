import Api from '../apis/Api'

export default {
    tambahDokumen(form) {
        return Api.post('http://127.0.0.1:8000/api/dokumen', form);
    },
    lihatDokumen() {
        return Api.get('http://127.0.0.1:8000/api/dokumen');
    },
    editDokumen(id, form) {
        return Api.put('http://127.0.0.1:8000/api/dokumen/' + id, form);
    }, 
    showDokumen(id) {
        return Api.get('http://127.0.0.1:8000/api/dokumen/' + id);
    },
    hapusDokumen(id) {
        return Api.delete('http://127.0.0.1:8000/api/dokumen/' + id);
    },
}