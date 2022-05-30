<script>
import { reactive, ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
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
    const validation = ref([]);
    const router = useRouter();
    const route = useRoute();
    const id = computed(() => route.params.id);
    let datakategori = ref([]);

    onMounted(() => {
      apiKategori
        .showKategori(route.params.id)
        .then((response) => {
          datakategori = response.data.data;
          console.log(datakategori);
        })
        .catch((err) => {
          validation.value = err.response.data.error;
        });
    });
    console.log(route.params.id);
    const kategori = reactive({
      nama_kategori: "",
      detail: "",
    });

    function store() {
      apiKategori
        .editKategori(route.params.id, kategori)
        .then(() => {
          router.push({
            name: "lihat-kategori",
          });
        })
        .catch((err) => {
          validation.value = err.response.data.error;
        });
    }
    // console.log(response.data.data);
    return {
      validation,
      router,
      store,
      id,
      datakategori,
      kategori,
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
            <h4 class="card-title mb-0 flex-grow-1">Edit Kategori</h4>
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
                      name="nama_kategori"
                      class="form-control"
                      v-model="kategori.nama_kategori"
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
