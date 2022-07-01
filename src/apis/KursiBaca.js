import Api from '../apis/Api'

export default {
    tambahKursiBaca(form) {
        return Api.post('http://127.0.0.1:8000/api/kursi-baca', form);
    },
    lihatKursiBaca() {
        return Api.get('http://127.0.0.1:8000/api/kursi-baca');
    },
    editKursiBaca(id, form) {
        return Api.put('http://127.0.0.1:8000/api/kursi-baca/' + id, form);
    }, 
    showKursiBaca(id) {
        return Api.get('http://127.0.0.1:8000/api/kursi-baca/' + id);
    },
    hapusKursiBaca(id) {
        return Api.delete('http://127.0.0.1:8000/api/kursi-baca/' + id);
    },
}