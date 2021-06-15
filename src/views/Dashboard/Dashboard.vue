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
            <router-link class="nav-link active" to="/admin">後台首頁</router-link>
            <router-link class="nav-link" to="/admin/productList">產品管理</router-link>
          </div>
        </div>
      </div>
    </nav>
  </div>
    <router-view @loadingStatus="loadingStatus" @resMessage="resMessage" v-if="checkSuccess" />
    <ResMessage :resText="resObj.resMessage"
    :resIsShow="resObj.isShowReaMessage" />
    <Loading  v-if="isLoading" />
</template>

<script>
import Loading from '@/components/Loading.vue';
import ResMessage from '@/components/ResMessage.vue';

export default {
  name: 'Dashboard',
  data() {
    return {
      isLoading: false,
      resObj: {
        resMessage: '',
        isShowReaMessage: false,
      },
      checkSuccess: false,
    };
  },
  created() {
    this.checkLogin();
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
    checkLogin() {
      // 取出儲存在瀏覽器 cookie 裡面的 token 憑證
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      // 確認有 token 執行
      if (token) {
        // 將 token 加入在 headers 內
        this.$http.defaults.headers.common.Authorization = token;
        // 檢查用戶是否仍持續登入
        const url = `${process.env.VUE_APP_API}/api/user/check`;
        this.$http.post(url).then((res) => {
          if (res.data.success) {
            // console.log(res.data);
            // 確認用戶有登入 -> 顯示 router-view 內容
            this.checkSuccess = true;
          } else {
            // 顯示訊息
            this.$emit('resMessage', res.data.message);
            // 轉址到 Login.html
            this.$router.push('/login');
          }
        });
      } else {
        // 顯示訊息
        this.$emit('resMessage', '尚未登入，請重新登入');
        // 轉址到 Login.html
        this.$router.push('/login');
      }
    },
  },
  components: {
    Loading,
    ResMessage,
  },
};
</script>
