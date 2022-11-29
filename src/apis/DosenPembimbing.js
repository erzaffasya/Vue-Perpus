import { Api, url } from "../apis/Api";

export default {
  getByDokumenId(id) {
    return Api.get(url + "/api/pembimbing/"+id+"/dokumen");
  },
  hapusDosenPembimbing(id) {
    return Api.delete(url + "/api/pembimbing/" + id);
  },
};
