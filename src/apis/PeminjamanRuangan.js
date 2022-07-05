import Api from '../apis/Api'

export default {
    tambahPeminjamanRuangan(form) {
        return Api.post('http://perpustakaan_itk.test/api/peminjaman-ruangan', form);
    },
    lihatPeminjamanRuangan() {
        return Api.get('http://perpustakaan_itk.test/api/peminjaman-ruangan');
    },
    editPeminjamanRuangan(id, form) {
        return Api.put('http://perpustakaan_itk.test/api/peminjaman-ruangan/' + id, form);
    }, 
    showPeminjamanRuangan(id) {
        return Api.get('http://perpustakaan_itk.test/api/peminjaman-ruangan/' + id);
    },
    hapusPeminjamanRuangan(id) {
        return Api.delete('http://perpustakaan_itk.test/api/peminjaman-ruangan/' + id);
    },
    cekRuangan(ruang, tanggal) {
        return Api.get('http://perpustakaan_itk.test/api/ruang-kosong/' + ruang + '/waktu/' + tanggal);
    },
}