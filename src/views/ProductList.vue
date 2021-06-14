<template>
  <div class="productList container py-5">
    <ul class="row">
      <li
        class="col-6 col-md-4 col-lg-3 mb-4"
        v-for="item in productsData"
        :key="item.id"
      >
          <router-link class="productImg d-block overflow-hidden" :to="`/product/${item.id}`">
          <img :src="item.imageUrl" class="productImg--bigger" />
          </router-link>
        <div class="d-lg-flex mb-2">
              <router-link class="btn btn-outline-primary-dark w-100 rounded-0 fs-7 fs-lg-6"
              :to="`/product/${item.id}`">查看商品</router-link>
          <a
            href="#"
            class="btn btn-primary text-white w-100 rounded-0 fs-7 fs-lg-6"
            @click.prevent="addCart(item.id, item.qty)"
            >加入購物車</a
          >
        </div>
        <h4 class="h6 mb-md-2">
          <a href="#" class="text-dark">{{ item.title }}</a>
        </h4>
        <del>NT$ {{ thousands(item.origin_price) }}</del>
        <h5 class="h5 text-primary-dark fw-bold">
          NT$ {{ thousands(item.price) }}
        </h5>
      </li>
    </ul>
    <Pagination :page="pagination" @getProduct="getProductsData" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';

export default {
  data() {
    return {
      productsData: [],
      pagination: {},
      productData: {},
    };
  },
  methods: {
    thousands(num) {
      const parts = num.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.join('.');
    },
    getProductsData(currentPage = 1) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?page=${currentPage}`;
      this.$emit('loadingStatus', true);
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            // console.log(res.data);
            this.productsData = res.data.products;
            this.pagination = res.data.pagination;
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
    this.getProductsData();
  },
  components: {
    Pagination,
  },
};
</script>
