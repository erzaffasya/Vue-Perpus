<script>
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import appConfig from "../../../app.config";
import apiKategori from "../../apis/Kategori.js";
import apiDokumen from "../../apis/Dokumen.js";
import animationData from "@/components/widgets/lupuorrc.json";
import Lottie from "@/components/widgets/lottie.vue";

export default {
  page: {
    title: "Wizard",
    meta: [{ name: "description", content: appConfig.description }],
  },
  data() {
    return {
      title: "Wizard",
      Kategori: {},
      Dokumen: {},
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
      defaultOptions: { animationData: animationData },
    };
  },
  methods: {
    getKategori() {
      apiKategori.lihatKategori().then((response) => {
        this.Kategori = response.data.data;
      });
    },
    postDokumen(event) {
      const fd = new FormData();
      fd.append('profile_image', event.target.files[0])
      apiDokumen.tambahDokumen().then((response) => {
        this.Kategori = response.data.data;
      });
    },
  },
  components: {
    Layout,
    PageHeader,
    lottie: Lottie,
  },
  mounted() {
    this.getKategori(),
      document.querySelectorAll(".form-steps").forEach(function (form) {
        // next tab
        form.querySelectorAll(".nexttab").forEach(function (nextButton) {
          var tabEl = form.querySelectorAll('button[data-bs-toggle="pill"]');
          tabEl.forEach(function (item) {
            item.addEventListener("show.bs.tab", function (event) {
              event.target.classList.add("done");
            });
          });
          nextButton.addEventListener("click", function () {
            var nextTab = nextButton.getAttribute("data-nexttab");
            document.getElementById(nextTab).click();
          });
        });

        //Pervies tab
        form.querySelectorAll(".previestab").forEach(function (prevButton) {
          prevButton.addEventListener("click", function () {
            var prevTab = prevButton.getAttribute("data-previous");
            var totalDone = prevButton
              .closest("form")
              .querySelectorAll(".custom-nav .done").length;
            for (var i = totalDone - 1; i < totalDone; i++) {
              prevButton.closest("form").querySelectorAll(".custom-nav .done")[
                i
              ]
                ? prevButton
                  .closest("form")
                  .querySelectorAll(".custom-nav .done")
                [i].classList.remove("done")
                : "";
            }
            document.getElementById(prevTab).click();
          });
        });

        // Step number click
        var tabButtons = form.querySelectorAll('button[data-bs-toggle="pill"]');
        tabButtons.forEach(function (button, i) {
          button.setAttribute("data-position", i);
          button.addEventListener("click", function () {
            var getProgreebar = button.getAttribute("data-progressbar");
            if (getProgreebar) {
              var totallength =
                document
                  .getElementById("custom-progress-bar")
                  .querySelectorAll("li").length - 1;
              var current = i;
              var percent = (current / totallength) * 100;
              document
                .getElementById("custom-progress-bar")
                .querySelector(".progress-bar").style.width = percent + "%";
            }
            form.querySelectorAll(".custom-nav .done").length > 0
              ? form
                .querySelectorAll(".custom-nav .done")
                .forEach(function (doneTab) {
                  doneTab.classList.remove("done");
                })
              : "";
            for (var j = 0; j <= i; j++) {
              tabButtons[j].classList.contains("active")
                ? tabButtons[j].classList.remove("done")
                : tabButtons[j].classList.add("done");
            }
          });
        });
      });
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-xl-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title mb-0">Arrow Nav Steps</h4>
          </div>
          <!-- end card header -->
          <div class="card-body form-steps">
            <form class="vertical-navs-step">
              <div class="row gy-5">
                <div class="col-lg-3">
                  <div class="nav flex-column custom-nav nav-pills" role="tablist" aria-orientation="vertical">
                    <button class="nav-link active" id="v-pills-bill-info-tab" data-bs-toggle="pill"
                      data-bs-target="#v-pills-bill-info" type="button" role="tab" aria-controls="v-pills-bill-info"
                      aria-selected="true">
                      <span class="step-title me-2">
                        <i class="ri-close-circle-fill step-icon me-2"></i>
                        Step 1
                      </span>
                      Data Dokumen
                    </button>
                    <button class="nav-link" id="v-pills-bill-address-tab" data-bs-toggle="pill"
                      data-bs-target="#v-pills-bill-address" type="button" role="tab"
                      aria-controls="v-pills-bill-address" aria-selected="false">
                      <span class="step-title me-2">
                        <i class="ri-close-circle-fill step-icon me-2"></i>
                        Step 2
                      </span>
                      Berkas
                    </button>
                    <button class="nav-link" id="v-pills-payment-tab" data-bs-toggle="pill"
                      data-bs-target="#v-pills-payment" type="button" role="tab" aria-controls="v-pills-payment"
                      aria-selected="false">
                      <span class="step-title me-2">
                        <i class="ri-close-circle-fill step-icon me-2"></i>
                        Step 3
                      </span>
                      Konfirmasi
                    </button>
                    <button class="nav-link" id="v-pills-finish-tab" data-bs-toggle="pill"
                      data-bs-target="#v-pills-finish" type="button" role="tab" aria-controls="v-pills-finish"
                      aria-selected="false">
                      <span class="step-title me-2">
                        <i class="ri-close-circle-fill step-icon me-2"></i>
                        Step 4
                      </span>
                      Selesai
                    </button>
                  </div>
                  <!-- end nav -->
                </div>
                <!-- end col-->
                <div class="col-lg-6">
                  <div class="px-lg-4">
                    <div class="tab-content">
                      <div class="tab-pane fade show active" id="v-pills-bill-info" role="tabpanel"
                        aria-labelledby="v-pills-bill-info-tab">
                        <div>
                          <h5>Tambah Dokumen</h5>
                          <p class="text-muted">Form Tambah Dokumen</p>
                        </div>

                        <div>
                          <div class="col-12">
                            <div class="col-sm-12">
                              <label for="firstName" class="form-label">Judul</label>
                              <input type="text" class="form-control" v-model="Dokumen.judul" id="firstName"
                                placeholder="Masukkan Judul" name="" />
                            </div>
                          </div>

                          <div class="row g-3 mt-2">
                            <div class="col-sm-6">
                              <label for="firstName" class="form-label">Tahun Terbit</label>
                              <input type="number" class="form-control" id="firstName" v-model="Dokumen.tahun_terbit"
                                placeholder="Masukkan Tahun Terbit" value="" />
                            </div>

                            <div class="col-sm-6">
                              <label for="lastName" class="form-label">Kategori</label>
                              <select class="form-select mb-2" v-model="Dokumen.kategori_id"
                                aria-label="Default select example">
                                <option v-for="(item, index) in Kategori" :key="index" selected="" :value="item.id">
                                  {{ item.nama_kategori }}
                                </option>
                              </select>
                            </div>

                            <div class="col-12">
                              <label for="email" class="form-label">Penerbit
                                <span class="text-muted">(Optional)</span></label>
                              <input type="text" class="form-control" v-model="Dokumen.penerbit" id="email"
                                placeholder="Masukkan Penerbit" />
                            </div>
                            <div class="col-12">
                              <label for="email" class="form-label">Nama Pengarang
                              </label>
                              <input type="text" class="form-control" v-model="Dokumen.nama_pengarang" id="email"
                                placeholder="Masukkan Nama Pengarang" />
                            </div>
                          </div>
                        </div>

                        <div class="d-flex align-items-start gap-3 mt-4">
                          <button type="button" class="btn btn-success btn-label right ms-auto nexttab nexttab"
                            data-nexttab="v-pills-bill-address-tab">
                            <i class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Selanjutnya
                          </button>
                        </div>
                      </div>
                      <!-- end tab pane -->
                      <div class="tab-pane fade show" id="v-pills-bill-address" role="tabpanel"
                        aria-labelledby="v-pills-bill-address-tab">
                        <div>
                          <h5>Tambah Dokumen</h5>
                          <p class="text-muted">Form Tambah Dokumen.</p>
                        </div>

                        <div>
                          <div class="row g-3">
                            <div class="col-12">
                              <label for="address" class="form-label">Cover</label>
                              <input @change="Dokumen.cover" class="form-control" type="file" id="formFile" />
                            </div>
                          </div>
                          <div class="row g-3 mt-1">
                            <div class="col-12">
                              <label for="address" class="form-label">Abstrak (EN)</label>
                              <input @change="Dokumen.abstract_en" class="form-control" type="file" id="formFile" />
                            </div>
                          </div>
                          <div class="row g-3 mt-1">
                            <div class="col-12">
                              <label for="address" class="form-label">Abstrak (ID)</label>
                              <input @change="Dokumen.abstract_id" class="form-control" type="file" id="formFile" />
                            </div>
                          </div>
                          <div class="row g-3 mt-1">
                            <div class="col-12">
                              <label for="address" class="form-label">BAB 1</label>
                              <input @change="Dokumen.bab1" class="form-control" type="file" id="formFile" />
                            </div>
                          </div>
                          <div class="row g-3 mt-1">
                            <div class="col-12">
                              <label for="address" class="form-label">BAB 2</label>
                              <input @change="Dokumen.bab2" class="form-control" type="file" id="formFile" />
                            </div>
                          </div>
                          <div class="row g-3 mt-1">
                            <div class="col-12">
                              <label for="address" class="form-label">BAB 3</label>
                              <input @change="Dokumen.bab3" class="form-control" type="file" id="formFile" />
                            </div>
                          </div>
                          <div class="row g-3 mt-1">
                            <div class="col-12">
                              <label for="address" class="form-label">BAB 4</label>
                              <input @change="Dokumen.bab4" class="form-control" type="file" id="formFile" />
                            </div>
                          </div>
                          <div class="row g-3 mt-1">
                            <div class="col-12">
                              <label for="address" class="form-label">Kesimpulan</label>
                              <input @change="Dokumen.kesimpulan" class="form-control" type="file" id="formFile" />
                            </div>
                          </div>
                          <div class="row g-3 mt-1">
                            <div class="col-12">
                              <label for="address" class="form-label">Daftar Pustaka</label>
                              <input @change="Dokumen.daftar_pustaka" class="form-control" type="file" id="formFile" />
                            </div>
                          </div>
                          <div class="row g-3 mt-1">
                            <div class="col-12">
                              <label for="address" class="form-label">Paper</label>
                              <input @change="Dokumen.paper" class="form-control" type="file" id="formFile" />
                            </div>
                          </div>
                          <div class="row g-3 mt-1">
                            <div class="col-12">
                              <label for="address" class="form-label">Lembar Persetujuan</label>
                              <input class="form-control" type="file" id="formFile" />
                            </div>
                          </div>
                          <div class="row g-3 mt-1">
                            <div class="col-12">
                              <label for="address" class="form-label">Full Dokumen</label>
                              <input class="form-control" type="file" id="formFile" />
                            </div>
                          </div>
                        </div>
                        <div class="d-flex align-items-start gap-3 mt-4">
                          <button type="button" class="btn btn-light btn-label previestab"
                            data-previous="v-pills-bill-info-tab">
                            <i class="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>
                            Kembali
                          </button>
                          <button type="button" class="btn btn-success btn-label right ms-auto nexttab nexttab"
                            data-nexttab="v-pills-payment-tab">
                            <i class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Selanjutnya
                          </button>
                        </div>
                      </div>
                      <!-- end tab pane -->
                      <div class="tab-pane fade" id="v-pills-payment" role="tabpanel"
                        aria-labelledby="v-pills-payment-tab">
                        <div>
                          <h5>Konfirmasi</h5>
                          <p class="text-muted">
                            Harap Konfirmasi Data dan Berkas Sebelum Disimpan.
                          </p>
                        </div>

                        <div class="d-flex align-items-start gap-3 mt-4">
                          <button type="button" class="btn btn-light btn-label previestab"
                            data-previous="v-pills-bill-address-tab">
                            <i class="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>
                            Kembali
                          </button>
                          <button type="button" class="btn btn-success btn-label right ms-auto nexttab nexttab"
                            data-nexttab="v-pills-finish-tab">
                            <i class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                            Simpan
                          </button>
                        </div>
                      </div>
                      <!-- end tab pane -->
                      <div class="tab-pane fade" id="v-pills-finish" role="tabpanel"
                        aria-labelledby="v-pills-finish-tab">
                        <div class="text-center pt-4 pb-2">
                          <div class="mb-4">
                            <lottie colors="primary:#0ab39c,secondary:#405189" :options="defaultOptions" :height="120"
                              :width="120" />
                          </div>
                          <h5>Your Order is Completed !</h5>
                          <p class="text-muted">
                            You Will receive an order confirmation email with
                            details of your order.
                          </p>
                        </div>
                      </div>
                      <!-- end tab pane -->
                    </div>
                    <!-- end tab content -->
                  </div>
                </div>
                <!-- end col -->
              </div>
              <!-- end row -->
            </form>
          </div>
          <!-- end card body -->
        </div>
        <!-- end card -->
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->

    <!-- end row -->
  </Layout>
</template>
