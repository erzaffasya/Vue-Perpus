<script>
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import appConfig from "../../../app.config";

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
  components: {
    Layout,
    PageHeader,
    lottie: Lottie,
  },
  mounted() {
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
            prevButton.closest("form").querySelectorAll(".custom-nav .done")[i]
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
                  <div
                    class="nav flex-column custom-nav nav-pills"
                    role="tablist"
                    aria-orientation="vertical"
                  >
                    <button
                      class="nav-link active"
                      id="v-pills-bill-info-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-bill-info"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-bill-info"
                      aria-selected="true"
                    >
                      <span class="step-title me-2">
                        <i class="ri-close-circle-fill step-icon me-2"></i>
                        Step 1
                      </span>
                      Data Dokumen
                    </button>
                    <button
                      class="nav-link"
                      id="v-pills-bill-address-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-bill-address"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-bill-address"
                      aria-selected="false"
                    >
                      <span class="step-title me-2">
                        <i class="ri-close-circle-fill step-icon me-2"></i>
                        Step 2
                      </span>
                      Berkas
                    </button>
                    <button
                      class="nav-link"
                      id="v-pills-payment-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-payment"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-payment"
                      aria-selected="false"
                    >
                      <span class="step-title me-2">
                        <i class="ri-close-circle-fill step-icon me-2"></i>
                        Step 3
                      </span>
                      Konfirmasi
                    </button>
                    <button
                      class="nav-link"
                      id="v-pills-finish-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-finish"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-finish"
                      aria-selected="false"
                    >
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
                      <div
                        class="tab-pane fade show active"
                        id="v-pills-bill-info"
                        role="tabpanel"
                        aria-labelledby="v-pills-bill-info-tab"
                      >
                        <div>
                          <h5>Tambah Dokumen</h5>
                          <p class="text-muted">Form Tambah Dokumen</p>
                        </div>

                        <div>
                          <div class="col-12">
                            <div class="col-sm-12">
                              <label for="firstName" class="form-label"
                                >Judul</label
                              >
                              <input
                                type="text"
                                class="form-control"
                                id="firstName"
                                placeholder="Enter Judul"
                                value=""
                              />
                            </div>
                          </div>

                          <div class="row g-3 mt-2">
                            <div class="col-sm-6">
                              <label for="firstName" class="form-label"
                                >Tahun Terbit</label
                              >
                              <input
                                type="text"
                                class="form-control"
                                id="firstName"
                                placeholder="Enter Judul"
                                value=""
                              />
                            </div>

                            <div class="col-sm-6">
                              <label for="lastName" class="form-label"
                                >Kategori</label
                              >
                              <select
                                class="form-select mb-3"
                                aria-label="Default select example"
                              >
                                <option selected="">Select your Status</option>
                                <option value="1">Declined Payment</option>
                                <option value="2">Delivery Error</option>
                                <option value="3">Wrong Amount</option>
                              </select>
                            </div>

                            <div class="col-12">
                              <label for="email" class="form-label"
                                >Penerbit
                                <span class="text-muted"
                                  >(Optional)</span
                                ></label
                              >
                              <input
                                type="text"
                                class="form-control"
                                id="email"
                                placeholder="Enter Email"
                              />
                            </div>
                            <div class="col-12">
                              <label for="email" class="form-label"
                                >Nama Pengarang
                              </label>
                              <input
                                type="text"
                                class="form-control"
                                id="email"
                                placeholder="Enter Email"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="d-flex align-items-start gap-3 mt-4">
                          <button
                            type="button"
                            class="btn btn-success btn-label right ms-auto nexttab nexttab"
                            data-nexttab="v-pills-bill-address-tab"
                          >
                            <i
                              class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"
                            ></i
                            >Selanjutnya
                          </button>
                        </div>
                      </div>
                      <!-- end tab pane -->
                      <div
                        class="tab-pane fade show"
                        id="v-pills-bill-address"
                        role="tabpanel"
                        aria-labelledby="v-pills-bill-address-tab"
                      >
                        <div>
                          <h5>Tambah Dokumen</h5>
                          <p class="text-muted">Form Tambah Dokumen.</p>
                        </div>

                        <div>
                          <div class="row g-3">
                            <div class="col-12">
                              <label for="address" class="form-label"
                                >Cover</label
                              >
                              <input
                                class="form-control"
                                type="file"
                                id="formFile"
                              />
                            </div>
                          </div>
                          <div class="row g-3 mt-1">
                            <div class="col-12">
                              <label for="address" class="form-label"
                                >Abstrak (EN)</label
                              >
                              <input
                                class="form-control"
                                type="file"
                                id="formFile"
                              />
                            </div>
                          </div>
                          <div class="row g-3 mt-1">
                            <div class="col-12">
                              <label for="address" class="form-label"
                                >Abstrak (ID)</label
                              >
                              <input
                                class="form-control"
                                type="file"
                                id="formFile"
                              />
                            </div>
                          </div>
                          <div class="row g-3 mt-1">
                            <div class="col-12">
                              <label for="address" class="form-label"
                                >BAB 1</label
                              >
                              <input
                                class="form-control"
                                type="file"
                                id="formFile"
                              />
                            </div>
                          </div>
                          <div class="row g-3 mt-1">
                            <div class="col-12">
                              <label for="address" class="form-label"
                                >BAB 2</label
                              >
                              <input
                                class="form-control"
                                type="file"
                                id="formFile"
                              />
                            </div>
                          </div>
                          <div class="row g-3 mt-1">
                            <div class="col-12">
                              <label for="address" class="form-label"
                                >BAB 3</label
                              >
                              <input
                                class="form-control"
                                type="file"
                                id="formFile"
                              />
                            </div>
                          </div>
                          <div class="row g-3 mt-1">
                            <div class="col-12">
                              <label for="address" class="form-label"
                                >BAB 4</label
                              >
                              <input
                                class="form-control"
                                type="file"
                                id="formFile"
                              />
                            </div>
                          </div>
                          <div class="row g-3 mt-1">
                            <div class="col-12">
                              <label for="address" class="form-label"
                                >Kesimpulan</label
                              >
                              <input
                                class="form-control"
                                type="file"
                                id="formFile"
                              />
                            </div>
                          </div>
                          <div class="row g-3 mt-1">
                            <div class="col-12">
                              <label for="address" class="form-label"
                                >Daftar Pustaka</label
                              >
                              <input
                                class="form-control"
                                type="file"
                                id="formFile"
                              />
                            </div>
                          </div>
                          <div class="row g-3 mt-1">
                            <div class="col-12">
                              <label for="address" class="form-label"
                                >Paper</label
                              >
                              <input
                                class="form-control"
                                type="file"
                                id="formFile"
                              />
                            </div>
                          </div>
                          <div class="row g-3 mt-1">
                            <div class="col-12">
                              <label for="address" class="form-label"
                                >Lembar Persetujuan</label
                              >
                              <input
                                class="form-control"
                                type="file"
                                id="formFile"
                              />
                            </div>
                          </div>
                          <div class="row g-3 mt-1">
                            <div class="col-12">
                              <label for="address" class="form-label"
                                >Full Dokumen</label
                              >
                              <input
                                class="form-control"
                                type="file"
                                id="formFile"
                              />
                            </div>
                          </div>
                          
                        </div>
                        <div class="d-flex align-items-start gap-3 mt-4">
                          <button
                            type="button"
                            class="btn btn-light btn-label previestab"
                            data-previous="v-pills-bill-info-tab"
                          >
                            <i
                              class="ri-arrow-left-line label-icon align-middle fs-16 me-2"
                            ></i>
                            Kembali
                          </button>
                          <button
                            type="button"
                            class="btn btn-success btn-label right ms-auto nexttab nexttab"
                            data-nexttab="v-pills-payment-tab"
                          >
                            <i
                              class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"
                            ></i
                            >Selanjutnya
                          </button>
                        </div>
                      </div>
                      <!-- end tab pane -->
                      <div
                        class="tab-pane fade"
                        id="v-pills-payment"
                        role="tabpanel"
                        aria-labelledby="v-pills-payment-tab"
                      >
                        <div>
                          <h5>Payment</h5>
                          <p class="text-muted">Fill all information below</p>
                        </div>

                        <div>
                          <div class="my-3">
                            <div class="form-check form-check-inline">
                              <input
                                id="credit"
                                name="paymentMethod"
                                type="radio"
                                class="form-check-input"
                                checked
                                required
                              />
                              <label class="form-check-label" for="credit"
                                >Credit card</label
                              >
                            </div>
                            <div class="form-check form-check-inline">
                              <input
                                id="debit"
                                name="paymentMethod"
                                type="radio"
                                class="form-check-input"
                                required
                              />
                              <label class="form-check-label" for="debit"
                                >Debit card</label
                              >
                            </div>
                            <div class="form-check form-check-inline">
                              <input
                                id="paypal"
                                name="paymentMethod"
                                type="radio"
                                class="form-check-input"
                                required
                              />
                              <label class="form-check-label" for="paypal"
                                >PayPal</label
                              >
                            </div>
                          </div>

                          <div class="row gy-3">
                            <div class="col-md-12">
                              <label for="cc-name" class="form-label"
                                >Name on card</label
                              >
                              <input
                                type="text"
                                class="form-control"
                                id="cc-name"
                                placeholder=""
                                required
                              />
                              <small class="text-muted"
                                >Full name as displayed on card</small
                              >
                              <div class="invalid-feedback">
                                Name on card is required
                              </div>
                            </div>

                            <div class="col-md-6">
                              <label for="cc-number" class="form-label"
                                >Credit card number</label
                              >
                              <input
                                type="text"
                                class="form-control"
                                id="cc-number"
                                placeholder=""
                                required
                              />
                              <div class="invalid-feedback">
                                Credit card number is required
                              </div>
                            </div>

                            <div class="col-md-3">
                              <label for="cc-expiration" class="form-label"
                                >Expiration</label
                              >
                              <input
                                type="text"
                                class="form-control"
                                id="cc-expiration"
                                placeholder=""
                                required
                              />
                              <div class="invalid-feedback">
                                Expiration date required
                              </div>
                            </div>

                            <div class="col-md-3">
                              <label for="cc-cvv" class="form-label">CVV</label>
                              <input
                                type="text"
                                class="form-control"
                                id="cc-cvv"
                                placeholder=""
                                required
                              />
                              <div class="invalid-feedback">
                                Security code required
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="d-flex align-items-start gap-3 mt-4">
                          <button
                            type="button"
                            class="btn btn-light btn-label previestab"
                            data-previous="v-pills-bill-address-tab"
                          >
                            <i
                              class="ri-arrow-left-line label-icon align-middle fs-16 me-2"
                            ></i>
                            Back to Shipping Info
                          </button>
                          <button
                            type="button"
                            class="btn btn-success btn-label right ms-auto nexttab nexttab"
                            data-nexttab="v-pills-finish-tab"
                          >
                            <i
                              class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"
                            ></i>
                            Order Complete
                          </button>
                        </div>
                      </div>
                      <!-- end tab pane -->
                      <div
                        class="tab-pane fade"
                        id="v-pills-finish"
                        role="tabpanel"
                        aria-labelledby="v-pills-finish-tab"
                      >
                        <div class="text-center pt-4 pb-2">
                          <div class="mb-4">
                            <lottie
                              colors="primary:#0ab39c,secondary:#405189"
                              :options="defaultOptions"
                              :height="120"
                              :width="120"
                            />
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

                <div class="col-lg-3">
                  <div
                    class="d-flex justify-content-between align-items-center mb-3"
                  >
                    <h5 class="fs-14 text-primary mb-0">
                      <i class="ri-shopping-cart-fill align-middle me-2"></i>
                      Your cart
                    </h5>
                    <span class="badge bg-danger rounded-pill">3</span>
                  </div>
                  <ul class="list-group mb-3">
                    <li
                      class="list-group-item d-flex justify-content-between lh-sm"
                    >
                      <div>
                        <h6 class="my-0">Product name</h6>
                        <small class="text-muted">Brief description</small>
                      </div>
                      <span class="text-muted">$12</span>
                    </li>
                    <li
                      class="list-group-item d-flex justify-content-between lh-sm"
                    >
                      <div>
                        <h6 class="my-0">Second product</h6>
                        <small class="text-muted">Brief description</small>
                      </div>
                      <span class="text-muted">$8</span>
                    </li>
                    <li
                      class="list-group-item d-flex justify-content-between lh-sm"
                    >
                      <div>
                        <h6 class="my-0">Third item</h6>
                        <small class="text-muted">Brief description</small>
                      </div>
                      <span class="text-muted">$5</span>
                    </li>
                    <li
                      class="list-group-item d-flex justify-content-between bg-light"
                    >
                      <div class="text-success">
                        <h6 class="my-0">Discount code</h6>
                        <small>−$5 Discount</small>
                      </div>
                      <span class="text-success">−$5</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between">
                      <span>Total (USD)</span>
                      <strong>$20</strong>
                    </li>
                  </ul>
                </div>
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
