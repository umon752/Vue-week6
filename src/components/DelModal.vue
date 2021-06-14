<template>
  <div id="delProductModal" ref="delModal" class="modal fade" tabindex="-1"
    aria-labelledby="delProductModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content border-0">
            <div class="modal-header bg-primary-light text-white border-0">
                <h5 id="delProductModalLabel" class="modal-title fw-bold h6">
                    <span>刪除產品</span>
                </h5>
                <button type="button" class="btn-close"
                data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body font-size-md">
                是否刪除
                <strong class="text-primary">{{product.title}}</strong> 商品(刪除後將無法恢復)。
            </div>
            <div class="modal-footer border-0">
                <button type="button"
                class="btn btn-outline-secondary-light btn-sm rounded-pill px-3"
                    data-bs-dismiss="modal">
                    取消
                </button>
                <button type="button" class="btn btn-primary btn-sm rounded-pill text-white px-3"
                    @click="$emit('delProductData', product)">
                    確認刪除
                </button>
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
      delModal: '',
    };
  },
  props: ['product'],
  methods: {
    openModal() {
      this.delModal.show();
    },
    closeModal() {
      this.delModal.hide();
    },
  },
  mounted() {
    // modal 初始化
    this.delModal = new Modal(this.$refs.delModal);
  },
};
</script>
