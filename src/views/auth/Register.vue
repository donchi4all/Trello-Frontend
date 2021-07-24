<template>
  <div id="register">
    <h3 class="text-center text-white pt-5">register form</h3>
    <div class="container">
      <div
        id="register-row"
        class="row justify-content-center align-items-center"
      >
        <div id="register-column" class="col-md-6">
          <div id="register-box" class="col-md-12">
            <form id="register-form" class="form" action="" method="post">
              <h3 class="text-center text-info">Register</h3>
              <form
                class="login100-form validate-form"
                id="form"
                @submit.prevent="onSubmit($event)"
              >
                <div class="form-group">
                  <label for="name" class="text-info">Name:</label><br />
                  <input
                    type="text"
                    name="name"
                    required
                    v-model="form.name"
                    id="name"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <label for="email" class="text-info">Email:</label><br />
                  <input
                    type="text"
                    name="email"
                    required
                    v-model="form.email"
                    id="email"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <label for="password" class="text-info">Password:</label
                  ><br />
                  <input
                    type="password"
                    name="password"
                    required
                    v-model="form.password"
                    id="password"
                    class="form-control"
                  />
                </div>

                <div class="form-group">
                  <label for="remember-me" class="text-info"
                    ><span>Remember me</span
                    ><span
                      ><input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox" /></span></label
                  ><br />
                  <input
                    type="submit"
                    id="register-btn"
                    name="submit"
                    class="
                      btn btn-info btn-md
                      login100-form-btn
                      register-form-btn
                    "
                    value="submit"
                  />
                </div>
              </form>
              <div id="register-link" class="text-right">
                <router-link to="/">Login Here</router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("auth");
export default {
  name: "Register",
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(["register"]),
    async onSubmit() {
      if (
        this.form.name === "" &&
        this.form.email === "" &&
        this.form.password === ""
      )
        return alert("Kindly fill all the form.");
      this.disableBtn("register-btn");
      this.register(this.form)
        .then(({ message }) => {
          alert(message);
        })
        .catch((error) => {
          this.enableBtn("register-btn");
          this.onError(error);
        });
    },
  },
  computed: {
    ...mapState(["status"]),
  },
};
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  background-color: #17a2b8;
  height: 200vh;
}
#register .container #register-row #register-column #register-box {
  margin-top: 120px;
  max-width: 600px;
  height: 420px;
  border: 1px solid #9c9c9c;
  background-color: #eaeaea;
}
#register
  .container
  #register-row
  #register-column
  #register-box
  #register-form {
  padding: 20px;
}
#register
  .container
  #register-row
  #register-column
  #register-box
  #register-form
  #register-link {
  margin-top: -85px;
}
</style>
