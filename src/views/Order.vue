<template>
  <div class="container py-5" data-aos="fade-up">
      <h2 class="h4 text-dark text-center text-primary-dark mb-4">
        填寫訂單資料
      </h2>
      <div class="row justify-content-center">
        <Form v-slot="{ errors }" @submit="sendOrder" ref="form" class="col-10 col-md-6">
          <div class="form-group mb-3">
            <label for="email" class="mb-1">Email</label>
            <Field
              id="email"
              name="email"
              type="email"
              class="form-control mb-1"
              :class="{ 'is-invalid': errors['email'] }"
              placeholder="請輸入 Email"
              rules="email|required"
              v-model.trim="orderData.user.email"
            ></Field>
            <error-message
              name="email"
              class="invalid-feedback"
            ></error-message>
          </div>
          <div class="form-group mb-3">
            <label for="name" class="mb-1">收件人姓名</label>
            <Field
              id="name"
              name="姓名"
              type="text"
              class="form-control mb-1"
              :class="{ 'is-invalid': errors['姓名'] }"
              placeholder="請輸入姓名"
              rules="required"
              v-model.trim="orderData.user.name"
            ></Field>
            <error-message name="姓名" class="invalid-feedback"></error-message>
            <div class="font-size-sm text-primary"></div>
          </div>
          <div class="form-group mb-3">
            <label for="tel" class="mb-1">收件人電話</label>
            <Field
              id="tel"
              name="電話"
              type="tel"
              class="form-control mb-1"
              :class="{ 'is-invalid': errors['電話'] }"
              placeholder="請輸入電話"
              rules="min:8|required"
              v-model.trim="orderData.user.tel"
            ></Field>
            <error-message name="電話" class="invalid-feedback"></error-message>
          </div>
          <div class="form-group mb-3">
            <label for="address" class="mb-1">收件人地址</label>
            <Field
              id="address"
              name="寄送地址"
              type="text"
              class="form-control mb-1"
              :class="{ 'is-invalid': errors['寄送地址'] }"
              placeholder="請輸入寄送地址"
              rules="required"
              v-model.trim="orderData.user.address"
            ></Field>
            <error-message
              name="寄送地址"
              class="invalid-feedback"
            ></error-message>
          </div>
          <div class="form-group mb-5">
            <label for="message">留言</label>
            <textarea
              class="form-control"
              placeholder="請輸入留言"
              id="message"
              style="height: 100px"
              v-model.trim="orderData.message"
            ></textarea>
          </div>
          <div class="d-flex">
            <button
              class="btn btn-primary-dark text-white rounded-0 px-5 mx-auto"
              type="submit"
            >
              送出訂單
            </button>
          </div>
        </Form>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      orderData: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  methods: {
    sendOrder() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`;
      const order = {
        data: {
          ...this.orderData,
        },
      };
      this.$emit('loadingStatus', true);
      this.$http
        .post(url, order)
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            console.log(res.data);
            // 顯示訊息
            this.$emit('resMessage', res.data.message);
            // 清除表單
            this.$refs.form.resetForm();
          } else {
            // 顯示訊息
            this.$emit('resMessage', res.data.message);
          }
          this.$emit('loadingStatus', false);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
