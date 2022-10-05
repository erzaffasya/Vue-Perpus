import { Api, url } from '../apis/Api'

export default {
    tambahPengunjung(form) {
        return Api.post(url + '/api/pengunjung', form, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });
    },
    lihatPengunjung() {
        return Api.get(url + '/api/pengunjung');
    },
    editPengunjung(id, form) {
        return Api.put(url + '/api/pengunjung/' + id, form);
    },
    showPengunjung(id) {
        return Api.get(url + '/api/pengunjung/' + id);
    },
    hapusPengunjung(id) {
        return Api.delete(url + '/api/pengunjung/' + id);
    },
    qrcodePengunjung() {
        return Api.get(url + '/api/QRCode');
    },
}