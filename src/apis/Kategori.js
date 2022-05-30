import Api from '../apis/Api'

export default {
    tambahKategori(form) {
        return Api.post('http://127.0.0.1:8000/api/kategori', form);
    },
    lihatKategori() {
        return Api.get('http://127.0.0.1:8000/api/kategori');
    },
    editKategori(id, form) {
        return Api.put('http://127.0.0.1:8000/api/kategori/' + id, form);
    }, 
    showKategori(id) {
        return Api.get('http://127.0.0.1:8000/api/kategori/' + id);
    },
    hapusKategori(id) {
        return Api.delete('http://127.0.0.1:8000/api/kategori/' + id);
    },
}