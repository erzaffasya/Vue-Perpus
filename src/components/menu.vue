<script>
import { layoutComputed } from "@/state/helpers";
import { SimpleBar } from "simplebar-vue3";

export default {
  components: { SimpleBar },
  data() {
    return {
      settings: {
        minScrollbarLength: 60,
      },
      role: this.$parent.role
    };
  },
  computed: {
    ...layoutComputed,
    layoutType: {
      get() {
        return this.$store ? this.$store.state.layout.layoutType : {} || {};
      },
    },
  },
  watch: {
    $route: {
      handler: "onRoutechange",
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    setTimeout(() => {
      if (document.querySelectorAll(".navbar-nav .collapse")) {
        let collapses = document.querySelectorAll(".navbar-nav .collapse");
        collapses.forEach((collapse) => {
          // Hide sibling collapses on `show.bs.collapse`
          collapse.addEventListener("show.bs.collapse", (e) => {
            e.stopPropagation();
            let closestCollapse = collapse.parentElement.closest(".collapse");
            if (closestCollapse) {
              let siblingCollapses =
                closestCollapse.querySelectorAll(".collapse");
              siblingCollapses.forEach((siblingCollapse) => {
                if (siblingCollapse.classList.contains("show")) {
                  siblingCollapse.classList.remove("show");
                }
              });
            } else {
              let getSiblings = (elem) => {
                // Setup siblings array and get the first sibling
                let siblings = [];
                let sibling = elem.parentNode.firstChild;
                // Loop through each sibling and push to the array
                while (sibling) {
                  if (sibling.nodeType === 1 && sibling !== elem) {
                    siblings.push(sibling);
                  }
                  sibling = sibling.nextSibling;
                }
                return siblings;
              };
              let siblings = getSiblings(collapse.parentElement);
              siblings.forEach((item) => {
                if (item.childNodes.length > 2)
                  item.firstElementChild.setAttribute("aria-expanded", "false");
                let ids = item.querySelectorAll("*[id]");
                ids.forEach((item1) => {
                  item1.classList.remove("show");
                  if (item1.childNodes.length > 2) {
                    let val = item1.querySelectorAll("ul li a");

                    val.forEach((subitem) => {
                      if (subitem.hasAttribute("aria-expanded"))
                        subitem.setAttribute("aria-expanded", "false");
                    });
                  }
                });
              });
            }
          });

          // Hide nested collapses on `hide.bs.collapse`
          collapse.addEventListener("hide.bs.collapse", (e) => {
            e.stopPropagation();
            let childCollapses = collapse.querySelectorAll(".collapse");
            childCollapses.forEach((childCollapse) => {
              let childCollapseInstance = childCollapse;
              childCollapseInstance.hide();
            });
          });
        });
      }
    }, 0);
  },
  methods: {
    onRoutechange(ele) {
      this.initActiveMenu(ele.path);
      setTimeout(() => {
        if (document.getElementsByClassName("mm-active").length > 0) {
          const currentPosition =
            document.getElementsByClassName("mm-active")[0].offsetTop;
          if (currentPosition > 500)
            if (this.$refs.isSimplebar)
              this.$refs.isSimplebar.value.getScrollElement().scrollTop =
                currentPosition + 300;
        }
      }, 300);
    },

    initActiveMenu(ele) {
      setTimeout(() => {
        if (document.querySelector("#navbar-nav")) {
          let a = document
            .querySelector("#navbar-nav")
            .querySelector('[href="' + ele + '"]');

          if (a) {
            a.classList.add("active");
            let parentCollapseDiv = a.closest(".collapse.menu-dropdown");
            if (parentCollapseDiv) {
              parentCollapseDiv.classList.add("show");
              parentCollapseDiv.parentElement.children[0].classList.add(
                "active"
              );
              parentCollapseDiv.parentElement.children[0].setAttribute(
                "aria-expanded",
                "true"
              );
              if (
                parentCollapseDiv.parentElement.closest(
                  ".collapse.menu-dropdown"
                )
              ) {
                parentCollapseDiv.parentElement
                  .closest(".collapse")
                  .classList.add("show");
                if (
                  parentCollapseDiv.parentElement.closest(".collapse")
                    .previousElementSibling
                )
                  parentCollapseDiv.parentElement
                    .closest(".collapse")
                    .previousElementSibling.classList.add("active");
              }
            }
          }
        }
      }, 1000);
    },
  },
};
</script>

<template>
  <div class="container-fluid">
    <div id="two-column-menu"></div>

    <template v-if="layoutType === 'twocolumn'">
      <SimpleBar class="navbar-nav" id="navbar-nav">
      
      </SimpleBar>
    </template>

    <template v-else>
      <ul class="navbar-nav h-100" id="navbar-nav">
        <li class="menu-title">
          <span data-key="t-menu"> {{ $t("Dashboard") }}</span>
        </li>
  
         <li class="nav-item">
          <router-link to="/" class="nav-link remove-sidebar custom-abc" data-key="t-dashboard">
            <i class="ri-honour-line"></i>
            <span data-key="t-widgets">{{ $t("Dashboard") }}</span>
          </router-link>
        </li>
        <!-- end Dashboard Menu -->

        <!-- Sidebar Kategori  -->
        <li class="menu-title">
          <i class="ri-more-fill"></i>
          <span data-key="kategori">{{ $t("admin") }}</span>
        </li>
        <li class="nav-item">
          <a class="nav-link menu-link" href="#kategori" data-bs-toggle="collapse" role="button" aria-expanded="false"
            aria-controls="sidebarDashboards">
            <i class="ri-dashboard-2-line"></i>
            <span data-key="t-dashboards"> {{ $t("Kategori") }}</span>
          </a>
          <div class="collapse menu-dropdown" id="kategori">
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <router-link to="/kategori/tambah" class="nav-link remove-sidebar custom-abc" data-key="t-tambahkategori">
                  {{ $t("Tambah Kategori") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/kategori/lihat" class="nav-link remove-sidebar custom-abc" data-key="t-lihatkategori">
                  {{ $t("Lihat Kategori") }}
                </router-link>
              </li>
            </ul>
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link menu-link" href="#dokumen" data-bs-toggle="collapse" role="button" aria-expanded="false"
            aria-controls="sidebarDashboards">
            <i class="ri-dashboard-2-line"></i>
            <span data-key="t-dashboards"> {{ $t("Dokumen") }}</span>
          </a>
          <div class="collapse menu-dropdown" id="dokumen">
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <router-link to="/dokumen/tambah" class="nav-link remove-sidebar custom-abc" data-key="t-tambahdokumen">
                  {{ $t("Tambah Dokumen") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/dokumen/lihat" class="nav-link remove-sidebar custom-abc" data-key="t-lihatdokumen">
                  {{ $t("Lihat Dokumen") }}
                </router-link>
              </li>
            </ul>
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link menu-link" href="#peminjaman-dokumen" data-bs-toggle="collapse" role="button"
            aria-expanded="false" aria-controls="sidebarDashboards">
            <i class="ri-dashboard-2-line"></i>
            <span data-key="t-dashboards"> {{ $t("Peminjaman Dokumen") }}</span>
          </a>
          <div class="collapse menu-dropdown" id="peminjaman-dokumen">
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <router-link to="/peminjaman-dokumen/tambah" class="nav-link remove-sidebar custom-abc"
                  data-key="t-tambahpeminjaman-dokumen">
                  {{ $t("Tambah Peminjaman Dokumen") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/peminjaman-dokumen/lihat" class="nav-link remove-sidebar custom-abc"
                  data-key="t-lihatpeminjaman-dokumen">
                  {{ $t("Lihat Peminjaman Dokumen") }}
                </router-link>
              </li>
            </ul>
          </div>
        </li>
        <!-- <li class="nav-item">
          <a class="nav-link menu-link" href="#bookmark" data-bs-toggle="collapse" role="button" aria-expanded="false"
            aria-controls="sidebarDashboards">
            <i class="ri-dashboard-2-line"></i>
            <span data-key="t-dashboards"> {{ $t("Bookmark") }}</span>
          </a>
          <div class="collapse menu-dropdown" id="bookmark">
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <router-link to="/bookmark/tambah" class="nav-link remove-sidebar custom-abc" data-key="t-tambahbookmark">
                  {{ $t("Tambah Bookmark") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/bookmark/lihat" class="nav-link remove-sidebar custom-abc" data-key="t-lihatbookmark">
                  {{ $t("Lihat Bookmark") }}
                </router-link>
              </li>
            </ul>
          </div>
        </li> -->
        
        <li class="nav-item">
          <router-link to="/bookmark/lihat" class="nav-link remove-sidebar custom-abc" data-key="t-lihatbookmark">
            <i class="ri-honour-line"></i>
            <span data-key="t-widgets">{{ $t("Bookmark") }}</span>
          </router-link>
        </li>

        <li class="menu-title">
          <i class="ri-more-fill"></i>
          <span data-key="t-Booking Ruangan">{{ $t("Booking Ruangan") }}</span>
        </li>

        <li class="nav-item">
          <a class="nav-link menu-link" href="#ruanganbaca" data-bs-toggle="collapse" role="button"
            aria-expanded="false" aria-controls="sidebarDashboards">
            <i class="ri-dashboard-2-line"></i>
            <span data-key="t-dashboards"> {{ $t("Ruangan") }}</span>
          </a>
          <div class="collapse menu-dropdown" id="ruanganbaca">
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <router-link to="/ruangan/tambah" class="nav-link remove-sidebar custom-abc" data-key="t-tambahruanganbaca">
                  {{ $t("Tambah Ruangan") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/ruangan/lihat" class="nav-link remove-sidebar custom-abc" data-key="t-lihatruanganbaca">
                  {{ $t("Lihat Ruangan") }}
                </router-link>
              </li>
            </ul>
          </div>
        </li>

        <li class="nav-item">
          <a class="nav-link menu-link" href="#peminjamanruangan" data-bs-toggle="collapse" role="button"
            aria-expanded="false" aria-controls="sidebarDashboards">
            <i class="ri-dashboard-2-line"></i>
            <span data-key="t-dashboards"> {{ $t("Peminjaman Ruangan") }}</span>
          </a>
          <div class="collapse menu-dropdown" id="peminjamanruangan">
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <router-link to="/peminjaman-ruangan/tambah" class="nav-link remove-sidebar custom-abc"
                  data-key="t-tambahpeminjamanruangan">
                  {{ $t("Tambah Peminjaman Ruangan") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/peminjaman-ruangan/lihat" class="nav-link remove-sidebar custom-abc"
                  data-key="t-lihatpeminjamanruangan">
                  {{ $t("Lihat Peminjaman Ruangan") }}
                </router-link>
              </li>
            </ul>
          </div>
        </li>
        
        <li class="menu-title">
          <i class="ri-more-fill"></i>
          <span data-key="t-pengunjung">{{ $t("pengunjung") }}</span>
        </li>

        <li class="nav-item">
          <a class="nav-link menu-link" href="#pengunjung" data-bs-toggle="collapse" role="button" aria-expanded="false"
            aria-controls="sidebarDashboards">
            <i class="ri-dashboard-2-line"></i>
            <span data-key="t-dashboards"> {{ $t("Pengunjung") }}</span>
          </a>
          <div class="collapse menu-dropdown" id="pengunjung">
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <router-link to="/pengunjung/tambah" class="nav-link remove-sidebar custom-abc" data-key="t-tambahpengunjung">
                  {{ $t("Tambah Pengunjung") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/pengunjung/lihat" class="nav-link remove-sidebar custom-abc" data-key="t-lihatpengunjung">
                  {{ $t("Lihat Pengunjung") }}
                </router-link>
              </li>
            </ul>
          </div>
        </li>
        
        <li class="nav-item">
          <router-link class="nav-link remove-sidebar menu-link" to="/qrcode-pengunjung">
            <i class="ri-honour-line"></i>
            <span data-key="t-widgets">{{ $t("Scan QRcode") }}</span>
          </router-link>
        </li>

        <li class="menu-title">
          <i class="ri-more-fill"></i>
          <span data-key="t-components">{{ $t("t-components") }}</span>
        </li>

        <li class="nav-item">
          <router-link class="nav-link remove-sidebar menu-link" to="/grid-dokumen">
            <i class="ri-honour-line"></i>
            <span data-key="t-widgets">{{ $t("Cari Dokumen") }}</span>
          </router-link>
        </li>


      </ul>
    </template>
  </div>
  <!-- Sidebar -->
</template>
