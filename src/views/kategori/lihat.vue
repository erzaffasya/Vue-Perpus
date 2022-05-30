<script>
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import appConfig from "../../../app.config";
import apiKategori from "../../apis/Kategori.js";

export default {
  page: {
    title: "Grid Js",
    meta: [{ name: "description", content: appConfig.description }],
  },
  mounted() {
    apiKategori
      .lihatKategori()
      .then((response) => {
        this.data = response.data.data;
        this.setPages();
      })
      .catch(() => {});
  },

  data() {
    return {
      title: "Grid Js",
      items: [
        {
          text: "Tables",
          href: "/",
        },
        {
          text: "Grid Js",
          active: true,
        },
      ],
      data: [],
      page: 1,
      perPage: 5,
      pages: [],
      totalData: 0,
    };
  },
  name: "Widgets",
  components: {
    Layout,
    PageHeader,
  },
  computed: {
    displayedPosts() {
      return this.paginate(this.data);
    },
    resultQuery() {
      if (this.searchQuery) {
        const search = this.searchQuery.toLowerCase();
        return this.displayedPosts.filter((data) => {
          return (
            data.id.toLowerCase().includes(search) ||
            data.nama_kategori.toLowerCase().includes(search) ||
            data.detail.toLowerCase().includes(search)
          );
        });
      } else {
        return this.displayedPosts;
      }
    },
  },
  watch: {
    posts() {
      this.setPages();
    },
  },
  created() {
    // this.setPages();
  },
  filters: {
    trimWords(value) {
      return value.split(" ").splice(0, 20).join(" ") + "...";
    },
  },
  methods: {
    setPages() {
      let numberOfPages = Math.ceil(this.data.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(data) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return data.slice(from, to);
    },
    destroy(id) {
      apiKategori
        .hapusKategori(id)
        .then((response) => {
          this.data = response.data.data;

          this.setPages();
        })
        .catch(() => {});
    },
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="card">
        <div class="card-body" id="hello">
          <div class="table-responsive table-card">
            <table class="table align-middle table-nowrap" id="customerTable">
              <thead class="table-light text-muted">
                <tr>
                  <th class="sort" data-sort="currency_name" scope="col">ID</th>
                  <th class="sort" data-sort="current_value" scope="col">
                    Nama Kategori
                  </th>
                  <th class="sort" data-sort="pairs" scope="col">Detail</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <!--end thead-->
              <tbody class="list form-check-all">
                <tr v-for="(data, index) of resultQuery" :key="index">
                  <td class="id">
                    {{ data.id }}
                  </td>
                  <td>{{ data.nama_kategori }}</td>
                  <td class="pairs">{{ data.detail }}</td>
                  <td>
                    <span>
                      <button
                        @click.prevent="destroy(data.id)"
                        class="text-reset text-decoration-underline"
                      >
                        Delete
                      </button>
                    </span>
                    <span>
                      <router-link
                        :to="{ name: 'edit-kategori', params: { id: data.id } }"
                      >
                        Edit Data
                      </router-link>
                    </span>
                  </td>
                </tr>
              </tbody>
              <!--end tbody-->
            </table>
          </div>
          <div class="d-flex justify-content-end mt-3">
            <div class="pagination-wrap hstack gap-2">
              <a
                class="page-item pagination-prev disabled"
                href="#"
                v-if="page != 1"
                @click="page--"
              >
                Previous
              </a>
              <ul class="pagination listjs-pagination mb-0">
                <li
                  :class="{
                    active: pageNumber == page,
                    disabled: pageNumber == '...',
                  }"
                  v-for="(pageNumber, index) in pages.slice(page - 1, page + 5)"
                  :key="index"
                  @click="page = pageNumber"
                >
                  <a class="page" href="#">{{ pageNumber }}</a>
                </li>
              </ul>
              <a
                class="page-item pagination-next"
                href="#"
                @click="page++"
                v-if="page < pages.length"
              >
                Next
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
