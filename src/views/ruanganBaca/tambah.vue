<script>
import Swal from "sweetalert2";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
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

  setup() {
    const RuanganBaca = reactive({});

    const validation = ref([]);
    const router = useRouter();
    function store() {
      apiRuanganBaca
        .tambahRuanganBaca(RuanganBaca)
        .then(response => {
          if (response.data.code == 200) {
            Swal.fire("Berhasil!", "Data Ruangan Baca Berhasil Ditambah!", "success").then(
              (result) => {
                if (result.value) {
                  router.push("lihat");
                }
              }
            );
          } else {
            console.log(RuanganBaca);
            Swal.fire("Error!", "Data Ruangan Baca Gagal Ditambah!", "error")
          }

        })
    }
    return {
      RuanganBaca,
      validation,
      router,
      store,
    };
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
            <h4 class="card-title mb-0 flex-grow-1">Tambah Ruangan Baca</h4>
          </div>
          <!-- end card header -->
          <div class="card-body">
            <p class="text-muted">
              Form tambah ruangan baca perpustakaan ITK.
            </p>
            <div class="live-preview">
              <form @submit.prevent="store()">
                <div class="row mb-3">
                  <div class="col-lg-3">
                    <label for="nameInput" class="form-label">Kode</label>
                  </div>
                  <div class="col-lg-9">
                    <input type="text" v-model="RuanganBaca.kode" class="form-control" placeholder="Masukkan Kode" required/>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-lg-3">
                    <label for="nameInput" class="form-label">Ruangan</label>
                  </div>
                  <div class="col-lg-9">
                    <input type="text" v-model="RuanganBaca.ruangan" class="form-control"
                      placeholder="Masukkan Ruangan" required/>
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
