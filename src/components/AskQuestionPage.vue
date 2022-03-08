<template>
  <div>
    <div class="container02">
      <h1>Ask a question</h1>
      <form @submit.prevent="addPost">
        <div class="row pl-4 mb-4 mt-4 justify-content-center">
          <div class="col-md-8">
            <div class="form-group">
              <label>Question Title:</label>
              <input
                type="text"
                placeholder="Give your question a title"
                class="form-control trial"
                v-model="post.title"
              />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label>Question Body:</label>
              <textarea
                class="form-control trial"
                placeholder="Write your question in detail here"
                v-model="post.body"
                rows="6"
              ></textarea>
            </div>
          </div>
        </div>

        <div v-if="!sourceCodeBox" class="mt-4">
          <button
            type="button"
            class="btn btn-light"
            @click="showSourceCodeBox"
          >
            Add Source Code
          </button>
        </div>
        <div v-if="sourceCodeBox">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label>Source Code:</label>
                <textarea
                  class="form-control trial"
                  placeholder="You can paste your Source Code here"
                  v-model="post.sourceCode"
                  rows="6"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="form-group mt-5">
          <button class="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {},
      sourceCodeBox: false,
    };
  },
  methods: {
    addPost() {
      const parsedJSONUser = JSON.parse(localStorage.getItem("user"));
      this.post.author = parsedJSONUser.username;
      this.post.authRoom = parsedJSONUser.room;
      this.post.upVotes = 0;
      let uri = "http://localhost:4000/posts/add";
      this.axios.post(uri, this.post).then(() => {
        this.$router.push({ name: "questionslist" });
      });
    },
    showSourceCodeBox() {
      this.sourceCodeBox = true;
    },
  },
};
</script>

<style>
.wider {
  padding: 10px;
}

.trial {
  box-sizing: border-box;
  width: 100%;
}

.MyContainer {
}
</style>