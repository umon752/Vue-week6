<template>
  <div class="cart container py-5">
    <div class="row d-none d-md-flex mb-3">
      <div class="col-md-4 col-lg-3">品項</div>
      <div class="col-md-2 col-lg-3">單價</div>
      <div class="col-md-2 col-lg-3">數量</div>
      <div class="col-md-4 col-lg-3">金額</div>
    </div>
    <p class="h4 text-center py-5" v-if="cartsData.carts.length === 0">目前尚未有商品</p>
    <ul
      class="row align-items-center border-bottom pb-3 mb-3"
      v-for="item in cartsData.carts"
      :key="item.id"
    >
      <li
        class="
          col-md-4 col-lg-3
          d-flex
          flex-column flex-md-row
          align-items-md-center
        "
      >
        <img :src="item.product.imageUrl" class="cartImg mb-2 mr-md-3" />
        <h4 class="h6 ms-md-3">
          <span class="d-md-none">品名：</span>{{ item.product.title }}
        </h4>
      </li>
      <li class="col-md-2 col-lg-3">
        <h5 class="h6">
          <span class="d-md-none">單價：</span>NT$
          {{ thousands(item.product.price) }}
        </h5>
      </li>
      <li class="col-md-2 col-lg-3">
        <div>
          <span class="d-md-none">數量：</span>
          <input
            type="number"
            class="form-control rounded-0"
            min="1"
            @change="updateCart(item)"
            v-model.number="item.qty"
          />
        </div>
      </li>
      <li
        class="
          col-md-4 col-lg-3
          d-flex
          align-items-center
          justify-content-between
        "
      >
        <h5 class="h6">
          <span class="d-md-none">金額：</span>NT$
          {{ thousands(item.final_total) }}
        </h5>
        <a
          href="#"
          class="material-icons text-dark"
          @click.prevent="delCartData(item.id)"
        >
          close
        </a>
      </li>
    </ul>
    <div class="d-flex align-items-center justify-content-between flex-wrap"
    v-if="cartsData.carts.length > 0">
      <a
        href="#"
        class="btn btn-outline-primary text-nowrap rounded-0"
        @click.prevent="delAllCartsData"
        >刪除所有品項</a
      >
      <div
        class="
          col-md-4 col-lg-3
          d-flex
          flex-column flex-md-row
          align-items-end align-items-md-center
          justify-content-md-between
          text-primary-dark
          fw-bold
          pr-0
        "
      >
        總金額<span class="h6 h5-lg fw-bold"
          >NT$ {{ thousands(cartsData.final_total) }}</span
        >
      </div>
    <div class="text-end w-100 mt-2">
      <router-link class="btn btn-primary text-white" to="/order">下一步</router-link>
      <!-- <button type="button" class="btn btn-primary text-white">下一步</button> -->
    </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      cartsData: {
        carts: [],
      },
    };
  },
  methods: {
    thousands(num) {
      const parts = num.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.join('.');
    },
    getCartsData() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$emit('loadingStatus', true);
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            // console.log(res.data);
            this.cartsData = res.data.data;
          }
          this.$emit('loadingStatus', false);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    delCartData(id) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.$emit('loadingStatus', true);
      this.$http
        .delete(url)
        .then((res) => {
          if (res.data.success) {
            // console.log(res.data);
            this.getCartsData();
            // 顯示訊息
            this.$emit('resMessage', res.data.message);
          }
          this.$emit('loadingStatus', false);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    delAllCartsData() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`;
      this.$emit('loadingStatus', true);
      this.$http
        .delete(url)
        .then((res) => {
          if (res.data.success) {
            // console.log(res.data);
            this.getCartsData();
            // 顯示訊息
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
    updateCart(item) {
      if (item.qty <= 0) {
        // 顯示訊息
        this.$emit('resMessage', '數量不可小於 0，請重新輸入');
        this.$emit('loadingStatus', false);
      } else {
        this.$emit('loadingStatus', true);
        const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
        const cart = {
          data: {
            product_id: item.product.id,
            qty: item.qty,
          },
        };
        this.$http
          .put(url, cart)
          .then((res) => {
            if (res.data.success) {
              // console.log(res.data);
              this.getCartsData();
              // 顯示訊息
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
      }
    },
  },
  mounted() {
    this.getCartsData();
  },
};
</script>
