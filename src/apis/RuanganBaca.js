import Api from '../apis/Api'

export default {
    tambahRuanganBaca(form) {
        return Api.post('http://perpustakaan_itk.test/api/ruangan-baca', form);
    },
    lihatRuanganBaca() {
        return Api.get('http://perpustakaan_itk.test/api/ruangan-baca');
    },
    editRuanganBaca(id, form) {
        return Api.put('http://perpustakaan_itk.test/api/ruangan-baca/' + id, form);
    }, 
    showRuanganBaca(id) {
        return Api.get('http://perpustakaan_itk.test/api/ruangan-baca/' + id);
    },
    hapusRuanganBaca(id) {
        return Api.delete('http://perpustakaan_itk.test/api/ruangan-baca/' + id);
    },
}