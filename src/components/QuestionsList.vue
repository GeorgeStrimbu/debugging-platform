<template>
  <div>
    <h1>Questions</h1>
    <div class="row">
      <div class="col-md-10"></div>
      <div class="col-md-2">
        <router-link :to="{ name: 'askquestion' }" class="btn btn-primary"
          >Ask a question</router-link
        >
      </div>
    </div>
    <br />

    <table class="table table-hover">
      <thead>
        <tr>
          <th style="width: 20%">Title</th>
          <th>Body</th>
          <th>Operations</th>
          <th>Upvotes</th>
        </tr>
      </thead>
      <tbody>
        <router-link
          tag="tr"
          :to="{ name: 'question', params: { id: post._id } }"
          v-for="(post, index) in posts"
          :key="post._id"
          role="button"
        >
          <td>
            <p v-snip="1">{{ post.title }}</p>
          </td>
          <td>
            <p v-snip="1">{{ post.body }}</p>
          </td>
          <td>
            <div class="center1">
              <td>
                <div v-if="postOfStudent(post)">
                  <router-link
                    :to="{ name: 'edit', params: { id: post._id } }"
                    class="btn btn-primary"
                    >Edit</router-link
                  >
                </div>
              </td>
              <td>
                <div v-if="postOfStudent(post)">
                  <button
                    class="btn btn-danger"
                    @click.prevent="deletePost(post._id, index)"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </div>
          </td>
          <td>{{ post.upVotes }}</td>
        </router-link>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
    };
  },
  computed: {
    postsInRoom: function () {
      let filtered = this.posts.filter(this.roomMatches);
      return filtered;
    },
  },
  created() {
    const parsedJSONUser = JSON.parse(localStorage.getItem("user"));
    const roomNumber = parsedJSONUser.room;
    let uri = `http://localhost:4000/posts/${roomNumber}`;
    this.axios.get(uri).then((response) => {
      this.posts = response.data;
    });
  },
  methods: {
    deletePost(id, index) {
      let uri = `http://localhost:4000/posts/delete/${id}`;
      // eslint-disable-next-line
      this.axios.delete(uri).then((response) => {
        this.posts.splice(index, 1);
      });
    },
    routeToPost(post) {
      this.$router.push({ name: "question", params: { id: post._id } });
    },
    roomMatches(post) {
      const parsedJSONUser = JSON.parse(localStorage.getItem("user"));
      let roomNumber = parsedJSONUser.room;
      return roomNumber === post.authRoom;
    },
    postOfStudent(post) {
      const parsedJSONUser = JSON.parse(localStorage.getItem("user"));
      let localStorageUser = parsedJSONUser.username;
      return (
        post.author === localStorageUser || parsedJSONUser.role === "Teacher"
      );
    },
  },
};
</script>

<style>
.center1 {
  display: flex;
  justify-content: center;
}
</style>