<template>
  <div class="MyContainer">
    <div v-if="!roomCreated">
      <h1>Login as a teacher:</h1>
      <form @submit.prevent="addTeacher">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label class="down">Username:</label>
              <input type="text" class="form-control" v-model="user.username" />
            </div>
          </div>
        </div>
        <div></div>

        <div class="form-group">
          <button class="btn btn-primary up">Create your room</button>
        </div>
      </form>
    </div>
    <br />
    <h1 v-if="roomCreated">
      Your room number is: {{ user.room }}
      <br />
      <p>
        Please give this number to your students, so they can enter your room.
      </p>
      <button class="btn btn-primary" @click="continueToIndex">Continue</button>
    </h1>
  </div>
</template>

<script>
// eslint-disable-next-line
import ROLE from "../../api/roles";

export default {
  data() {
    return {
      user: {
        role: "Teacher",
        room: -1,
      },
      roomCreated: false,
    };
  },

  methods: {
    async addTeacher() {
      let freeToCreateRoom = false;

      while (!freeToCreateRoom) {
        let room = { number: this.getRandomInt(100000, 1000000) };
        const urlRoomExists = "http://localhost:4000/rooms/roomExists";

        let response = await this.axios.get(urlRoomExists, {
          params: { roomNumber: room.number },
        });
        let doesTheRoomAlreadyExist = response.data.roomExists;

        if (!doesTheRoomAlreadyExist) {
          freeToCreateRoom = true;
          let uri = "http://localhost:4000/rooms/add";
          // eslint-disable-next-line
          this.axios.post(uri, room).then((response) => {
            let uri2 = "http://localhost:4000/users/add";
            this.user.room = room.number;
            this.axios.post(uri2, this.user).then((response) => {
              this.roomCreated = true;
              localStorage.setItem("user", JSON.stringify(response.data.user));
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
              }
            });
          });
        }
      }
    },
    generateRoomNumber() {
      this.user.room = this.getRandomInt(100000, 1000000);
    },
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min);
    },
    continueToIndex() {
      this.$router.push({ name: "questionslist" });
    },
  },
};
</script>

<style>
.MyContainer div {
  margin: 10px auto;
  width: 60%;
}

.down {
  margin: 0px 0px 5px 0px;
}

.up {
  margin: 0px 0px 0px 0px;
}
</style>