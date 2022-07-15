import { Api, url } from "../apis/Api";

export default {
  tambahDokumen(form) {
    return Api.post(url + "/api/dokumen", form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  lihatDokumen() {
    return Api.get(url + "/api/dokumen");
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
};
