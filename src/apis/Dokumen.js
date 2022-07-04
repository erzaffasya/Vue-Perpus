import Api from '../apis/Api'

export default {
    tambahDokumen(form) {
        return Api.post('http://perpustakaan_itk.test/api/dokumen', form);
    },
    lihatDokumen() {
        return Api.get('http://perpustakaan_itk.test/api/dokumen');
    },
    editDokumen(id, form) {
        return Api.put('http://perpustakaan_itk.test/api/dokumen/' + id, form);
    }, 
    showDokumen(id) {
        return Api.get('http://perpustakaan_itk.test/api/dokumen/' + id);
    },
    hapusDokumen(id) {
        return Api.delete('http://perpustakaan_itk.test/api/dokumen/' + id);
    },
}