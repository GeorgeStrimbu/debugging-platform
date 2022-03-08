<template>
  <div>
    <div class="MyContainer">
      <h1>Login as a student:</h1>
      <form @submit.prevent="addStudent">
        <div class="row">
          <div class="col-md-6 mb-0">
            <div class="form-group">
              <label class="space">Username:</label>
              <input
                type="text"
                class="form-control"
                placeholder="Username"
                v-model="user.username"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 mt-0">
            <div class="form-group">
              <label class="space">Room Number:</label>
              <input
                type="text"
                class="form-control"
                placeholder="Room Number"
                v-model="user.room"
              />
            </div>
          </div>
        </div>

        <div class="form-group">
          <button class="btn btn-primary moreUp">Continue</button>
        </div>
      </form>
      <br />
    </div>
    <!-- Error Alert -->
    <div class="error" v-if="showUsernameError">
      <svg xmlns="http://www.w3.org/2000/svg" style="display: none">
        <symbol
          id="exclamation-triangle-fill"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
          />
        </symbol>
      </svg>

      <div class="alert alert-danger d-flex align-items-center" role="alert">
        <svg
          class="bi flex-shrink-0 me-2"
          width="24"
          height="24"
          role="img"
          aria-label="Danger:"
        >
          <use xlink:href="#exclamation-triangle-fill" />
        </svg>
        <div>The Username you entered already exists in the databse.</div>
      </div>
    </div>

    <div class="error" v-if="showError">
      <svg xmlns="http://www.w3.org/2000/svg" style="display: none">
        <symbol
          id="exclamation-triangle-fill"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
          />
        </symbol>
      </svg>

      <div class="alert alert-danger d-flex align-items-center" role="alert">
        <svg
          class="bi flex-shrink-0 me-2"
          width="24"
          height="24"
          role="img"
          aria-label="Danger:"
        >
          <use xlink:href="#exclamation-triangle-fill" />
        </svg>
        <div>The Room Number you entered does not exist!</div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      user: {
        role: "Student",
        username: "",
      },
      showError: false,
      showUsernameError: false,
    };
  },
  methods: {
    addStudent() {
      let notfreeToCreateUsername = false;
      const urlUsernameExists = "http://localhost:4000/users/userExists";
      this.axios
        .get(urlUsernameExists, { params: { username: this.user.username } })
        .then((response) => {
          notfreeToCreateUsername = response.data.userExists;

          if (!notfreeToCreateUsername) {
            let freeToCreateStudent = false;
            const urlRoomExists = "http://localhost:4000/rooms/roomExists";
            this.axios
              .get(urlRoomExists, { params: { roomNumber: this.user.room } })
              .then((response) => {
                freeToCreateStudent = response.data.roomExists;

                if (freeToCreateStudent && !notfreeToCreateUsername) {
                  let uri = "http://localhost:4000/users/add";
                  this.axios
                    .post(uri, this.user)
                    .then((response) => {
                      localStorage.setItem(
                        "user",
                        JSON.stringify(response.data.user)
                      );
                      localStorage.setItem("jwt", response.data.token);

                      window.dispatchEvent(
                        new CustomEvent("user-localstorage-changed", {
                          detail: {
                            storage: localStorage.getItem("user"),
                          },
                        })
                      );

                      window.dispatchEvent(
                        new CustomEvent("loggedIn-changed", {
                          detail: {
                            storage: true,
                          },
                        })
                      );

                      if (localStorage.getItem("jwt") != null) {
                        this.$emit("loggedIn");
                        this.$router.push({ name: "questionslist" });
                      }
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                } else {
                  this.showError = true;
                }
              });
          } else {
            this.showUsernameError = true;
          }
        });
    },
  },
};
</script>

<style>
.space {
  margin: 0px 0px 5px 0px;
}

.moreUp {
  margin: 0px 0px 10px 0px;
}

.MyContainer div {
  margin: 10px auto;
  width: 50%;
}

.error div {
  margin: auto;
  width: 43%;
}
</style>