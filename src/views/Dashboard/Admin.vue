<template>
  <div class="container my-5">
    <div class="row justify-content-center align-items-center">
      <div class="col-md-11 col-lg-10 col-xl-9 pb-3">
        <div class="d-flex justify-content-between mb-3">
          <h1
            class="
              h5
              font-weight-normal
              fw-bold
              text-primary-light
              d-flex
              align-items-center
            "
          >
            <span class="material-icons"> admin_panel_settings </span>Admin
          </h1>
          <button type="button"
            class="
              btn btn-outline-primary-light btn-sm
              rounded-pill
              font-size-md
              d-inline-flex
              align-items-center
            "
            @click="openModal('create')"
          >
            <span class="material-icons font-size-md"> add </span>建立產品
          </button>
        </div>
        <div class="adminTable">
          <table class="table bg-white shadow-sm">
            <thead class="bg-primary-light text-white">
              <tr>
                <th width="10%">分類</th>
                <th>產品名稱</th>
                <th width="10%" class="text-end">原價</th>
                <th width="10%" class="text-end">售價</th>
                <th width="10%" class="text-end">星級</th>
                <th width="20%" class="text-center">是否啟用</th>
                <th width="20%" class="text-center">編輯</th>
              </tr>
            </thead>
            <tbody class="font-size-md align-middle">
              <tr v-for="item in productsData" :key="item.id">
                <td>{{ item.category }}</td>
                <td>{{ item.title }}</td>
                <td class="text-end">NT$ {{ item.origin_price }}</td>
                <td class="text-end">NT$ {{ item.price }}</td>
                <td class="text-end" v-if="!item.evaluation">0 星</td>
                <td class="text-end" v-else>{{ item.evaluation }} 星</td>
                <td class="text-center">
                  <span class="text-primary" v-if="item.is_enabled">啟用</span>
                  <span class="text-secondary" v-else>未啟用</span>
                </td>
                <td class="text-center">
                  <a
                    href="#"
                    class="
                      adminBtn
                      material-icons
                      h5
                      text-primary
                      mb-0
                      me-1
                    "
                    @click.prevent="openModal('edit', item)"
                  >
                    edit
                  </a>
                  <a
                    href="#"
                    class="
                      adminBtn
                      material-icons
                      h5
                      text-secondary
                      mb-0
                    "
                    @click.prevent="openModal('delete', item)"
                  >
                    delete
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="text-secondary text-center" v-if="productsData.length === 0">
          目前尚未有商品
        </p>
    <Pagination :page="pagination" @getProduct="getProductsData" />
      </div>
    </div>
    <UpdateModal :product="productObj" :modalObj="modalObj" ref="modal"
    @updateProductData="updateProductData" />
    <DelModal :product="productObj" @delProductData="delProductData" ref="delModal" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import UpdateModal from '@/components/UpdateModal.vue';
import DelModal from '@/components/DelModal.vue';

export default {
  data() {
    return {
      productsData: [],
      productObj: {
        evaluation: '',
        // title: '',
        // category: '',
        // origin_price: '',
        // price: '',
        // unit: '',
        // description: '',
        // content: '',
        // is_enabled: 0,
        // imageUrl: '',
        imagesUrl: [],
      },
      modalObj: {
        modalTitle: '',
        imgInputIsShow: false,
      },
      pagination: {},
      modalShow: false,
    };
  },
  // watch: {
  //   productObj() {
  //     console.log('外變化', this.productObj);
  //   },
  // },
  methods: {
    getProductsData(page = 1) {
      this.$emit('loadingStatus', true);
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
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
    showModal() {
      this.modalShow = true;
    },
    openModal(status, item) {
      if (status === 'delete') {
        this.$refs.delModal.openModal();
        this.productObj = {
          ...item,
        };
        // console.log(this.productObj);
      } else if (status === 'edit') {
        this.$refs.modal.openModal();
        this.showModal();
        this.productObj = {
          ...item,
        };
        console.log('外層編輯', this.productObj);
        this.modalObj.modalTitle = '編輯';
      } else if (status === 'create') {
        this.$refs.modal.openModal();
        this.showModal();
        // 清空 input 內容
        this.productObj = {
          evaluation: '',
          title: '',
          category: '',
          origin_price: '',
          price: '',
          unit: '',
          description: '',
          content: '',
          is_enabled: 0,
          imageUrl: '',
          imagesUrl: [],
        };
        console.log('外層建立', this.productObj);
        this.modalObj.modalTitle = '建立';
      }
    },
    delProductData(item) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
      this.$http
        .delete(url)
        .then((res) => {
          if (res.data.success) {
            // 顯示訊息
            this.$emit('resMessage', res.data.message);
            this.getProductsData();
          } else {
            // 顯示訊息
            this.$emit('resMessage', res.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      this.$refs.delModal.closeModal();
    },
    updateProductData(item) {
      console.log(item);
      // 建立
      let url;
      let method;
      // const resFalseText = '欄位未填完成';
      this.$emit('loadingStatus', true);

      // 編輯
      if (this.modalObj.modalTitle === '編輯') {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
        method = 'put';
      } else if (this.modalObj.modalTitle === '建立') {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`;
        method = 'post';
      }

      this.$http[method](url, {
        data: item,
      })
        .then((res) => {
          if (res.data.success) {
            console.log(res.data);
            // 顯示訊息
            this.$emit('resMessage', res.data.message);
            this.getProductsData();
            this.$refs.modal.closeModal();
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
    // 取得產品資料
    this.getProductsData();
  },
  components: {
    Pagination,
    UpdateModal,
    DelModal,
  },
};
</script>
