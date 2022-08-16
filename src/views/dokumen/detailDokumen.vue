<script>
import Layout from "../../layouts/main.vue";
import appConfig from "../../../app.config";
import apiDokumen from "../../apis/Dokumen"
export default {
    props: {
        id: Object,
    },
    methods: {
        toggleFavourite(ele) {
            ele.target.closest('.favourite-btn').classList.toggle("active");
        },
        async getDokumen() {
            await apiDokumen.showDokumen(this.$route.params.id).then((response) => {
                this.dokumen = response.data.data;
            })
            // console.log(this.dokumen)
        }
    },
    page: {
        title: "Overview",
        meta: [{
            name: "description",
            content: appConfig.description
        }],
    },
    data() {
        return {
            title: "Overview",
            items: [{
                    text: "Pages",
                    href: "/",
                },
                {
                    text: "Overview",
                    active: true,
                },
            ],
            dokumen: {}
        };
    },
    components: {
        Layout
    },
    mounted() {
        this.getDokumen();
    },
    // created() {
    //     this.getDokumen();
    // },
};
</script>

<template>
<Layout>

    <div class="row">
        <div class="col-lg-12">
            <div class="card mt-n4 mx-n4">
                <div class="bg-soft-info">
                    <div class="card-body pb-0 px-4">
                        <div class="row mb-3">
                            <div class="col-md">
                                <div class="row align-items-center g-3">
                                    <div class="col-md-auto">
                                        <div class="avatar-md">
                                            <div class="avatar-title bg-white rounded-circle">
                                                <img src="@/assets/images/brands/slack.png" alt="" class="avatar-xs">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md">
                                        <div>
                                            <h4 class="fw-bold">{{ this.dokumen.judul }}</h4>
                                            <div class="hstack gap-3 flex-wrap">
                                                <div><i class="ri-building-line align-bottom me-1"></i>
                                                    {{ this.dokumen.jurusan }}
                                                </div>
                                                <div class="vr"></div>
                                                <div>Create Date : <span class="fw-semibold fs-15">{{
                                                            this.dokumen.tanggal_dibuat
                                                    }}</span>
                                                </div>
                                                <div class="vr"></div>
                                                <div>Due Date : <span class="fw-semibold fs-15">29 Dec, 2021</span>
                                                </div>
                                                <div class="vr"></div>
                                                <div class="badge rounded-pill bg-info fs-12">New</div>
                                                <div class="badge rounded-pill bg-danger fs-12">High</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-auto">
                                <div class="hstack gap-1 flex-wrap">
                                    <button type="button" class="btn py-0 fs-16 favourite-btn active">
                                        <i class="ri-star-fill" @click="toggleFavourite"></i>
                                    </button>
                                    <button type="button" class="btn py-0 fs-16 text-body">
                                        <i class="ri-share-line"></i>
                                    </button>
                                    <button type="button" class="btn py-0 fs-16 text-body">
                                        <i class="ri-flag-line"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <ul class="nav nav-tabs-custom border-bottom-0" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active fw-semibold" data-bs-toggle="tab" href="#project-overview" role="tab">
                                    Overview
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link fw-semibold" data-bs-toggle="tab" href="#project-documents" role="tab">
                                    Documents
                                </a>
                            </li>
                        </ul>
                    </div>
                    <!-- end card body -->
                </div>
            </div>
            <!-- end card -->
        </div>
        <!-- end col -->
    </div>
    <!-- end row -->
    <div class="row">
        <div class="col-lg-12">
            <div class="tab-content text-muted">
                <div class="tab-pane fade show active" id="project-overview" role="tabpanel">
                    <div class="row">
                        <div class="col-xl-12 col-lg-12">
                            <div class="card">
                                <div class="card-body">
                                    <div class="text-muted">
                                        <h6 class="mb-3 fw-semibold text-uppercase">Summary</h6>
                                        <p>It will be as simple as occidental in fact, it will be Occidental. To an
                                            English person, it will seem like simplified English, as a skeptical
                                            Cambridge friend of mine told me what Occidental is. The European
                                            languages are members of the same family. Their separate existence is a
                                            myth. For science, music, sport, etc, Europe uses the same vocabulary.
                                            The languages only differ in their grammar, their pronunciation and
                                            their most common words.</p>

                                        <ul class="ps-4 vstack gap-2">
                                            <li>Product Design, Figma (Software), Prototype</li>
                                            <li>Four Dashboards : Ecommerce, Analytics, Project,etc.</li>
                                            <li>Create calendar, chat and email app pages.</li>
                                            <li>Add authentication pages.</li>
                                            <li>Content listing.</li>
                                        </ul>

                                        <div>
                                            <button type="button" class="btn btn-link link-success p-0">Read
                                                more</button>
                                        </div>

                                        <div class="pt-3 border-top border-top-dashed mt-4">
                                            <div class="row">

                                                <div class="col-lg-3 col-sm-6">
                                                    <div>
                                                        <p class="mb-2 text-uppercase fw-semibold fs-13">Create Date
                                                            :</p>
                                                        <h5 class="fs-15 mb-0">15 Sep, 2021</h5>
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 col-sm-6">
                                                    <div>
                                                        <p class="mb-2 text-uppercase fw-semibold fs-13">Due Date :
                                                        </p>
                                                        <h5 class="fs-15 mb-0">29 Dec, 2021</h5>
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 col-sm-6">
                                                    <div>
                                                        <p class="mb-2 text-uppercase fw-semibold fs-13">Priority :
                                                        </p>
                                                        <div class="badge bg-danger fs-12">High</div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 col-sm-6">
                                                    <div>
                                                        <p class="mb-2 text-uppercase fw-semibold fs-13">Status :
                                                        </p>
                                                        <div class="badge bg-warning fs-12">Inprogess</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="pt-3 border-top border-top-dashed mt-4">
                                            <h6 class="mb-3 fw-semibold text-uppercase">Resources</h6>
                                            <div class="row g-3">
                                                <div class="col-xxl-4 col-lg-6">
                                                    <div class="border rounded border-dashed p-2">
                                                        <div class="d-flex align-items-center">
                                                            <div class="flex-shrink-0 me-3">
                                                                <div class="avatar-sm">
                                                                    <div class="avatar-title bg-light text-secondary rounded fs-24">
                                                                        <i class="ri-folder-zip-line"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="flex-grow-1 overflow-hidden">
                                                                <h5 class="fs-15 mb-1"><a href="#" class="text-body text-truncate d-block">App
                                                                        pages.zip</a></h5>
                                                                <div>2.2MB</div>
                                                            </div>
                                                            <div class="flex-shrink-0 ms-2">
                                                                <div class="d-flex gap-1">
                                                                    <button type="button" class="btn btn-icon text-muted btn-sm fs-18"><i class="ri-download-2-line"></i></button>
                                                                    <div class="dropdown">
                                                                        <button class="btn btn-icon text-muted btn-sm fs-18 dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                            <i class="ri-more-fill"></i>
                                                                        </button>
                                                                        <ul class="dropdown-menu">
                                                                            <li><a class="dropdown-item" href="#"><i class="ri-pencil-fill align-bottom me-2 text-muted"></i>
                                                                                    Rename</a></li>
                                                                            <li><a class="dropdown-item" href="#"><i class="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
                                                                                    Delete</a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- end col -->
                                                <div class="col-xxl-4 col-lg-6">
                                                    <div class="border rounded border-dashed p-2">
                                                        <div class="d-flex align-items-center">
                                                            <div class="flex-shrink-0 me-3">
                                                                <div class="avatar-sm">
                                                                    <div class="avatar-title bg-light text-secondary rounded fs-24">
                                                                        <i class="ri-file-ppt-2-line"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="flex-grow-1 overflow-hidden">
                                                                <h5 class="fs-15 mb-1"><a href="#" class="text-body text-truncate d-block">Velzon
                                                                        admin.ppt</a></h5>
                                                                <div>2.4MB</div>
                                                            </div>
                                                            <div class="flex-shrink-0 ms-2">
                                                                <div class="d-flex gap-1">
                                                                    <button type="button" class="btn btn-icon text-muted btn-sm fs-18"><i class="ri-download-2-line"></i></button>
                                                                    <div class="dropdown">
                                                                        <button class="btn btn-icon text-muted btn-sm fs-18 dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                            <i class="ri-more-fill"></i>
                                                                        </button>
                                                                        <ul class="dropdown-menu">
                                                                            <li><a class="dropdown-item" href="#"><i class="ri-pencil-fill align-bottom me-2 text-muted"></i>
                                                                                    Rename</a></li>
                                                                            <li><a class="dropdown-item" href="#"><i class="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
                                                                                    Delete</a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- end col -->
                                            </div>
                                            <!-- end row -->
                                        </div>
                                    </div>
                                </div>
                                <!-- end card body -->
                            </div>
                            <!-- end card -->

                            <!-- end card -->
                        </div>
                        <!-- ene col -->

                        <!-- end col -->
                    </div>
                    <!-- end row -->
                </div>
                <!-- end tab pane -->
                <div class="tab-pane fade" id="project-documents" role="tabpanel">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex align-items-center mb-4">
                                <h5 class="card-title flex-grow-1">Documents</h5>
                            </div>
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="table-responsive table-card">
                                        <table class="table table-borderless align-middle mb-0">
                                            <thead class="table-light">
                                                <tr>
                                                    <th scope="col">File Name</th>
                                                    <th scope="col">Type</th>
                                                    <th scope="col">Size</th>
                                                    <th scope="col">Upload Date</th>
                                                    <th scope="col" style="width: 120px;">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                <tr v-if="this.dokumen.cover">
                                                    <td>
                                                        <div class="d-flex align-items-center">
                                                            <div class="avatar-sm">
                                                                <div class="avatar-title bg-light text-danger rounded fs-24">
                                                                    <i class="ri-file-pdf-fill"></i>
                                                                </div>
                                                            </div>
                                                            <div class="ms-3 flex-grow-1">
                                                                <h5 class="fs-14 mb-0">
                                                                    <router-link :to="{ name: 'baca-dokumen', params: { id:id, jenisFile: 'cover' }}" class="text-dark">Cover
                                                                    </router-link>
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>PDF File</td>
                                                    <td>{{this.dokumen.cover.size}}</td>
                                                    <td>24 Nov 2021</td>
                                                    <td>
                                                        <div class="dropdown">
                                                            <a href="javascript:void(0);" class="btn btn-soft-secondary btn-sm btn-icon" data-bs-toggle="dropdown" aria-expanded="true">
                                                                <i class="ri-more-fill"></i>
                                                            </a>
                                                            <ul class="dropdown-menu dropdown-menu-end">
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-eye-fill me-2 align-bottom text-muted"></i>View</a>
                                                                </li>
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-download-2-fill me-2 align-bottom text-muted"></i>Download</a>
                                                                </li>
                                                                <li class="dropdown-divider"></li>
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-delete-bin-5-fill me-2 align-bottom text-muted"></i>Delete</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr v-if="this.dokumen.lembar_pengesahan">
                                                    <td>
                                                        <div class="d-flex align-items-center">
                                                            <div class="avatar-sm">
                                                                <div class="avatar-title bg-light text-danger rounded fs-24">
                                                                    <i class="ri-file-pdf-fill"></i>
                                                                </div>
                                                            </div>
                                                            <div class="ms-3 flex-grow-1">
                                                                <h5 class="fs-14 mb-0">
                                                                    <router-link :to="{ name: 'baca-dokumen', params: { id:id, jenisFile: 'lembar_pengesahan' }}" class="text-dark">Lembar Pengesahan
                                                                    </router-link>
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>PDF File</td>
                                                    <td>{{this.dokumen.lembar_pengesahan.size}}</td>
                                                    <td>24 Nov 2021</td>
                                                    <td>
                                                        <div class="dropdown">
                                                            <a href="javascript:void(0);" class="btn btn-soft-secondary btn-sm btn-icon" data-bs-toggle="dropdown" aria-expanded="true">
                                                                <i class="ri-more-fill"></i>
                                                            </a>
                                                            <ul class="dropdown-menu dropdown-menu-end">
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-eye-fill me-2 align-bottom text-muted"></i>View</a>
                                                                </li>
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-download-2-fill me-2 align-bottom text-muted"></i>Download</a>
                                                                </li>
                                                                <li class="dropdown-divider"></li>
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-delete-bin-5-fill me-2 align-bottom text-muted"></i>Delete</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr v-if="this.dokumen.kata_pengantar">
                                                    <td>
                                                        <div class="d-flex align-items-center">
                                                            <div class="avatar-sm">
                                                                <div class="avatar-title bg-light text-danger rounded fs-24">
                                                                    <i class="ri-file-pdf-fill"></i>
                                                                </div>
                                                            </div>
                                                            <div class="ms-3 flex-grow-1">
                                                                <h5 class="fs-14 mb-0">
                                                                    <router-link :to="{ name: 'baca-dokumen', params: { id:id, jenisFile: 'kata_pengantar' }}" class="text-dark">Kata Pengantar
                                                                    </router-link>
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>PDF File</td>
                                                    <td>{{this.dokumen.kata_pengantar.size}}</td>
                                                    <td>24 Nov 2021</td>
                                                    <td>
                                                        <div class="dropdown">
                                                            <a href="javascript:void(0);" class="btn btn-soft-secondary btn-sm btn-icon" data-bs-toggle="dropdown" aria-expanded="true">
                                                                <i class="ri-more-fill"></i>
                                                            </a>
                                                            <ul class="dropdown-menu dropdown-menu-end">
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-eye-fill me-2 align-bottom text-muted"></i>View</a>
                                                                </li>
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-download-2-fill me-2 align-bottom text-muted"></i>Download</a>
                                                                </li>
                                                                <li class="dropdown-divider"></li>
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-delete-bin-5-fill me-2 align-bottom text-muted"></i>Delete</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr v-if="this.dokumen.ringkasan">
                                                    <td>
                                                        <div class="d-flex align-items-center">
                                                            <div class="avatar-sm">
                                                                <div class="avatar-title bg-light text-danger rounded fs-24">
                                                                    <i class="ri-file-pdf-fill"></i>
                                                                </div>
                                                            </div>
                                                            <div class="ms-3 flex-grow-1">
                                                                <h5 class="fs-14 mb-0">
                                                                    <router-link :to="{ name: 'baca-dokumen', params: { id:id, jenisFile: 'ringkasan' }}" class="text-dark">Ringkasan
                                                                    </router-link>
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>PDF File</td>
                                                    <td>{{this.dokumen.ringkasan.size}}</td>
                                                    <td>24 Nov 2021</td>
                                                    <td>
                                                        <div class="dropdown">
                                                            <a href="javascript:void(0);" class="btn btn-soft-secondary btn-sm btn-icon" data-bs-toggle="dropdown" aria-expanded="true">
                                                                <i class="ri-more-fill"></i>
                                                            </a>
                                                            <ul class="dropdown-menu dropdown-menu-end">
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-eye-fill me-2 align-bottom text-muted"></i>View</a>
                                                                </li>
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-download-2-fill me-2 align-bottom text-muted"></i>Download</a>
                                                                </li>
                                                                <li class="dropdown-divider"></li>
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-delete-bin-5-fill me-2 align-bottom text-muted"></i>Delete</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr v-if="this.dokumen.daftar_isi">
                                                    <td>
                                                        <div class="d-flex align-items-center">
                                                            <div class="avatar-sm">
                                                                <div class="avatar-title bg-light text-danger rounded fs-24">
                                                                    <i class="ri-file-pdf-fill"></i>
                                                                </div>
                                                            </div>
                                                            <div class="ms-3 flex-grow-1">
                                                                <h5 class="fs-14 mb-0">
                                                                    <router-link :to="{ name: 'baca-dokumen', params: { id:id, jenisFile: 'daftar_isi' }}" class="text-dark">Daftar Isi
                                                                    </router-link>
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>PDF File</td>
                                                    <td>{{this.dokumen.daftar_isi.size}}</td>
                                                    <td>24 Nov 2021</td>
                                                    <td>
                                                        <div class="dropdown">
                                                            <a href="javascript:void(0);" class="btn btn-soft-secondary btn-sm btn-icon" data-bs-toggle="dropdown" aria-expanded="true">
                                                                <i class="ri-more-fill"></i>
                                                            </a>
                                                            <ul class="dropdown-menu dropdown-menu-end">
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-eye-fill me-2 align-bottom text-muted"></i>View</a>
                                                                </li>
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-download-2-fill me-2 align-bottom text-muted"></i>Download</a>
                                                                </li>
                                                                <li class="dropdown-divider"></li>
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-delete-bin-5-fill me-2 align-bottom text-muted"></i>Delete</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr v-if="this.dokumen.daftar_gambar">
                                                    <td>
                                                        <div class="d-flex align-items-center">
                                                            <div class="avatar-sm">
                                                                <div class="avatar-title bg-light text-danger rounded fs-24">
                                                                    <i class="ri-file-pdf-fill"></i>
                                                                </div>
                                                            </div>
                                                            <div class="ms-3 flex-grow-1">
                                                                <h5 class="fs-14 mb-0">
                                                                    <router-link :to="{ name: 'baca-dokumen', params: { id:id, jenisFile: 'daftar_gambar' }}" class="text-dark">Daftar Gambar
                                                                    </router-link>
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>PDF File</td>
                                                    <td>{{this.dokumen.daftar_gambar.size}}</td>
                                                    <td>24 Nov 2021</td>
                                                    <td>
                                                        <div class="dropdown">
                                                            <a href="javascript:void(0);" class="btn btn-soft-secondary btn-sm btn-icon" data-bs-toggle="dropdown" aria-expanded="true">
                                                                <i class="ri-more-fill"></i>
                                                            </a>
                                                            <ul class="dropdown-menu dropdown-menu-end">
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-eye-fill me-2 align-bottom text-muted"></i>View</a>
                                                                </li>
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-download-2-fill me-2 align-bottom text-muted"></i>Download</a>
                                                                </li>
                                                                <li class="dropdown-divider"></li>
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-delete-bin-5-fill me-2 align-bottom text-muted"></i>Delete</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr v-if="this.dokumen.daftar_tabel">
                                                    <td>
                                                        <div class="d-flex align-items-center">
                                                            <div class="avatar-sm">
                                                                <div class="avatar-title bg-light text-danger rounded fs-24">
                                                                    <i class="ri-file-pdf-fill"></i>
                                                                </div>
                                                            </div>
                                                            <div class="ms-3 flex-grow-1">
                                                                <h5 class="fs-14 mb-0">
                                                                    <router-link :to="{ name: 'baca-dokumen', params: { id:id, jenisFile: 'daftar_tabel' }}" class="text-dark">Daftar Tabel
                                                                    </router-link>
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>PDF File</td>
                                                    <td>{{this.dokumen.daftar_tabel.size}}</td>
                                                    <td>24 Nov 2021</td>
                                                    <td>
                                                        <div class="dropdown">
                                                            <a href="javascript:void(0);" class="btn btn-soft-secondary btn-sm btn-icon" data-bs-toggle="dropdown" aria-expanded="true">
                                                                <i class="ri-more-fill"></i>
                                                            </a>
                                                            <ul class="dropdown-menu dropdown-menu-end">
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-eye-fill me-2 align-bottom text-muted"></i>View</a>
                                                                </li>
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-download-2-fill me-2 align-bottom text-muted"></i>Download</a>
                                                                </li>
                                                                <li class="dropdown-divider"></li>
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-delete-bin-5-fill me-2 align-bottom text-muted"></i>Delete</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr v-if="this.dokumen.daftar_notasi">
                                                    <td>
                                                        <div class="d-flex align-items-center">
                                                            <div class="avatar-sm">
                                                                <div class="avatar-title bg-light text-danger rounded fs-24">
                                                                    <i class="ri-file-pdf-fill"></i>
                                                                </div>
                                                            </div>
                                                            <div class="ms-3 flex-grow-1">
                                                                <h5 class="fs-14 mb-0">
                                                                    <router-link :to="{ name: 'baca-dokumen', params: { id:id, jenisFile: 'daftar_notasi' }}" class="text-dark">Daftar Notasi
                                                                    </router-link>
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>PDF File</td>
                                                    <td>{{this.dokumen.daftar_notasi.size}}</td>
                                                    <td>24 Nov 2021</td>
                                                    <td>
                                                        <div class="dropdown">
                                                            <a href="javascript:void(0);" class="btn btn-soft-secondary btn-sm btn-icon" data-bs-toggle="dropdown" aria-expanded="true">
                                                                <i class="ri-more-fill"></i>
                                                            </a>
                                                            <ul class="dropdown-menu dropdown-menu-end">
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-eye-fill me-2 align-bottom text-muted"></i>View</a>
                                                                </li>
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-download-2-fill me-2 align-bottom text-muted"></i>Download</a>
                                                                </li>
                                                                <li class="dropdown-divider"></li>
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-delete-bin-5-fill me-2 align-bottom text-muted"></i>Delete</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr v-if="this.dokumen.abstract_en">
                                                    <td>
                                                        <div class="d-flex align-items-center">
                                                            <div class="avatar-sm">
                                                                <div class="avatar-title bg-light text-danger rounded fs-24">
                                                                    <i class="ri-file-pdf-fill"></i>
                                                                </div>
                                                            </div>
                                                            <div class="ms-3 flex-grow-1">
                                                                <h5 class="fs-14 mb-0">
                                                                    <router-link :to="{ name: 'baca-dokumen', params: { id:id, jenisFile: 'abstract_en' }}" class="text-dark">Abstract(EN)
                                                                    </router-link>
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>PDF File</td>
                                                    <td>{{this.dokumen.abstract_en.size}}</td>
                                                    <td>24 Nov 2021</td>
                                                    <td>
                                                        <div class="dropdown">
                                                            <a href="javascript:void(0);" class="btn btn-soft-secondary btn-sm btn-icon" data-bs-toggle="dropdown" aria-expanded="true">
                                                                <i class="ri-more-fill"></i>
                                                            </a>
                                                            <ul class="dropdown-menu dropdown-menu-end">
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-eye-fill me-2 align-bottom text-muted"></i>View</a>
                                                                </li>
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-download-2-fill me-2 align-bottom text-muted"></i>Download</a>
                                                                </li>
                                                                <li class="dropdown-divider"></li>
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-delete-bin-5-fill me-2 align-bottom text-muted"></i>Delete</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr v-if="this.dokumen.abstract_id">
                                                    <td>
                                                        <div class="d-flex align-items-center">
                                                            <div class="avatar-sm">
                                                                <div class="avatar-title bg-light text-danger rounded fs-24">
                                                                    <i class="ri-file-pdf-fill"></i>
                                                                </div>
                                                            </div>
                                                            <div class="ms-3 flex-grow-1">
                                                                <h5 class="fs-14 mb-0">
                                                                    <router-link :to="{ name: 'baca-dokumen', params: { id:id, jenisFile: 'abstract_id' }}" class="text-dark">Abstract(ID)
                                                                    </router-link>
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>PDF File</td>
                                                    <td>{{this.dokumen.abstract_id.size}}</td>
                                                    <td>24 Nov 2021</td>
                                                    <td>
                                                        <div class="dropdown">
                                                            <a href="javascript:void(0);" class="btn btn-soft-secondary btn-sm btn-icon" data-bs-toggle="dropdown" aria-expanded="true">
                                                                <i class="ri-more-fill"></i>
                                                            </a>
                                                            <ul class="dropdown-menu dropdown-menu-end">
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-eye-fill me-2 align-bottom text-muted"></i>View</a>
                                                                </li>
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-download-2-fill me-2 align-bottom text-muted"></i>Download</a>
                                                                </li>
                                                                <li class="dropdown-divider"></li>
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-delete-bin-5-fill me-2 align-bottom text-muted"></i>Delete</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr v-if="this.dokumen.bab1">
                                                    <td>
                                                        <div class="d-flex align-items-center">
                                                            <div class="avatar-sm">
                                                                <div class="avatar-title bg-light text-danger rounded fs-24">
                                                                    <i class="ri-file-pdf-fill"></i>
                                                                </div>
                                                            </div>
                                                            <div class="ms-3 flex-grow-1">
                                                                <h5 class="fs-14 mb-0">
                                                                    <router-link :to="{ name: 'baca-dokumen', params: { id:id, jenisFile: 'bab1' }}" class="text-dark">BAB 1
                                                                    </router-link>
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>PDF File</td>
                                                    <td>{{this.dokumen.bab1.size}}</td>
                                                    <td>24 Nov 2021</td>
                                                    <td>
                                                        <div class="dropdown">
                                                            <a href="javascript:void(0);" class="btn btn-soft-secondary btn-sm btn-icon" data-bs-toggle="dropdown" aria-expanded="true">
                                                                <i class="ri-more-fill"></i>
                                                            </a>
                                                            <ul class="dropdown-menu dropdown-menu-end">
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-eye-fill me-2 align-bottom text-muted"></i>View</a>
                                                                </li>
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-download-2-fill me-2 align-bottom text-muted"></i>Download</a>
                                                                </li>
                                                                <li class="dropdown-divider"></li>
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-delete-bin-5-fill me-2 align-bottom text-muted"></i>Delete</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr v-if="this.dokumen.bab2">
                                                    <td>
                                                        <div class="d-flex align-items-center">
                                                            <div class="avatar-sm">
                                                                <div class="avatar-title bg-light text-danger rounded fs-24">
                                                                    <i class="ri-file-pdf-fill"></i>
                                                                </div>
                                                            </div>
                                                            <div class="ms-3 flex-grow-1">
                                                                <h5 class="fs-14 mb-0">
                                                                    <router-link :to="{ name: 'baca-dokumen', params: { id:id, jenisFile: 'bab2' }}" class="text-dark">BAB 2
                                                                    </router-link>
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>PDF File</td>
                                                    <td>{{this.dokumen.bab2.size}}</td>
                                                    <td>24 Nov 2021</td>
                                                    <td>
                                                        <div class="dropdown">
                                                            <a href="javascript:void(0);" class="btn btn-soft-secondary btn-sm btn-icon" data-bs-toggle="dropdown" aria-expanded="true">
                                                                <i class="ri-more-fill"></i>
                                                            </a>
                                                            <ul class="dropdown-menu dropdown-menu-end">
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-eye-fill me-2 align-bottom text-muted"></i>View</a>
                                                                </li>
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-download-2-fill me-2 align-bottom text-muted"></i>Download</a>
                                                                </li>
                                                                <li class="dropdown-divider"></li>
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-delete-bin-5-fill me-2 align-bottom text-muted"></i>Delete</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr v-if="this.dokumen.bab3">
                                                    <td>
                                                        <div class="d-flex align-items-center">
                                                            <div class="avatar-sm">
                                                                <div class="avatar-title bg-light text-danger rounded fs-24">
                                                                    <i class="ri-file-pdf-fill"></i>
                                                                </div>
                                                            </div>
                                                            <div class="ms-3 flex-grow-1">
                                                                <h5 class="fs-14 mb-0">
                                                                    <router-link :to="{ name: 'baca-dokumen', params: { id:id, jenisFile: 'bab3' }}" class="text-dark">BAB 3
                                                                    </router-link>
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>PDF File</td>
                                                    <td>{{this.dokumen.bab3.size}}</td>
                                                    <td>24 Nov 2021</td>
                                                    <td>
                                                        <div class="dropdown">
                                                            <a href="javascript:void(0);" class="btn btn-soft-secondary btn-sm btn-icon" data-bs-toggle="dropdown" aria-expanded="true">
                                                                <i class="ri-more-fill"></i>
                                                            </a>
                                                            <ul class="dropdown-menu dropdown-menu-end">
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-eye-fill me-2 align-bottom text-muted"></i>View</a>
                                                                </li>
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-download-2-fill me-2 align-bottom text-muted"></i>Download</a>
                                                                </li>
                                                                <li class="dropdown-divider"></li>
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-delete-bin-5-fill me-2 align-bottom text-muted"></i>Delete</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr v-if="this.dokumen.bab4">
                                                    <td>
                                                        <div class="d-flex align-items-center">
                                                            <div class="avatar-sm">
                                                                <div class="avatar-title bg-light text-danger rounded fs-24">
                                                                    <i class="ri-file-pdf-fill"></i>
                                                                </div>
                                                            </div>
                                                            <div class="ms-3 flex-grow-1">
                                                                <h5 class="fs-14 mb-0">
                                                                    <router-link :to="{ name: 'baca-dokumen', params: { id:id, jenisFile: 'bab4' }}" class="text-dark">BAB 4
                                                                    </router-link>
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>PDF File</td>
                                                    <td>{{this.dokumen.bab4.size}}</td>
                                                    <td>24 Nov 2021</td>
                                                    <td>
                                                        <div class="dropdown">
                                                            <a href="javascript:void(0);" class="btn btn-soft-secondary btn-sm btn-icon" data-bs-toggle="dropdown" aria-expanded="true">
                                                                <i class="ri-more-fill"></i>
                                                            </a>
                                                            <ul class="dropdown-menu dropdown-menu-end">
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-eye-fill me-2 align-bottom text-muted"></i>View</a>
                                                                </li>
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-download-2-fill me-2 align-bottom text-muted"></i>Download</a>
                                                                </li>
                                                                <li class="dropdown-divider"></li>
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-delete-bin-5-fill me-2 align-bottom text-muted"></i>Delete</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr v-if="this.dokumen.kesimpulan">
                                                    <td>
                                                        <div class="d-flex align-items-center">
                                                            <div class="avatar-sm">
                                                                <div class="avatar-title bg-light text-danger rounded fs-24">
                                                                    <i class="ri-file-pdf-fill"></i>
                                                                </div>
                                                            </div>
                                                            <div class="ms-3 flex-grow-1">
                                                                <h5 class="fs-14 mb-0">
                                                                    <router-link :to="{ name: 'baca-dokumen', params: { id:id, jenisFile: 'kesimpulan' }}" class="text-dark">Kesimpulan
                                                                    </router-link>
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>PDF File</td>
                                                    <td>{{this.dokumen.kesimpulan.size}}</td>
                                                    <td>24 Nov 2021</td>
                                                    <td>
                                                        <div class="dropdown">
                                                            <a href="javascript:void(0);" class="btn btn-soft-secondary btn-sm btn-icon" data-bs-toggle="dropdown" aria-expanded="true">
                                                                <i class="ri-more-fill"></i>
                                                            </a>
                                                            <ul class="dropdown-menu dropdown-menu-end">
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-eye-fill me-2 align-bottom text-muted"></i>View</a>
                                                                </li>
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-download-2-fill me-2 align-bottom text-muted"></i>Download</a>
                                                                </li>
                                                                <li class="dropdown-divider"></li>
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-delete-bin-5-fill me-2 align-bottom text-muted"></i>Delete</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr v-if="this.dokumen.daftar_pustaka">
                                                    <td>
                                                        <div class="d-flex align-items-center">
                                                            <div class="avatar-sm">
                                                                <div class="avatar-title bg-light text-danger rounded fs-24">
                                                                    <i class="ri-file-pdf-fill"></i>
                                                                </div>
                                                            </div>
                                                            <div class="ms-3 flex-grow-1">
                                                                <h5 class="fs-14 mb-0">
                                                                    <router-link :to="{ name: 'baca-dokumen', params: { id:id, jenisFile: 'daftar_pustaka' }}" class="text-dark">Daftar Pustaka
                                                                    </router-link>
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>PDF File</td>
                                                    <td>{{this.dokumen.daftar_pustaka.size}}</td>
                                                    <td>24 Nov 2021</td>
                                                    <td>
                                                        <div class="dropdown">
                                                            <a href="javascript:void(0);" class="btn btn-soft-secondary btn-sm btn-icon" data-bs-toggle="dropdown" aria-expanded="true">
                                                                <i class="ri-more-fill"></i>
                                                            </a>
                                                            <ul class="dropdown-menu dropdown-menu-end">
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-eye-fill me-2 align-bottom text-muted"></i>View</a>
                                                                </li>
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-download-2-fill me-2 align-bottom text-muted"></i>Download</a>
                                                                </li>
                                                                <li class="dropdown-divider"></li>
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-delete-bin-5-fill me-2 align-bottom text-muted"></i>Delete</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr v-if="this.dokumen.lampiran">
                                                    <td>
                                                        <div class="d-flex align-items-center">
                                                            <div class="avatar-sm">
                                                                <div class="avatar-title bg-light text-danger rounded fs-24">
                                                                    <i class="ri-file-pdf-fill"></i>
                                                                </div>
                                                            </div>
                                                            <div class="ms-3 flex-grow-1">
                                                                <h5 class="fs-14 mb-0">
                                                                    <router-link :to="{ name: 'baca-dokumen', params: { id:id, jenisFile: 'lampiran' }}" class="text-dark">Lampiran
                                                                    </router-link>
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>PDF File</td>
                                                    <td>{{this.dokumen.lampiran.size}}</td>
                                                    <td>24 Nov 2021</td>
                                                    <td>
                                                        <div class="dropdown">
                                                            <a href="javascript:void(0);" class="btn btn-soft-secondary btn-sm btn-icon" data-bs-toggle="dropdown" aria-expanded="true">
                                                                <i class="ri-more-fill"></i>
                                                            </a>
                                                            <ul class="dropdown-menu dropdown-menu-end">
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-eye-fill me-2 align-bottom text-muted"></i>View</a>
                                                                </li>
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-download-2-fill me-2 align-bottom text-muted"></i>Download</a>
                                                                </li>
                                                                <li class="dropdown-divider"></li>
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-delete-bin-5-fill me-2 align-bottom text-muted"></i>Delete</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr v-if="this.dokumen.paper">
                                                    <td>
                                                        <div class="d-flex align-items-center">
                                                            <div class="avatar-sm">
                                                                <div class="avatar-title bg-light text-danger rounded fs-24">
                                                                    <i class="ri-file-pdf-fill"></i>
                                                                </div>
                                                            </div>
                                                            <div class="ms-3 flex-grow-1">
                                                                <h5 class="fs-14 mb-0">
                                                                    <router-link :to="{ name: 'baca-dokumen', params: { id:id, jenisFile: 'paper' }}" class="text-dark">Paper
                                                                    </router-link>
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>PDF File</td>
                                                    <td>{{this.dokumen.paper.size}}</td>
                                                    <td>24 Nov 2021</td>
                                                    <td>
                                                        <div class="dropdown">
                                                            <a href="javascript:void(0);" class="btn btn-soft-secondary btn-sm btn-icon" data-bs-toggle="dropdown" aria-expanded="true">
                                                                <i class="ri-more-fill"></i>
                                                            </a>
                                                            <ul class="dropdown-menu dropdown-menu-end">
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-eye-fill me-2 align-bottom text-muted"></i>View</a>
                                                                </li>
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-download-2-fill me-2 align-bottom text-muted"></i>Download</a>
                                                                </li>
                                                                <li class="dropdown-divider"></li>
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-delete-bin-5-fill me-2 align-bottom text-muted"></i>Delete</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr v-if="this.dokumen.lembar_persetujuan">
                                                    <td>
                                                        <div class="d-flex align-items-center">
                                                            <div class="avatar-sm">
                                                                <div class="avatar-title bg-light text-danger rounded fs-24">
                                                                    <i class="ri-file-pdf-fill"></i>
                                                                </div>
                                                            </div>
                                                            <div class="ms-3 flex-grow-1">
                                                                <h5 class="fs-14 mb-0">
                                                                    <router-link :to="{ name: 'baca-dokumen', params: { id:id, jenisFile: 'lembar_persetujuan' }}" class="text-dark">Lembar Persetujuan
                                                                    </router-link>
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>PDF File</td>
                                                    <td>{{this.dokumen.lembar_persetujuan.size}}</td>
                                                    <td>24 Nov 2021</td>
                                                    <td>
                                                        <div class="dropdown">
                                                            <a href="javascript:void(0);" class="btn btn-soft-secondary btn-sm btn-icon" data-bs-toggle="dropdown" aria-expanded="true">
                                                                <i class="ri-more-fill"></i>
                                                            </a>
                                                            <ul class="dropdown-menu dropdown-menu-end">
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-eye-fill me-2 align-bottom text-muted"></i>View</a>
                                                                </li>
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-download-2-fill me-2 align-bottom text-muted"></i>Download</a>
                                                                </li>
                                                                <li class="dropdown-divider"></li>
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-delete-bin-5-fill me-2 align-bottom text-muted"></i>Delete</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr v-if="this.dokumen.full_dokumen">
                                                    <td>
                                                        <div class="d-flex align-items-center">
                                                            <div class="avatar-sm">
                                                                <div class="avatar-title bg-light text-danger rounded fs-24">
                                                                    <i class="ri-file-pdf-fill"></i>
                                                                </div>
                                                            </div>
                                                            <div class="ms-3 flex-grow-1">
                                                                <h5 class="fs-14 mb-0">
                                                                    <router-link :to="{ name: 'baca-dokumen', params: { id:id, jenisFile: 'full_dokumen' }}" class="text-dark">Full Dokumen
                                                                    </router-link>
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>PDF File</td>
                                                    <td>{{this.dokumen.full_dokumen.size}}</td>
                                                    <td>24 Nov 2021</td>
                                                    <td>
                                                        <div class="dropdown">
                                                            <a href="javascript:void(0);" class="btn btn-soft-secondary btn-sm btn-icon" data-bs-toggle="dropdown" aria-expanded="true">
                                                                <i class="ri-more-fill"></i>
                                                            </a>
                                                            <ul class="dropdown-menu dropdown-menu-end">
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-eye-fill me-2 align-bottom text-muted"></i>View</a>
                                                                </li>
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-download-2-fill me-2 align-bottom text-muted"></i>Download</a>
                                                                </li>
                                                                <li class="dropdown-divider"></li>
                                                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-delete-bin-5-fill me-2 align-bottom text-muted"></i>Delete</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <!-- <div class="text-center mt-3">n
                                        <a href="javascript:void(0);" class="text-success "><i class="mdi mdi-loading mdi-spin fs-20 align-middle me-2"></i> Load
                                            more </a>
                                    </div> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end tab pane -->

                <!-- end tab pane -->

                <!-- end tab pane -->
            </div>
        </div>
        <!-- end col -->
    </div>
    <!-- end row -->
</Layout>
</template>
