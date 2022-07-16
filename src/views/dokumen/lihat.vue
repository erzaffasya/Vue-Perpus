<script>
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";

export default {
  data() {
    return {
      title: "Tabs",
      items: [
        {
          text: "Base UI",
          href: "/",
        },
        {
          text: "Tabs",
          active: true,
        },
      ],
    };
  },
  name: "Tabs",
  components: {
    Layout,
    PageHeader,
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
                <a class="nav-link" data-bs-toggle="tab" href="#nav-badge-home" role="tab" aria-selected="false">
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
                <a class="nav-link active" data-bs-toggle="tab" href="#nav-badge-settings" role="tab"
                  aria-selected="true">
                  Settings
                </a>
              </li>
            </ul>
            <!-- Nav tabs -->
            <div class="tab-content text-muted">
              <div class="tab-pane active" id="nav-badge-home" role="tabpanel">
                <div class="d-flex">
                  <div class="flex-shrink-0">
                    <i class="ri-checkbox-circle-fill text-success"></i>
                  </div>
                  <div class="flex-grow-1 ms-2">
                    Raw denim you probably haven't heard of them jean shorts Austin.
                    Nesciunt tofu stumptown aliqua, retro synth master cleanse.
                  </div>
                </div>
                <div class="d-flex mt-2">
                  <div class="flex-shrink-0">
                    <i class="ri-checkbox-circle-fill text-success"></i>
                  </div>
                  <div class="flex-grow-1 ms-2">
                    Too much or too little spacing, as in the example below, can make things unpleasant for the reader.
                    The goal is to make your text as comfortable to read as possible.
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