<script>
import Swal from "sweetalert2";
import apiRuanganBaca from "../../apis/RuanganBaca.js";
import apiKursiBaca from "../../apis/KursiBaca.js";
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import appConfig from "../../../app.config";

export default {
  page: {
    title: "Layouts",
    meta: [{ name: "description", content: appConfig.description }],
  },
  data() {
    return {
      title: "Wizard",
      ruanganBaca: {},
      kursiBaca: {},
      items: [
        {
          text: "Forms",
          href: "/",
        },
        {
          text: "Wizard",
          active: true,
        },
      ],
    };
  },
  methods: {
    getRuanganBaca() {
      apiRuanganBaca.lihatRuanganBaca().then((response) => {
        this.ruanganBaca = response.data.data;
      });
    },
    store() {
      apiKursiBaca
        .tambahKursiBaca(this.kursiBaca)
        .then(response => {
          if (response.data.code == 200) {
            Swal.fire("Berhasil!", "Data Ruang Baca Berhasil Ditambah!", "success").then(
              (result) => {
                if (result.value) {
                  this.$router.push("lihat");
                }
              }
            );
          } else {
            Swal.fire("Error!", "Data Ruangan Baca Gagal Ditambah!", "error")
          }

        })
    },
  },
  components: {
    Layout,
    PageHeader,
  },

  mounted() {
    this.getRuanganBaca()
  }
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-xxl-6">
        <div class="card">
          <div class="card-header align-items-center d-flex">
            <h4 class="card-title mb-0 flex-grow-1">Tambah Kategori</h4>
          </div>
          <!-- end card header -->
          <div class="card-body">
            <p class="text-muted">
              Form tambah kategori untuk perpustakaan ITK.
            </p>
            <div class="live-preview">
              <form @submit.prevent="store()">
                <div class="row mb-3">
                  <div class="col-lg-3">
                    <label for="nameInput" class="form-label">Ruangan Baca</label>
                  </div>
                  <div class="col-lg-9">
                    <select class="form-select mb-2" v-model="kursiBaca.ruangan_baca_id"
                      aria-label="Default select example" required>
                      <!-- <option disabled selected>-- PILIH --</option> -->
                      <option v-for="(item, index) in ruanganBaca" :key="index" selected="" :value="item.id">
                        {{ item.kode }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-lg-3">
                    <label for="nameInput" class="form-label">Kode</label>
                  </div>
                  <div class="col-lg-9">
                    <input type="text" v-model="kursiBaca.kode" class="form-control"
                      placeholder="Masukkan Nama Kode" required/>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-lg-3">
                    <label for="nameInput" class="form-label">Kursi</label>
                  </div>
                  <div class="col-lg-9">
                    <input type="text" v-model="kursiBaca.kursi" class="form-control"
                      placeholder="Masukkan Detail Kursi" required />
                  </div>
                </div>
                <div class="text-end">
                  <button type="submit" class="btn btn-primary">
                    Submit
                  </button>
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
