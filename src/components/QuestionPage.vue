<template>
  <div>
    <link
      rel="stylesheet"
      href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/styles/default.min.css"
    />

    <div class="card">
      <h6 class="card-header">{{ post.author }} asks:</h6>
      <div class="card-body">
        <h5 class="card-title">{{ post.title }}</h5>
        <p class="card-text">{{ post.body }}</p>
      </div>
    </div>
    <div v-if="post.sourceCode" class="card">
      <div class="card-body">
        <pre
          v-highlightjs="post.sourceCode"
        ><code class="javascript"></code></pre>
      </div>
    </div>
    <br />

    <div>
      <button @click="upvote" :class="{ upvoted: upvoted }">&uarr;</button>
      <span class="votes">{{ votes }}</span>
      <span> Upvotes </span>
    </div>

    <br />
    <div class="container02">
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label>Provide an answer:</label>
            <textarea
              class="form-control"
              v-model="reply.body"
              rows="5"
            ></textarea>
          </div>
        </div>
      </div>

      <div v-if="!sourceCodeBox" class="mt-4">
        <button type="button" class="btn btn-light" @click="showSourceCodeBox">
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
                placeholder="You can paste your Source Code here..."
                v-model="reply.sourceCode"
                rows="6"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <div class="form-group">
        <button class="btn btn-primary mt-5" @click="addReply">
          Submit Reply
        </button>
      </div>
    </div>
    <br />
    <div>
      <div v-for="(reply, index) in post.replies" :key="index">
        <div class="card">
          <div class="card-header">{{ reply.author }}:</div>
          <div class="card-body">
            <span
              v-if="reply.solvedTheIssue"
              class="badge rounded-pill bg-success mr-5"
            >
              Solved the issue
            </span>

            <span
              v-if="reply.approvedByTheTeacher"
              class="badge rounded-pill bg-primary"
            >
              Approved by the teacher
            </span>
            <p class="card-text">{{ reply.body }}</p>
            <div v-if="reply.sourceCode" class="card">
              <div class="card-body">
                <pre
                  v-highlightjs="reply.sourceCode"
                ><code class="javascript"></code></pre>
              </div>
            </div>
            <div>
              <button
                v-if="sameUser"
                type="button"
                class="btn"
                :class="
                  reply.solvedTheIssue ? 'btn-success' : 'btn-outline-success'
                "
                @click="solvedTheIssue(reply)"
              >
                Solved
              </button>
              <button
                v-if="isTeacher"
                type="button"
                class="btn"
                :class="
                  reply.approvedByTheTeacher
                    ? 'btn-primary'
                    : 'btn-outline-primary'
                "
                @click="approveThisReply(reply)"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {},
      reply: {},
      sourceCodeBox: false,
      clicked: false,
      upvoted: false,
      downvoted: false,
      postId: -1,
    };
  },
  created() {
    let uri = `http://localhost:4000/posts/postWithReplies/${this.$route.params.id}`;
    this.axios.get(uri).then((response) => {
      this.post = response.data;
      this.postId = this.$route.params.id;
      this.reply.parentPost = response.data._id;
    });
  },
  beforeDestroy() {
    this.post.upVotes = this.votes;
    this.updatePost();
  },
  methods: {
    updatePost() {
      let uri = `http://localhost:4000/posts/update/${this.postId}`;
      this.axios.post(uri, this.post).then(() => {
        this.$router.push({ name: "questionslist" });
      });
    },
    addReply() {
      let uri = "http://localhost:4000/QuestionPage/replies/add";
      const parsedJSONUser = JSON.parse(localStorage.getItem("user"));

      this.reply.author = parsedJSONUser.username;
      this.axios.post(uri, this.reply).then(() => {
        let uri = `http://localhost:4000/posts/postWithReplies/${this.$route.params.id}`;
        this.axios.get(uri).then((response) => {
          this.post = response.data;
          this.reply.parentPost = response.data._id;
        });
        this.reply = {};
      });
    },
    approveThisReply(reply) {
      reply.approvedByTheTeacher = !reply.approvedByTheTeacher;
      let uri = `http://localhost:4000/QuestionPage/replies/update/${reply._id}`;
      this.axios.post(uri, reply);
    },
    solvedTheIssue(reply) {
      reply.solvedTheIssue = !reply.solvedTheIssue;
      let uri = `http://localhost:4000/QuestionPage/replies/update/${reply._id}`;
      this.axios.post(uri, reply);
    },
    showSourceCodeBox() {
      this.sourceCodeBox = true;
    },
    updateUpVotes() {
      this.post.upVotes = this.votes;
    },
    upvote: function () {
      this.upvoted = !this.upvoted;
      this.downvoted = false;
    },
    downvote: function () {
      this.downvoted = !this.downvoted;
      this.upvoted = false;
    },
  },
  computed: {
    votes: function () {
      if (this.upvoted) {
        return this.post.upVotes + 1;
      } else if (this.downvoted) {
        return this.post.upVotes - 1;
      } else {
        return this.post.upVotes;
      }
    },
    isTeacher: function () {
      const parsedJSONUser = JSON.parse(localStorage.getItem("user"));
      let userType = parsedJSONUser.role;
      if (userType === "Teacher") {
        return true;
      } else {
        return false;
      }
    },
    sameUser: function () {
      const parsedJSONUser = JSON.parse(localStorage.getItem("user"));
      let userN = parsedJSONUser.username;
      if (userN === this.post.author) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style>
.container02 {
  margin: 10px auto;
  width: 80%;
}

ul {
  list-style-type: none;
  padding-left: 0;

  li + li {
    margin-top: 1em;
  }
}

button {
  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
}

.votes {
  display: inline-block;
  text-align: center;
  width: 1.5em;
}

.upvoted {
  background-color: #ff8b60;
  color: white;
}

.downvoted {
  background-color: #9494ff;
  color: white;
}

a {
  margin-left: 0.75em;
}
</style>