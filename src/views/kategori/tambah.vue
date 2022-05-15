<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import apiKategori from "../../apis/Kategori.js";

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
    const kategori = reactive({
      nama_kategori: "",
      detail: "",
    });

    const validation = ref([]);
    const router = useRouter();
    function store() {
      console.log('erza')
      apiKategori
        .tambahKategori(kategori)
        .then(() => {
          router.push({
            name: "lihat-kategori",
          });
        })
        .catch((err) => {
          validation.value = err.response.data.error;
        });
    }
    return {
      kategori,
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
            <h4 class="card-title mb-0 flex-grow-1">Horizontal Form</h4>
          </div>
          <!-- end card header -->
          <div class="card-body">
            <p class="text-muted">
              Create horizontal forms with the grid by adding the
              <code>row</code> class to form groups and using the
              <code>col-*-*</code> class to specify the width of your labels and
              controls. Be sure to add <code>col-form-label</code> class to your
              <code>&lt;label&gt;</code>s as well so they’re vertically centered
              with their associated form controls.
            </p>
            <div class="live-preview">
              <form @submit.prevent="store()">
                <div class="row mb-3">
                  <div class="col-lg-3">
                    <label for="nameInput" class="form-label"
                      >Nama Kategori</label
                    >
                  </div>
                  <div class="col-lg-9">
                    <input
                      type="text"
                      v-model="kategori.nama_kategori"
                      class="form-control"
                      id="nameInput"
                      placeholder="Enter your name"
                    />
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-lg-3">
                    <label for="nameInput" class="form-label">Detail</label>
                  </div>
                  <div class="col-lg-9">
                    <input
                      type="text"
                      v-model="kategori.detail"
                      class="form-control"
                      id="nameInput"
                      placeholder="Enter your name"
                    />
                  </div>
                </div>
                <div class="text-end">
                  <button type="submit" class="btn btn-primary">
                    Add Leave
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
