<script>
import apiKursiBaca from "../../apis/KursiBaca.js";
import Swal from "sweetalert2";
import apiRuanganBaca from "../../apis/RuanganBaca.js";
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import appConfig from "../../../app.config";

export default {
  page: {
    title: "Layouts",
    meta: [{ name: "description", content: appConfig.description }],
  },

  components: {
    Layout,
    PageHeader,
  },

  data() {
    return {
      KursiBaca: {},
      message: "",
      RuanganBaca:{},
    };
  },

  methods: {
    store() {
      apiKursiBaca
        .editKursiBaca(this.$route.params.id, this.KursiBaca)
        .then(() => {
          Swal.fire(
            "Berhasil!",
            "Data Kursi Baca Berhasil Diubah!",
            "success"
          ).then((result) => {
            if (result.value) {
              this.$router.push({ name: "lihat-kursiBaca" });
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getKursiBaca(id) {
      await apiKursiBaca
        .showKursiBaca(id)
        .then((response) => {
          this.KursiBaca = response.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getRuanganBaca() {
      await apiRuanganBaca.lihatRuanganBaca().then((response) => {
        this.RuanganBaca = response.data.data;
        console.log(this.RuanganBaca, 'Ruangan Baca');
      });
    },
  },

  mounted() {   
    this.getRuanganBaca();
    this.getKursiBaca(this.$route.params.id);
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-xxl-6">
        <div class="card">
          <div class="card-header align-items-center d-flex">
            <h4 class="card-title mb-0 flex-grow-1">Ubah Kursi Baca</h4>
          </div>
          <!-- end card header -->
          <div class="card-body">
            <p class="text-muted">
              Form edit Kursi Baca untuk perpustakaan ITK.
            </p>
            <div class="live-preview">
              <form @submit.prevent="store()">
                <div class="row mb-3">
                  <div class="col-lg-3">
                    <label for="nameInput" class="form-label">Kode</label>
                  </div>
                  <div class="col-lg-9">
                    <input
                      type="text"
                      class="form-control"
                      id="nameInput"
                      v-model="KursiBaca.kode"
                      placeholder="Masukkan Nama KursiBaca"
                    />
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-lg-3">
                    <label for="nameInput" class="form-label">Kursi</label>
                  </div>
                  <div class="col-lg-9">
                    <input
                      type="text"
                      class="form-control"
                      id="nameInput"
                      v-model="KursiBaca.kursi"
                      placeholder="Masukkan Detail KursiBaca"
                    />
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-lg-3">
                    <label for="nameInput" class="form-label"
                      >Ruangan Baca</label
                    >
                  </div>
                  <div class="col-lg-9">
                    <select
                      class="form-select mb-2"
                      v-model="KursiBaca.ruangan_baca_id"
                      aria-label="Default select example"
                      required
                    >
                      <!-- <option disabled selected>-- PILIH --</option> -->
                      <option
                        v-for="(item, index) in RuanganBaca"
                        :key="index"
                        :value="item.id"
                      >
                        {{ item.kode }} - {{ item.ruangan }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="text-end">
                  <button type="submit" class="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
            <div class="d-none code-view"></div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
