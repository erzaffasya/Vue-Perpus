import { Api, url } from "../apis/Api";

export default {
  tambahDokumen(form) {
    return Api.post(url + "/api/dokumen", form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  lihatDokumen(form) {
    if(form != null){
      return Api.get(url + "/api/dokumen?status="+form);
    }else{
      return Api.get(url + "/api/dokumen");
    }
  },
  editDokumen(id, form) {
    return Api.put(url + "/api/dokumen/" + id, form);
  },
  showDokumen(id) {
    return Api.get(url + "/api/dokumen/" + id);
  },
  hapusDokumen(id) {
    return Api.delete(url + "/api/dokumen/" + id);
  },
  bacaDokumen(state) {
    // console.log(state.jenisFile, 'dokumen');
    console.log(url + "/api/showDokumen/" + state.id + "/" + state.jenisFile);
    return Api.get(url + "/api/showDokumen/" + state.id + "/" + state.jenisFile);
  },
  revisiDokumen(id, form) {
    return Api.put(url + "/api/revisi-dokumen/" + id, form);
  },
  riwayatPeminjamanDokumen(id) {
    return Api.get(url + "/api/dokumen/riwayat-peminjaman/" + id);
  },
  downloadDokumen(id, detail) {
    return Api.get(url + "/api/download-dokumen/" + id + '/' + detail,{responseType: 'blob'});
  },
};
