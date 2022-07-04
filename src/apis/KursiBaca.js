import Api from '../apis/Api'

export default {
    tambahKursiBaca(form) {
        return Api.post('http://perpustakaan_itk.test/api/kursi-baca', form);
    },
    lihatKursiBaca() {
        return Api.get('http://perpustakaan_itk.test/api/kursi-baca');
    },
    editKursiBaca(id, form) {
        return Api.put('http://perpustakaan_itk.test/api/kursi-baca/' + id, form);
    }, 
    showKursiBaca(id) {
        return Api.get('http://perpustakaan_itk.test/api/kursi-baca/' + id);
    },
    hapusKursiBaca(id) {
        return Api.delete('http://perpustakaan_itk.test/api/kursi-baca/' + id);
    },
}