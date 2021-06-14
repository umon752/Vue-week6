<template>
  <div class="container">
    <div class="row justify-content-center vh-100 align-items-center">
      <div class="col-md-8 col-lg-4">
        <div class="row bg-white shadow">
          <div class="col px-5 py-4">
            <h1 class="h5 text-center text-muted fw-bold mb-4">Login</h1>
            <Form v-slot="{ errors }" @submit="signIn" ref="form" class="form-signin mb-4">
              <div class="mb-3">
                <label
                  for="email"
                  class="font-size-sm text-muted fw-bold mb-1"
                  >Email</label
                >
                <Field
              id="email"
              name="信箱"
              type="email"
              class="border-0 border-primary
                    text-secondary
                    border-bottom
                    w-100
                    p-1"
              :class="{ 'is-invalid': errors['信箱'] }"
              placeholder="請輸入 Email"
              rules="email|required"
              v-model.trim="userObj.username"
            ></Field>
            <error-message
              name="信箱"
              class="invalid-feedback"
            ></error-message>
              </div>
              <div class="mb-5">
                <label
                  for="password"
                  class="font-size-sm text-muted fw-bold mb-1"
                  >Password</label
                >
                <div
                  class="d-flex flex-wrap p-1"
                >
                <Field
              id="password"
              name="密碼"
              :type="passwordStatus"
              class="border-0 border-primary text-secondary border-bottom w-90"
              :class="{ 'is-invalid': errors['密碼'] }"
              placeholder="請輸入密碼"
              rules="required"
              v-model.trim="userObj.password"
            ></Field>
                  <a href="#" @click.prevent="changePasswordStatus">
                    <span
                      class="material-icons"
                      v-if="passwordStatus === 'password'"
                    >
                      visibility_off
                    </span>
                    <span class="material-icons" v-else> visibility </span>
                  </a>
            <error-message
              name="密碼"
              class="invalid-feedback w-100"
            ></error-message>
                </div>
              </div>
              <button
                class="
                  btn btn-lg btn-primary btn-sm
                  rounded-pill
                  text-white
                  w-100
                "
                type="submit"
              >
                Login
              </button>
            </Form>
            <p class="text-center text-muted font-size-sm">
              &copy; 2021~∞ - 六角學院
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userObj: {
        username: '',
        password: '',
      },
      passwordStatus: 'password',
      cookie: {
        token: '',
        expired: '',
      },
    };
  },
  methods: {
    changePasswordStatus() {
      if (this.passwordStatus === 'password') {
        this.passwordStatus = 'current-password';
      } else {
        this.passwordStatus = 'password';
      }
    },
    signIn() {
      const url = `${process.env.VUE_APP_API}/admin/signin`;
      this.$emit('loadingStatus', true);
      this.$http
        .post(url, this.userObj)
        .then((res) => {
          if (res.data.success) {
            console.log(res.data);
            // 顯示訊息
            this.$emit('resMessage', res.data.message);
            // 轉址到 admin.html
            this.$router.push('/dashboard');
            this.cookie.token = res.data.token;
            this.cookie.expired = res.data.expired;
            // 將 token 存入 cookie 內
            document.cookie = `hexToken=${
              this.cookie.token
            }; expires=${new Date(this.cookie.expired)}`;
          } else {
            // 顯示訊息
            this.$emit('resMessage', res.data.message);
          }
          // 清除表單
          this.$refs.form.resetForm();
          this.$emit('loadingStatus', false);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
