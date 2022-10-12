<script>
import { layoutComputed } from "@/state/helpers";

import Vertical from "./vertical";
import apiProfile from "../apis/Auth";
// import Horizontal from "./horizontal";
// import TwoColumns from "./twocolumn";

export default {
  components: {
    Vertical,
    // Horizontal,
    // TwoColumns
  },
  setup() {
    function getProfile() {
      apiProfile
        .getUser()
        .then((response) => {
          this.user = response.data.data;
          console.log(this.user, "kepala");
          this.isLoad = true;
        })
        .catch((error) => {
          console.log(error, "error");
          this.$router.push("/logout");
        });
    }
    return {
      getProfile,
    };
  },
  data() {
    return {
      user: {},
      isLoad: false,
      role: null,
    };
  },

  methods: {},
  computed: {
    ...layoutComputed,
  },
  created() {
    this.getProfile();
    if (localStorage.user) {
      const test = JSON.parse(localStorage.user);
      this.role = test.user.role;
    }
  },
  mounted() {},
};
</script>

<template>
  <div>
    <Vertical :layout="layoutType">
      <slot />
    </Vertical>

    <!-- <Horizontal v-if="layoutType === 'horizontal'" :layout="layoutType">
        <slot />
    </Horizontal>

    <TwoColumns v-if="layoutType === 'twocolumn'" :layout="layoutType">
        <slot />
    </TwoColumns> -->
  </div>
</template>
