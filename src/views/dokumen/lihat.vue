<script>
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

import Layout from "../../layouts/main.vue";
import appConfig from "../../../app.config";
import PageHeader from "@/components/page-header";
import apiDokumen from "../../apis/Dokumen.js";
import animationData from "@/components/widgets/msoeawqm.json";
import Lottie from "@/components/widgets/lottie.vue";

export default {
  page: {
    title: "Orders",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  data() {
    return {
      title: "Orders",
      items: [
        {
          text: "Ecommerce",
          href: "/",
        },
        {
          text: "Orders",
          active: true,
        },
      ],
      page: 1,
      perPage: 8,
      pages: [],
      value: null,
      value1: null,
      searchQuery: null,
      config: {
        wrap: true, // set wrap to true only when using 'input-group'
        altFormat: "M j, Y",
        altInput: true,
        dateFormat: "d M, Y",
        mode: "range",
      },
      timeConfig: {
        wrap: true, // set wrap to true only when using 'input-group'
        altFormat: "M j, Y",
        altInput: true,
        dateFormat: "d M, Y",
        enableTime: true,
        noCalendar: true,
      },
      date: null,
      date2: null,
      defaultOptions: { animationData: animationData },
      dokumen: [],
      isStatus: null,
      isPayment: null,
    };
  },
  components: {
    Layout,
    PageHeader,
    lottie: Lottie,
    Multiselect,
    flatPickr,
  },
  computed: {
    displayedPosts() {
      return this.paginate(this.dokumen);
    },
    resultQuery() {
      console.log(this.searchQuery)
      if (this.searchQuery) {
        const search = this.searchQuery.toLowerCase();
        return this.displayedPosts.filter((data) => {
          return (
            data.judul && data.judul.toLowerCase().includes(search) ||
            data.kategori_id && data.kategori_id.toLowerCase().includes(search) ||
            data.nama_pengarang && data.nama_pengarang.toLowerCase().includes(search) ||
            data.status && data.status.toLowerCase().includes(search) ||
            data.jurusan && data.jurusan.toLowerCase().includes(search)
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
    resultQuery(newValue) {
      return newValue;
    },
  },
  created() {
    this.getDokumen();
  },
  mounted() {

  },
  filters: {
    trimWords(value) {
      return value.split(" ").splice(0, 20).join(" ") + "...";
    },
  },
  methods: {
    getDokumen() {
      apiDokumen.lihatDokumen().then((response) => {
        this.dokumen = response.data.data;
        this.setPages();
      });
    },
    onChangeStatus(e) {
      this.isStatus = e;
    },
    onChangePayment(e) {
      this.isPayment = e;
    },
    setPages() {
      let numberOfPages = Math.ceil(this.dokumen.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(dokumen) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return dokumen.slice(from, to);
    },
    SearchData() {
      this.resultQuery;
      // var isstatus = document.getElementById("idStatus").value;
      //   var payment = document.getElementById("idPayment").value;
    },
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">

      <!--end col-->
      <div class="col-xxl-12">
        <div class="card">
          <div class="card-body">
            <p class="text-muted">Example of nav tabs with badge wrapped in nav item.</p>
            <!-- Nav tabs -->
            <ul class="nav nav-tabs nav-justified mb-3" role="tablist">
              <li class="nav-item">
                <a class="nav-link active" data-bs-toggle="tab" href="#nav-badge-home" role="tab" aria-selected="false">
                  Explore
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link align-middle" data-bs-toggle="tab" href="#nav-badge-profile" role="tab"
                  aria-selected="false">
                  Profile <span class="badge bg-success">Done</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link align-middle" data-bs-toggle="tab" href="#nav-badge-messages" role="tab"
                  aria-selected="false">
                  Messages <span class="badge bg-danger rounded-circle">5</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-bs-toggle="tab" href="#nav-badge-settings" role="tab" aria-selected="true">
                  Settings
                </a>
              </li>
            </ul>
            <!-- Nav tabs -->
            <div class="tab-content text-muted">
              <div class="tab-pane active" id="nav-badge-home" role="tabpanel">
                <div class="d-flex">
                  <div class="flex-grow-1 ms-2">
                    <div class="col-lg-12">
                      <div class="card" id="orderList">
                        <div class="card-body border border-dashed border-end-0 border-start-0">
                          <form>
                            <div class="row g-3">
                              <div class="col-xxl-5 col-sm-6">
                                <div class="search-box">
                                  <input v-model="this.searchQuery" type="text" class="form-control search"
                                    placeholder="Search for order ID, customer, order status or something..." />
                                  <i class="ri-search-line search-icon"></i>
                                </div>
                              </div>
                              <!--end col-->
                              <div class="col-xxl-2 col-sm-6">
                                <div>
                                  <flat-pickr placeholder="Select date" v-model="date" :config="config"
                                    class="form-control flatpickr-input" id="demo-datepicker"></flat-pickr>
                                </div>
                              </div>
                              <!--end col-->
                              <div class="col-xxl-2 col-sm-4">
                                <div>
                                  <Multiselect class="form-control" v-model="value" :close-on-select="true"
                                    :searchable="true" :create-option="true" @input="onChangePayment" :options="[
                                      { value: '', label: 'Status' },
                                      { value: 'All', label: 'All' },
                                      { value: 'Pending', label: 'Pending' },
                                      { value: 'Inprogress', label: 'Inprogress' },
                                      { value: 'Cancelled', label: 'Cancelled' },
                                      { value: 'Pickups', label: 'Pickups' },
                                      { value: 'Returns', label: 'Returns' },
                                      { value: 'Delivered', label: 'Delivered' },
                                    ]" />
                                </div>
                              </div>
                              <!--end col-->
                              <div class="col-xxl-2 col-sm-4">
                                <div>
                                  <Multiselect class="form-control" v-model="value1" :close-on-select="true"
                                    :searchable="true" :create-option="true" @input="onChangeStatus" :options="[
                                      { value: '', label: 'Select Payment' },
                                      { value: 'All', label: 'All' },
                                      { value: 'Mastercard', label: 'Mastercard' },
                                      { value: 'Paypal', label: 'Paypal' },
                                      { value: 'Visa', label: 'Visa' },
                                      { value: 'COD', label: 'COD' },
                                    ]" />
                                </div>
                              </div>
                              <!--end col-->
                              <div class="col-xxl-1 col-sm-4">
                                <div>
                                  <button type="button" class="btn btn-primary w-100" @click="SearchData">
                                    <i class="ri-equalizer-fill me-1 align-bottom"></i>
                                    Filters
                                  </button>
                                </div>
                              </div>
                              <!--end col-->
                            </div>
                            <!--end row-->
                          </form>
                        </div>
                        <div class="card-body pt-0">
                          <div>

                            <div class="table-responsive table-card mb-1">
                              <table class="table table-nowrap align-middle" id="orderTable">
                                <thead class="text-muted table-light">
                                  <tr class="text-uppercase">
                                    <th scope="col" style="width: 25px">

                                    </th>
                                    <th class="sort" data-sort="id">Order ID</th>
                                    <th class="sort" data-sort="customer_name">Judul</th>
                                    <th class="sort" data-sort="product_name">Kategori</th>
                                    <th class="sort" data-sort="date">Jurusan</th>
                                    <th class="sort" data-sort="amount">Nama Penulis</th>
                                    <th class="sort" data-sort="status">Status</th>
                                    <th class="sort" data-sort="city">Action</th>
                                  </tr>
                                </thead>
                                <tbody class="list form-check-all">
                                  <tr v-for="(data, index) of resultQuery" :key="index">
                                    <th scope="row">

                                    </th>
                                    <td class="id">
                                      <router-link to="/ecommerce/order-details" class="fw-medium link-primary">{{
                                          data.orderId
                                      }}
                                      </router-link>
                                    </td>
                                    <td class="customer_name">{{ data.judul }}</td>
                                    <td class="product_name">{{ data.kategori_id }}</td>
                                    <td class="date">
                                      {{ data.jurusan }}
                                      <!-- <small class="text-muted">02:21 AM</small> -->
                                    </td>
                                    <td class="amount">{{ data.nama_pengarang }}</td>
                                    <td class="status">
                                      <span :class="`badge badge-soft-${data.statusClass} text-uppercase`">{{
                                          data.status
                                      }}</span>
                                    </td>
                                    <td>
                                      <ul class="list-inline hstack gap-2 mb-0">
                                        <li class="list-inline-item" data-bs-toggle="tooltip" data-bs-trigger="hover"
                                          data-bs-placement="top" title="View">
                                          <router-link :to="{ name: 'detail-dokumen', params: { id: data.id } }"
                                            class="text-primary d-inline-block">
                                            <i class="ri-eye-fill fs-16"></i>
                                          </router-link>
                                        </li>
                                        <li class="list-inline-item edit" data-bs-toggle="tooltip"
                                          data-bs-trigger="hover" data-bs-placement="top" title="Edit">
                                          <a href="#showModal" data-bs-toggle="modal"
                                            class="text-primary d-inline-block edit-item-btn">
                                            <i class="ri-pencil-fill fs-16"></i>
                                          </a>
                                        </li>
                                        <li class="list-inline-item" data-bs-toggle="tooltip" data-bs-trigger="hover"
                                          data-bs-placement="top" title="Remove">
                                          <a class="text-danger d-inline-block remove-item-btn" data-bs-toggle="modal"
                                            data-bs-target="#deleteOrder">
                                            <i class="ri-delete-bin-5-fill fs-16"></i>
                                          </a>
                                        </li>
                                      </ul>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <div class="noresult" style="display: none">
                                <div class="text-center">
                                  <lottie class="avatar-xl" colors="primary:#121331,secondary:#08a88a"
                                    :options="defaultOptions" :height="75" :width="75" />
                                  <h5 class="mt-2">Sorry! No Result Found</h5>
                                  <p class="text-muted">
                                    We've searched more than 150+ Orders We did not find any
                                    orders for you search.
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="d-flex justify-content-end mt-3">
                              <div class="pagination-wrap hstack gap-2">
                                <a class="page-item pagination-prev disabled" href="#" v-if="page != 1" @click="page--">
                                  Previous
                                </a>
                                <ul class="pagination listjs-pagination mb-0">
                                  <li v-for="(pageNumber, index) in pages.slice(
                                    page - 1,
                                    page + 5
                                  )" :key="index" @click="page = pageNumber" :class="{
  active: pageNumber == page,
  disabled: pageNumber == '...',
}">
                                    <a class="page" href="#">{{ pageNumber }}</a>
                                  </li>
                                </ul>
                                <a class="page-item pagination-next" href="#" @click="page++"
                                  v-if="page < pages.length">
                                  Next
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane" id="nav-badge-profile" role="tabpanel">
                <div class="d-flex">
                  <div class="flex-shrink-0">
                    <i class="ri-checkbox-circle-fill text-success"></i>
                  </div>
                  <div class="flex-grow-1 ms-2">
                    In some designs, you might adjust your tracking to create a certain artistic effect. It can also
                    help you fix fonts that are poorly spaced to begin with.
                  </div>
                </div>
                <div class="d-flex mt-2">
                  <div class="flex-shrink-0">
                    <i class="ri-checkbox-circle-fill text-success"></i>
                  </div>
                  <div class="flex-grow-1 ms-2">
                    A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring
                    which I enjoy with my whole heart.
                  </div>
                </div>
              </div>
              <div class="tab-pane" id="nav-badge-messages" role="tabpanel">
                <div class="d-flex">
                  <div class="flex-shrink-0">
                    <i class="ri-checkbox-circle-fill text-success"></i>
                  </div>
                  <div class="flex-grow-1 ms-2">
                    Each design is a new, unique piece of art birthed into this world, and while you have the
                    opportunity to be creative and make your own style choices.
                  </div>
                </div>
                <div class="d-flex mt-2">
                  <div class="flex-shrink-0">
                    <i class="ri-checkbox-circle-fill text-success"></i>
                  </div>
                  <div class="flex-grow-1 ms-2">
                    For that very reason, I went on a quest and spoke to many different professional graphic designers
                    and asked them what graphic design tips they live.
                  </div>
                </div>
              </div>
              <div class="tab-pane" id="nav-badge-settings" role="tabpanel">
                <div class="d-flex mt-2">
                  <div class="flex-shrink-0">
                    <i class="ri-checkbox-circle-fill text-success"></i>
                  </div>
                  <div class="flex-grow-1 ms-2">
                    For that very reason, I went on a quest and spoke to many different professional graphic designers
                    and asked them what graphic design tips they live.
                  </div>
                </div>
                <div class="d-flex mt-2">
                  <div class="flex-shrink-0">
                    <i class="ri-checkbox-circle-fill text-success"></i>
                  </div>
                  <div class="flex-grow-1 ms-2">
                    After gathering lots of different opinions and graphic design basics, I came up with a list of 30
                    graphic design tips that you can start implementing.
                  </div>
                </div>
              </div>
            </div>
          </div><!-- end card-body -->
        </div>
        <!--end card-->
      </div>
      <!--end col-->
    </div>
  </Layout>
</template>