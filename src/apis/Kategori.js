import Api from '../apis/Api'

export default {
    tambahKategori(form) {
        return Api.post('http://perpustakaan_itk.test/api/kategori', form);
    },
    lihatKategori() {
        return Api.get('http://perpustakaan_itk.test/api/kategori');
    },
    editKategori(id, form) {
        return Api.put('http://perpustakaan_itk.test/api/kategori/' + id, form);
    }, 
    showKategori(id) {
        return Api.get('http://perpustakaan_itk.test/api/kategori/' + id);
    },
    hapusKategori(id) {
        return Api.delete('http://perpustakaan_itk.test/api/kategori/' + id);
    },
}