<template>
  <div>
    <nav class="navbar navbar-expand-sm navbar-light bg-light">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo03"
        aria-controls="navbarTogglerDemo03"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item">
            <router-link to="/logout" tag="a" class="nav-link">
              <i class="fe fe-power"></i> Logout
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/" tag="a" class="nav-link">
              <i class="fe fe-power"></i> Boards
            </router-link>
          </li>

          <li class="nav-item">
            <a
              tag="a"
              @click="onSubmitDump($event)"
              id="dump-btn"
              class="nav-link"
            >
              <i class="fe fe-power"></i> Dump DB
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link"> | </a>
          </li>

          <li class="nav-item">
            <a class="nav-link"> Welcome {{ name }} </a>
          </li>
        </ul>
        <div class="social-part">
          <button class="btn">{{ email }}</button>
          <i class="fa fa-facebook" aria-hidden="true"></i>
          <i class="fa fa-twitter" aria-hidden="true"></i>
          <i class="fa fa-instagram" aria-hidden="true"></i>
        </div>
      </div>
    </nav>
    <!-- MAIN CONTENT START -->
    <keep-alive>
      <router-view :key="$route.fullPath" />
    </keep-alive>
    <!-- MAIN CONTENT END -->
  </div>
</template>
<script>
import { getUserEmail, getUserName } from "../utils/jwt";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("dump");

export default {
  name: "Board",
  data() {
    return {
      name: "",
      email: "",
    };
  },
  methods: {
    ...mapActions({
      dispatchDumpDB: "dumpDB",
    }),
    onSubmitDump() {
      this.disableBtn("dump-btn");
      this.dispatchDumpDB()
        .then(({ message, data }) => {
          this.enableBtn("dump-btn", "Dump DB");
          console.log(data);
          let fullPath = process.env.VUE_APP_API_BASE_URL + "/" + data.file;
          this.forceFileDownload(fullPath);
          alert(message);
        })
        .catch((error) => {
          this.enableBtn("dump-btn", "Dump DB");
          this.onError(error);
        });
    },
    forceFileDownload(url) {
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
    },
  },
  created() {
    this.email = getUserEmail();
    this.name = getUserName();
  },
  computed: {
    ...mapState(["status"]),
  },
};

// eslint-disable-next-line no-undef
$(document).ready(function () {
  // eslint-disable-next-line no-undef
  $(".navbar-light .dmenu").hover(
    function () {
      // eslint-disable-next-line no-undef
      $(this).find(".sm-menu").first().stop(true, true).slideDown(150);
    },
    function () {
      // eslint-disable-next-line no-undef
      $(this).find(".sm-menu").first().stop(true, true).slideUp(105);
    }
  );
});
</script>

<style scoped></style>
