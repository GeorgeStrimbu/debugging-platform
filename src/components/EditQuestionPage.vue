<template>
  <div>
    <h1>Edit this question</h1>
    <form @submit.prevent="updatePost">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="form-group mt-4 mb-4">
            <label>Question Title: </label>
            <input type="text" class="form-control" v-model="post.title" />
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-10">
          <div class="form-group">
            <label>Question Body: </label>
            <textarea
              class="form-control"
              v-model="post.body"
              rows="7"
            ></textarea>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-10">
          <div class="form-group">
            <label>Source Code: </label>
            <textarea
              class="form-control"
              v-model="post.sourceCode"
              rows="7"
            ></textarea>
          </div>
        </div>
      </div>
      <br />
      <div class="form-group mt-4">
        <button class="btn btn-primary">Edit</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {},
    };
  },
  created() {
    let uri = `http://localhost:4000/posts/get/${this.$route.params.id}`;
    this.axios.get(uri).then((response) => {
      this.post = response.data;
    });
  },
  methods: {
    updatePost() {
      let uri = `http://localhost:4000/posts/update/${this.$route.params.id}`;
      this.axios.post(uri, this.post).then(() => {
        this.$router.push({ name: "questionslist" });
      });
    },
  },
};
</script>