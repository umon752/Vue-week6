<template>
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content rounded-0">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              {{ product.title }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row align-items-center">
              <div class="col-lg-6">
                <img
                  :src="product.imageUrl"
                  class="w-100 mb-3 mb-lg-0 mr-lg-3"
                />
              </div>
              <div class="col-lg-6">
                <div>
                  <h3 class="h5 mb-2">{{ product.title }}</h3>
                  <del class="font-size-sm h6-md"
                    >原價：NT$ {{ thousands(`${product.origin_price}`) }}</del
                  >
                  <h5 class="font-size-sm h6-md text-primary-dark">
                    售價：NT$ {{ thousands(`${product.price}`) }}
                  </h5>
                  <p>描述：{{ product.description }}</p>
                  <p class="mb-3">內容：{{ product.content }}</p>
                  <div class="input-group mb-3">
                    <input
                      type="number"
                      class="form-control rounded-0"
                      min="1"
                      aria-label="Recipient's username"
                      aria-describedby="button-addon2"
                      v-model.number="qty"
                    />
                    <div class="input-group-append">
                      <button
                        class="btn btn-primary text-white rounded-0"
                        type="button"
                        id="button-addon2"
                        @click="addCart(product.id, qty)"
                      >
                        加入購物車
                      </button>
                    </div>
                  </div>
                </div>
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
      product: {},
      qty: 1,
    };
  },
  watch: {
    qty() {
      // input 數量不可輸入小於 0，否則強制設定為 1
      if (this.qty <= 0) {
        this.qty = 1;
      }
    },
  },
  methods: {
    thousands(num) {
      const parts = num.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.join('.');
    },
    addCart(id, qty = 1) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      const product = {
        data: {
          product_id: id,
          qty,
        },
      };
      this.$emit('loadingStatus', true);
      this.$http
        .post(url, product)
        .then((res) => {
          if (res.data.success) {
            // console.log(res.data);
            // this.getCartsData();
            this.$emit('resMessage', res.data.message);
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
  mounted() {
    const { id } = this.$route.params;
    const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`;
    this.$emit('loadingStatus', true);
    this.$http
      .get(url)
      .then((res) => {
        if (res.data.success) {
          console.log(res, id);
          this.product = res.data.product;
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
};
</script>
