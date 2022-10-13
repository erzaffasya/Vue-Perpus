<script>
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import appConfig from "../../../app.config";
import apiKategori from "../../apis/Kategori.js";
// import apiUser from "../../apis/Kategori.js";    
import apiDokumen from "../../apis/Dokumen.js";
import animationData from "@/components/widgets/lupuorrc.json";
import Lottie from "@/components/widgets/lottie.vue";
import $ from 'jquery';
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default {
    page: {
        title: "Wizard",
        meta: [{
            name: "description",
            content: appConfig.description
        }],
    },
    data() {
        return {
            title: "Wizard",
            Kategori: {},
            Dokumen: {},
            KategoriID: "",
            Berkas: {
                status: [],
            },
            items: [{
                    text: "Forms",
                    href: "/",
                },
                {
                    text: "Wizard",
                    active: true,
                },
            ],
            defaultOptions: {
                animationData: animationData
            },
            editor: ClassicEditor,
            plugins: [
                "advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker",
                "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
                "save table contextmenu directionality emoticons template paste textcolor",
            ],
            toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons",
            options: {
                height: 300,
                style_formats: [{
                        title: "Bold text",
                        inline: "b"
                    },
                    {
                        title: "Red text",
                        inline: "span",
                        styles: {
                            color: "#ff0000"
                        }
                    },
                    {
                        title: "Red header",
                        block: "h1",
                        styles: {
                            color: "#ff0000"
                        }
                    },
                    {
                        title: "Example 1",
                        inline: "span",
                        classes: "example1"
                    },
                    {
                        title: "Example 2",
                        inline: "span",
                        classes: "example2"
                    },
                    {
                        title: "Table styles"
                    },
                    {
                        title: "Table row 1",
                        selector: "tr",
                        classes: "tablerow1"
                    },
                ],
            },
        };
    },
    methods: {
        getKategori() {
            apiKategori.lihatKategori().then((response) => {
                this.Kategori = response.data.data;
            });
        },
        getBerkas() {
            // this.Dokumen.reset();
            this.Dokumen = {}
            apiKategori.showKategori(this.KategoriID).then((response) => {
                //  this.Dokumen = {}
                this.Berkas = response.data.data;
                this.Berkas.status = this.Berkas.berkas
                // $.each(JSON.parse(this.Berkas.berkas), function (key, value) {
                //   this.Berkas.status = key,value

                // });
                console.log(this.Berkas);
            });
        },

        imageChange(event, name) {
            if (event) {
                $('.preview_' + name).attr('src', URL.createObjectURL(event.target.files[0]));
            }
            this.Dokumen[name] = event.target.files[0];
        },

        postDokumen() {
            // console.log(this.Dokumen);
            const fd = new FormData();
            $.each(this.Dokumen, function (key, value) {
                fd.append(key, value);
            });
            fd.append("kategori_id", this.KategoriID)
            apiDokumen.tambahDokumen(fd).then((response) => {
                this.Kategori = response.data.data;
            });

        },
    },
    components: {
        Layout,
        PageHeader,
        lottie: Lottie,
        ckeditor: CKEditor.component
    },
    mounted() {
        this.getKategori(),
            document.querySelectorAll(".form-steps").forEach(function (form) {

                // next tab
                form.querySelectorAll(".nexttab").forEach(function (nextButton) {
                    var tabEl = form.querySelectorAll('button[data-bs-toggle="pill"]');
                    tabEl.forEach(function (item) {
                        item.addEventListener('show.bs.tab', function (event) {
                            event.target.classList.add('done');
                        });
                    });
                    nextButton.addEventListener("click", function () {
                        var nextTab = nextButton.getAttribute('data-nexttab');
                        document.getElementById(nextTab).click();
                    });
                });

                //Pervies tab
                form.querySelectorAll(".previestab").forEach(function (prevButton) {

                    prevButton.addEventListener("click", function () {
                        var prevTab = prevButton.getAttribute('data-previous');
                        var totalDone = prevButton.closest("form").querySelectorAll(".custom-nav .done").length;
                        for (var i = totalDone - 1; i < totalDone; i++) {
                            (prevButton.closest("form").querySelectorAll(".custom-nav .done")[i]) ? prevButton.closest("form").querySelectorAll(".custom-nav .done")[i].classList.remove('done'): '';
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
                            var totallength = document.getElementById("custom-progress-bar").querySelectorAll("li").length - 1;
                            var current = i;
                            var percent = (current / totallength) * 100;
                            document.getElementById("custom-progress-bar").querySelector('.progress-bar').style.width = percent + "%";
                        }
                        (form.querySelectorAll(".custom-nav .done").length > 0) ?
                        form.querySelectorAll(".custom-nav .done").forEach(function (doneTab) {
                            doneTab.classList.remove('done');
                        }): '';
                        for (var j = 0; j <= i; j++) {
                            tabButtons[j].classList.contains('active') ? tabButtons[j].classList.remove('done') : tabButtons[j].classList.add('done');
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
                    <h4 class="card-title mb-0">Arrow Nav Steps {{this.Dokumen}} </h4>
                </div>
                <!-- end card header -->
                <div class="card-body form-steps">
                    <form @submit.prevent="postDokumen()" class="vertical-navs-step">
                        <div class="row gy-5">
                            <div class="col-lg-3">
                                <div class="nav flex-column custom-nav nav-pills" role="tablist" aria-orientation="vertical">
                                    <button class="nav-link active" id="v-pills-bill-info-tab" data-bs-toggle="pill" data-bs-target="#v-pills-bill-info" type="button" role="tab" aria-controls="v-pills-bill-info" aria-selected="true">
                                        <span class="step-title me-2">
                                            <i class="ri-close-circle-fill step-icon me-2"></i>
                                            Step 1
                                        </span>
                                        Data Dokumen
                                    </button>
                                    <button class="nav-link" id="v-pills-bill-address-tab" data-bs-toggle="pill" data-bs-target="#v-pills-bill-address" type="button" role="tab" aria-controls="v-pills-bill-address" aria-selected="false">
                                        <span class="step-title me-2">
                                            <i class="ri-close-circle-fill step-icon me-2"></i>
                                            Step 2
                                        </span>
                                        Berkas
                                    </button>
                                    <button class="nav-link" id="v-pills-payment-tab" data-bs-toggle="pill" data-bs-target="#v-pills-payment" type="button" role="tab" aria-controls="v-pills-payment" aria-selected="false">
                                        <span class="step-title me-2">
                                            <i class="ri-close-circle-fill step-icon me-2"></i>
                                            Step 3
                                        </span>
                                        Konfirmasi
                                    </button>
                                    <button class="nav-link" id="v-pills-finish-tab" data-bs-toggle="pill" data-bs-target="#v-pills-finish" type="button" role="tab" aria-controls="v-pills-finish" aria-selected="false">
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
                                        <div class="tab-pane fade show active" id="v-pills-bill-info" role="tabpanel" aria-labelledby="v-pills-bill-info-tab">
                                            <div>
                                                <h5>Tambah Dokumen</h5>
                                                <p class="text-muted">Form Tambah Dokumen</p>
                                            </div>

                                            <div>
                                                <div class="col-12">
                                                    <div class="col-sm-12">
                                                        <label for="firstName" class="form-label">Judul</label>
                                                        <input type="text" class="form-control" v-model="Dokumen.judul" id="firstName" placeholder="Masukkan Judul" />
                                                    </div>
                                                </div>

                                                <div class="row g-3 mt-2">
                                                    <div class="col-sm-6">
                                                        <label for="firstName" class="form-label">Tahun Terbit</label>
                                                        <input type="number" class="form-control" id="firstName" v-model="Dokumen.tahun_terbit" placeholder="Masukkan Tahun Terbit" />
                                                    </div>

                                                    <div class="col-sm-6">
                                                        <label for="lastName" class="form-label">Kategori</label>
                                                        <select class="form-select mb-2" @change="getBerkas()" v-model="KategoriID" aria-label="Default select example">
                                                            <option v-for="(item, index) in Kategori" :key="index" selected="" :value="item.id">
                                                                {{ item.nama_kategori }}
                                                            </option>
                                                        </select>
                                                    </div>

                                                    <div class="col-12">
                                                        <label for="email" class="form-label">Penerbit
                                                            <span class="text-muted">(Optional)</span></label>
                                                        <input type="text" class="form-control" v-model="Dokumen.penerbit" id="email" placeholder="Masukkan Penerbit" />
                                                    </div>
                                                    <div class="col-12">
                                                        <label for="email" class="form-label">Nama Pengarang
                                                        </label>
                                                        <input type="text" class="form-control" v-model="Dokumen.nama_pengarang" id="email" placeholder="Masukkan Nama Pengarang" />
                                                    </div>
                                                    <div class="col-12">
                                                        <label for="email" class="form-label">Deskripsi
                                                        </label>
                                                        <div class="ckeditor-classic">
                                                            <ckeditor v-model="this.Dokumen.deskripsi" :editor="editor"></ckeditor>
                                                        </div>
                                                    </div>
                                                    <div class="card-body p-4" v-if="this.Berkas.isPembimbing ">
                                                        <div class="table-responsive">
                                                            <table class="invoice-table table table-borderless table-nowrap mb-0">
                                                                <thead class="align-middle">
                                                                    <tr class="table-active">
                                                                        <th scope="col" style="width: 50px">#</th>
                                                                        <th scope="col">Dosen Pembimbing</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody id="newlink">
                                                                    <tr id="1" class="product">
                                                                        <th scope="row" class="product-id">1</th>
                                                                        <td class="text-start">
                                                                            <div class="mb-2">
                                                                                <input type="text" class="form-control bg-light border-0" v-model="this.Dokumen.pembimbing_1" />
                                                                                <div class="invalid-feedback">
                                                                                    Please enter a product name
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr id="1" class="product">
                                                                        <th scope="row" class="product-id">2</th>
                                                                        <td class="text-start">
                                                                            <div class="mb-2">
                                                                                <input type="text" class="form-control bg-light border-0" v-model="this.Dokumen.pembimbing_2" />
                                                                                <div class="invalid-feedback">
                                                                                    Please enter a product name
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                                <tr id="newForm" style="display: none"></tr>

                                                            </table>
                                                            <!--end table-->
                                                        </div>

                                                        <!--end row-->

                                                    </div>
                                                </div>
                                            </div>

                                            <div class="d-flex align-items-start gap-3 mt-4">
                                                <button type="button" class="btn btn-success btn-label right ms-auto nexttab nexttab" data-nexttab="v-pills-bill-address-tab">
                                                    <i class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Selanjutnya
                                                </button>
                                            </div>
                                        </div>
                                        <!-- end tab pane -->
                                        <div class="tab-pane fade show" id="v-pills-bill-address" role="tabpanel" aria-labelledby="v-pills-bill-address-tab">
                                            <div>
                                                <h5>Tambah Dokumen</h5>
                                                <p class="text-muted">Form Tambah Dokumen.</p>
                                            </div>

                                            <div>
                                                <div v-if="this.Berkas.status['cover']" class="row g-3">
                                                    <div class="col-12">
                                                        <label for="address" class="form-label">Cover</label>
                                                        <input id="cover" @change="imageChange($event, 'cover')" ref="cover" class="form-control" type="file" />
                                                    </div>
                                                </div>
                                                <div class="row g-3 mt-1" v-if="this.Berkas.status['lembar_pengesahan']">
                                                    <div class="col-12">
                                                        <label for="address" class="form-label">Lembar Pengesahan</label>
                                                        <input id="lembar_pengesahan" @change="imageChange($event, 'lembar_pengesahan')" ref="lembar_pengesahan" class="form-control" type="file" />
                                                    </div>
                                                </div>
                                                <div class="row g-3 mt-1" v-if="this.Berkas.status['kata_pengantar']">
                                                    <div class="col-12">
                                                        <label for="address" class="form-label">Kata Pengantar</label>
                                                        <input id="kata_pengantar" @change="imageChange($event, 'kata_pengantar')" ref="kata_pengantar" class="form-control" type="file" />
                                                    </div>
                                                </div>
                                                <div class="row g-3 mt-1" v-if="this.Berkas.status['ringkasan']">
                                                    <div class="col-12">
                                                        <label for="address" class="form-label">Intisari/Ringkasan</label>
                                                        <input id="ringkasan" @change="imageChange($event, 'ringkasan')" ref="ringkasan" class="form-control" type="file" />
                                                    </div>
                                                </div>
                                                <div class="row g-3 mt-1" v-if="this.Berkas.status['daftar_isi']">
                                                    <div class="col-12">
                                                        <label for="address" class="form-label">Daftar Isi</label>
                                                        <input id="daftar_isi" @change="imageChange($event, 'daftar_isi')" ref="daftar_isi" class="form-control" type="file" />
                                                    </div>
                                                </div>
                                                <div class="row g-3 mt-1 " v-if="this.Berkas.status['daftar_gambar']">
                                                    <div class="col-12">
                                                        <label for="address" class="form-label">Daftar Gambar</label>
                                                        <input id="daftar_gambar" @change="imageChange($event, 'daftar_gambar')" ref="daftar_gambar" class="form-control" type="file" />
                                                    </div>
                                                </div>
                                                <div class="row g-3 mt-1" v-if="this.Berkas.status['daftar_tabel']">
                                                    <div class="col-12">
                                                        <label for="address" class="form-label">Daftar Tabel</label>
                                                        <input id="daftar_tabel" @change="imageChange($event, 'daftar_tabel')" ref="daftar_tabel" class="form-control" type="file" />
                                                    </div>
                                                </div>
                                                <div class="row g-3 mt-1" v-if="this.Berkas.status['daftar_notasi']">
                                                    <div class="col-12">
                                                        <label for="address" class="form-label">Daftar Notasi</label>
                                                        <input id="daftar_notasi" @change="imageChange($event, 'daftar_notasi')" ref="daftar_notasi" class="form-control" type="file" />
                                                    </div>
                                                </div>
                                                <div class="row g-3 mt-1" v-if="this.Berkas.status['bab1']">
                                                    <div class="col-12">
                                                        <label for="address" class="form-label">BAB 1</label>
                                                        <input id="bab1" @change="imageChange($event, 'bab1')" ref="bab1" class="form-control" type="file" />
                                                    </div>
                                                </div>
                                                <div class="row g-3 mt-1" v-if="this.Berkas.status['bab2']">
                                                    <div class="col-12">
                                                        <label for="address" class="form-label">BAB 2</label>
                                                        <input id="bab2" @change="imageChange($event, 'bab2')" ref="bab2" class="form-control" type="file" />
                                                    </div>
                                                </div>
                                                <div class="row g-3 mt-1" v-if="this.Berkas.status['bab3']">
                                                    <div class="col-12">
                                                        <label for="address" class="form-label">BAB 3</label>
                                                        <input id="bab3" @change="imageChange($event, 'bab3')" ref="bab3" class="form-control" type="file" />
                                                    </div>
                                                </div>
                                                <div class="row g-3 mt-1" v-if="this.Berkas.status['bab4']">
                                                    <div class="col-12">
                                                        <label for="address" class="form-label">BAB 4</label>
                                                        <input id="bab4" @change="imageChange($event, 'bab4')" ref="bab4" class="form-control" type="file" />
                                                    </div>
                                                </div>
                                                <div class="row g-3 mt-1" v-if="this.Berkas.status['lampiran']">
                                                    <div class="col-12">
                                                        <label for="address" class="form-label">Lampiran</label>
                                                        <input id="lampiran" @change="imageChange($event, 'lampiran')" ref="lampiran" class="form-control" type="file" />
                                                    </div>
                                                </div>

                                                <div class="row g-3 mt-1" v-if="this.Berkas.status['full_dokumen']">
                                                    <div class="col-12">
                                                        <label for="address" class="form-label">Full Dokumen</label>
                                                        <input id="full_dokumen" @change="imageChange($event, 'full_dokumen')" ref="full_dokumen" class="form-control" type="file" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex align-items-start gap-3 mt-4">
                                                <button type="button" class="btn btn-light btn-label previestab" data-previous="v-pills-bill-info-tab">
                                                    <i class="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>
                                                    Kembali
                                                </button>
                                                <button type="button" class="btn btn-success btn-label right ms-auto nexttab nexttab" data-nexttab="v-pills-payment-tab">
                                                    <i class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Selanjutnya
                                                </button>
                                            </div>
                                        </div>
                                        <!-- end tab pane -->
                                        <div class="tab-pane fade" id="v-pills-payment" role="tabpanel" aria-labelledby="v-pills-payment-tab">
                                            <div>
                                                <h5>Konfirmasi</h5>
                                                <p class="text-muted">
                                                    Harap Konfirmasi Data dan Berkas Sebelum Disimpan.
                                                </p>
                                            </div>

                                            <div class="d-flex align-items-start gap-3 mt-4">
                                                <button type="button" class="btn btn-light btn-label previestab" data-previous="v-pills-bill-address-tab">
                                                    <i class="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>
                                                    Kembali
                                                </button>
                                                <button type="submit" class="btn btn-success btn-label right ms-auto nexttab nexttab" data-nexttab="v-pills-finish-tab">
                                                    <i class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                                                    Simpan
                                                </button>
                                            </div>
                                        </div>
                                        <!-- end tab pane -->
                                        <div class="tab-pane fade" id="v-pills-finish" role="tabpanel" aria-labelledby="v-pills-finish-tab">
                                            <div class="text-center pt-4 pb-2">
                                                <div class="mb-4">
                                                    <lottie colors="primary:#0ab39c,secondary:#405189" :options="defaultOptions" :height="120" :width="120" />
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
