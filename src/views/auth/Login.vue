<template>
  <div>
    <div id="login">
      <h3 class="text-center text-white pt-5">Login form</h3>
      <div class="container">
        <div
          id="login-row"
          class="row justify-content-center align-items-center"
        >
          <div id="login-column" class="col-md-6">
            <div id="login-box" class="col-md-12">
              <form id="login-form" class="form" action="" method="post">
                <h3 class="text-center text-info">Login</h3>
                <form
                  class="login100-form validate-form"
                  id="form"
                  @submit.prevent="onSubmit($event)"
                >
                  <div class="form-group">
                    <label for="email" class="text-info">Email:</label><br />
                    <input
                      type="text"
                      name="username"
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

                    <button
                      type="submit"
                      name="submit"
                      id="submit"
                      class="btn btn-info btn-md login-form-btn"
                    >
                      Submit
                    </button>
                  </div>
                </form>
                <div id="register-link" class="text-right">
                  <router-link to="/register">Register Here</router-link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import { getRedirect, deleteRedirect } from "./../../utils/jwt";
const { mapState, mapActions } = createNamespacedHelpers("auth");
export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(["login"]),

    async onSubmit() {
      this.disableBtn("submit");
      this.login(this.form)
        .then(() => {
          if (getRedirect() == null) {
            this.$router.push("/");
          } else {
            this.$router.push(getRedirect()); //get last path or load the default path
            deleteRedirect(); //delete from storage after login
          }
        })
        .catch((error) => {
          this.enableBtn("submit");
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
  height: 100vh;
}
#login .container #login-row #login-column #login-box {
  margin-top: 120px;
  max-width: 600px;
  height: 320px;
  border: 1px solid #9c9c9c;
  background-color: #eaeaea;
}
#login .container #login-row #login-column #login-box #login-form {
  padding: 20px;
}
#login
  .container
  #login-row
  #login-column
  #login-box
  #login-form
  #register-link {
  margin-top: -85px;
}
</style>
