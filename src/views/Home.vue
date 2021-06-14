<template>
    <div id="nav">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand fw-bold" href="#">Brand</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <router-link class="nav-link active" to="/">首頁</router-link>
            <router-link class="nav-link" to="/productList">產品列表</router-link>
            <router-link class="nav-link" to="/cart">購物車</router-link>
            <router-link class="nav-link" to="/login">登入</router-link>
          </div>
        </div>
      </div>
    </nav>
  </div>
    <router-view @loadingStatus="loadingStatus" @resMessage="resMessage" />
    <ResMessage :resText="resObj.resMessage"
    :resIsShow="resObj.isShowReaMessage" />
    <Loading  v-if="isLoading" />
</template>

<script>
import Loading from '@/components/Loading.vue';
import ResMessage from '@/components/ResMessage.vue';

export default {
  name: 'Home',
  data() {
    return {
      isLoading: false,
      resObj: {
        resMessage: '',
        isShowReaMessage: false,
      },
    };
  },
  methods: {
    resMessage(text) {
      // 顯示訊息
      this.resObj.isShowReaMessage = true;
      setTimeout(() => {
        this.resObj.isShowReaMessage = false;
      }, 1000);
      this.resObj.resMessage = text;
    },
    loadingStatus(status) {
      this.isLoading = status;
    },
  },
  components: {
    Loading,
    ResMessage,
  },
};
</script>
