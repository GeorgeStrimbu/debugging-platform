<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#"></a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Startpage</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/questionslist" class="nav-link"
                >Questions</router-link
              >
            </li>
          </ul>
          <div v-if="this.loggedIn">
            <span class="badge bg-dark fs-6 me-2">
              Username: {{ user.username }}
            </span>
            <span class="badge bg-dark fs-6 me-2"> Room: {{ user.room }} </span>
            <button class="btn btn-outline-success" @click="logout()">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
    <br />
    <div class="container01">
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>


<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>

<script>
export default {
  name: "posts",
  data() {
    return {
      loggedIn: false,
      user: null,
    };
  },

  mounted() {
    window.addEventListener("user-localstorage-changed", (event) => {
      this.user = JSON.parse(event.detail.storage);
    });
    window.addEventListener("user-logout", (event) => {
      this.user = event.detail.storage;
    });
    if (!this.loggedIn) {
      window.addEventListener("loggedIn-changed", () => {
        this.loggedIn = true;
      });
    }
    if (localStorage.getItem("user")) {
      this.loggedIn = true;
      this.user = JSON.parse(localStorage.getItem("user"));
    } else {
      // eslint-disable-next-line
      console.log("");
    }
  },
  methods: {
    logout() {
      localStorage.clear();
      this.loggedIn = false;
      window.dispatchEvent(
        new CustomEvent("user-logout", {
          detail: {
            storage: "",
          },
        })
      );
      this.$router.push({ name: "startpage" });
    },
  },
};
</script>

<style>
.container01 {
  max-width: 1200px;
  margin: 0 auto;
}
</style>