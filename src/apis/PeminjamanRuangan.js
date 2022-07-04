import Api from '../apis/Api'

export default {
    tambahRuanganBaca(form) {
        return Api.post('http://perpustakaan_itk.test/api/peminjaman-ruangan', form);
    },
    lihatRuanganBaca() {
        return Api.get('http://perpustakaan_itk.test/api/peminjaman-ruangan');
    },
    editRuanganBaca(id, form) {
        return Api.put('http://perpustakaan_itk.test/api/peminjaman-ruangan/' + id, form);
    }, 
    showRuanganBaca(id) {
        return Api.get('http://perpustakaan_itk.test/api/peminjaman-ruangan/' + id);
    },
    hapusRuanganBaca(id) {
        return Api.delete('http://perpustakaan_itk.test/api/peminjaman-ruangan/' + id);
    },
    cekRuangan(ruang, tanggal) {
        return Api.get('http://perpustakaan_itk.test/api/ruang-kosong/' + ruang + '/waktu/' + tanggal);
    },
}