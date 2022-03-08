<template>
  <div>
    <h4>Please choose what User Type you are:</h4>
    <div class="d-grid gap-2 col-5 mx-auto pt-2">
      <button class="btn btn-dark" type="button" @click.prevent="createTeacher">
        Teacher
      </button>

      <br />
      <h7>OR</h7>
      <br />

      <button class="btn btn-dark" type="button" @click.prevent="createStudent">
        Student
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
    };
  },
  methods: {
    createStudent() {
      this.$router.push({ name: "studentLogin" });
    },
    createTeacher() {
      this.$router.push({ name: "teacherLogin" });
    },
  },
};
</script>

<style>
h1 {
  text-align: center;
}
p {
  text-align: center;
}
div {
  text-align: center;
}
.down {
  margin: 0px 0px 30px 0px;
  
}

</style>