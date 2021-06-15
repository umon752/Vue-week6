<template>
  <div
    id="productModal"
    ref="modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <div
      class="
        modal-dialog modal-dialog-centered modal-fullscreen-md-down modal-lg
      "
    >
      <div class="modal-content border-0">
        <div
          class="modal-header bg-primary-light text-white border-0 px-4 px-lg-5"
        >
          <h5
            id="productModalLabel"
            class="modal-title fw-bold h6 d-flex align-items-center"
          >
            <span class="material-icons d-inline-block me-1">
              add_circle_outline
            </span>
            {{ modalObj.modalTitle }}產品
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body px-4 px-lg-5 py-4">
          <div class="row">
            <div class="col-sm-4 mb-5 mb-xl-0">
              <!-- 主要圖片 -->
              <div class="mb-2">
                <div class="form-group mb-2">
                  <label for="imageUrl" class="text-secondary mb-2"
                    >主要圖片</label
                  >
                  <input
                    id="imageUrl"
                    type="text"
                    class="
                      border-0
                      text-secondary
                      border-bottom border-primary-light
                      bg-light
                      w-100
                      p-2
                    "
                    placeholder="請輸入圖片連結"
                    v-model="tempProduct.imageUrl"
                  />
                </div>
                <img class="img-fluid" :src="tempProduct.imageUrl" />
              </div>
              <!-- 多圖新增 -->
              <div class="text-secondary mb-2">多圖新增</div>
              <div v-for="(item, index) in tempProduct.imagesUrl" :key="index">
                <input
                  type="text"
                  class="
                    border-0
                    text-secondary
                    border-bottom border-primary-light
                    bg-light
                    w-100
                    p-2
                    mb-2
                  "
                  placeholder="請輸入圖片連結"
                  v-model="tempProduct.imagesUrl[index]"
                />
                <img
                  class="img-fluid mb-2"
                  :src="tempProduct.imagesUrl[index]"
                />
              </div>

              <div class="d-block d-lg-flex text-center mb-2">
                <button
                  type="button"
                  class="
                    btn btn-primary btn-sm
                    rounded-pill
                    text-white
                    w-100 w-lg-auto
                    me-1
                    mb-2 mb-lg-0
                  "
                  @click="addImage(tempProduct)"
                >
                  新增圖片
                </button>
                <button
                  type="button"
                  class="
                    btn btn-secondary-light btn-sm
                    rounded-pill
                    text-white
                    w-100 w-lg-auto
                  "
                  :class="{ disabled: !tempProduct.imagesUrl }"
                  @click="delImage(tempProduct)"
                >
                  刪除圖片
                </button>
              </div>
              <div
                class="d-block text-center mb-1"
                v-if="modalObj.imgInputIsShow"
              >
                <input
                  type="text"
                  class="
                    border-0
                    text-secondary
                    border-bottom border-primary-light
                    bg-light
                    w-100
                    p-2
                    mb-2
                  "
                  placeholder="請輸入圖片連結"
                  v-model="tempProduct.imagesUrl[product.imagesUrl.length - 1]"
                />
                <img
                  class="img-fluid mb-2"
                  :src="tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]"
                />
              </div>
            </div>
            <div class="col-sm-8">
              <div class="form-group mb-3">
                <label for="title" class="text-secondary mb-2">標題</label>
                <input
                  id="title"
                  type="text"
                  class="
                    border-0
                    text-secondary
                    border-bottom border-primary-light
                    bg-light
                    w-100
                    p-2
                  "
                  placeholder="請輸入標題"
                  v-model="tempProduct.title"
                />
              </div>

              <div class="row">
                <div class="form-group col-md-6 mb-3">
                  <label for="category" class="text-secondary mb-2">分類</label>
                  <input
                    id="category"
                    type="text"
                    class="
                      border-0
                      text-secondary
                      border-bottom border-primary-light
                      bg-light
                      w-100
                      p-2
                    "
                    placeholder="請輸入分類"
                    v-model="tempProduct.category"
                  />
                </div>
                <div class="form-group col-md-6 mb-3">
                  <label for="unit" class="text-secondary mb-2">單位</label>
                  <input
                    id="unit"
                    type="text"
                    class="
                      border-0
                      text-secondary
                      border-bottom border-primary-light
                      bg-light
                      w-100
                      p-2
                    "
                    placeholder="請輸入單位"
                    v-model="tempProduct.unit"
                  />
                </div>
              </div>

              <div class="row">
                <div class="form-group col-md-6 mb-3">
                  <label for="origin_price" class="text-secondary mb-2"
                    >原價</label
                  >
                  <input
                    id="origin_price"
                    type="number"
                    min="0"
                    class="
                      border-0
                      text-secondary
                      border-bottom border-primary-light
                      bg-light
                      w-100
                      p-2
                    "
                    placeholder="請輸入原價"
                    v-model.number="tempProduct.origin_price"
                  />
                </div>
                <div class="form-group col-md-6 mb-3">
                  <label for="price" class="text-secondary mb-2">售價</label>
                  <input
                    id="price"
                    type="number"
                    min="0"
                    class="
                      border-0
                      text-secondary
                      border-bottom border-primary-light
                      bg-light
                      w-100
                      p-2
                    "
                    placeholder="請輸入售價"
                    v-model.number="tempProduct.price"
                  />
                </div>
              </div>

              <div class="form-group mb-3">
                <label for="evaluation" class="text-secondary mb-2"
                  >商品評價星級</label
                >
                <input
                  id="evaluation"
                  type="number"
                  min="0"
                  max="5"
                  class="
                    border-0
                    text-secondary
                    border-bottom border-primary-light
                    bg-light
                    w-100
                    p-2
                  "
                  placeholder="請輸入商品評價星級"
                  v-model.number="tempProduct.evaluation"
                />
              </div>

              <div class="form-group mb-3">
                <label for="description" class="text-secondary mb-2"
                  >產品描述</label
                >
                <textarea
                  id="description"
                  type="text"
                  class="
                    border-0
                    text-secondary
                    border-bottom border-primary-light
                    bg-light
                    w-100
                    p-2
                  "
                  placeholder="請輸入產品描述"
                  v-model="tempProduct.description"
                >
                </textarea>
              </div>
              <div class="form-group mb-3">
                <label for="content" class="text-secondary mb-2"
                  >說明內容</label
                >
                <textarea
                  id="content"
                  type="text"
                  class="
                    border-0
                    text-secondary
                    border-bottom border-primary-light
                    bg-light
                    w-100
                    p-2
                  "
                  placeholder="請輸入說明內容"
                  v-model="tempProduct.content"
                >
                </textarea>
              </div>
              <div class="form-group mb-2">
                <div class="form-check">
                  <input
                    id="is_enabled"
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                    v-model="tempProduct.is_enabled"
                  />
                  <label
                    class="form-check-label text-secondary"
                    for="is_enabled"
                    >是否啟用</label
                  >
                </div>
              </div>
        <div class="d-flex justify-content-end">
          <button
            type="button"
            class="btn btn-outline-secondary-light btn-sm rounded-pill px-3 me-2"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary btn-sm rounded-pill text-white px-3"
            @click="$emit('updateProductData', tempProduct)"
          >
            確認
          </button>
        </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';

export default {
  data() {
    return {
      tempProduct: {},
      modal: '',
    };
  },
  props: ['modalObj', 'product'],
  watch: {
    product() {
      this.tempProduct = { ...this.product };
      // console.log('內變化', this.tempProduct);
    },
  },
  methods: {
    openModal() {
      this.modal.show();
    },
    closeModal() {
      this.modal.hide();
    },
    addImage(item) {
      // no-param-reassign 禁止對參數再賦值 (錯誤：Assignment to property of function parameter)
      const tempProduct = item;
      // product 內沒有 imagesUrl 則給予空陣列
      if (!tempProduct.imagesUrl) {
        tempProduct.imagesUrl = [];
      }
      // imagesUrl 陣列最後一筆資料非空字串時執行
      if (tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1] !== '') {
        tempProduct.imagesUrl.push('');
      }
    },
    delImage(item) {
      // 刪除 imagesUrl 陣列最後一筆資料
      item.imagesUrl.pop();
    },
  },
  mounted() {
    // modal 初始化
    this.modal = new Modal(this.$refs.modal);
  },
};
</script>
