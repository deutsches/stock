<template>
  <nav class="d-flex justify-content-center mt-4 mb-4">
    <RouterLink to="/" class="me-4">庫存股</RouterLink>
    <RouterLink to="/focus"  class="me-4">關注股</RouterLink>
    <a href="#" @click.prevent="logout">登出</a>
  </nav>
  <RouterView />
</template>

<script>
import { RouterView, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  components: {
    RouterView,
  },
  setup() {
    const { VITE_URL } = import.meta.env;
    const router = useRouter();
    const token = ref('');
    const checkAdmin = () => {
      token.value = document.cookie.replace(
        /(?:(?:^|.*;\s*)stockToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
      );
      // axios設定header
      axios.defaults.headers.common.Authorization = token.value;
      axios
        .post(`${VITE_URL}api/users/check`)
        .then((res) => {
          if (!res.data.success) {
            Swal.fire({
              icon: 'success',
              title: '您尚未登入，請先登入!',
              showConfirmButton: true,
              timer: 2000,
            });
            router.push('/login');
          }
        })
        .catch((err) => {
          console.log(err);
          // alert(err.data);
          router.push('/login');
        });
    };
    // 登出
    const logout = () => {
      document.cookie = 'stockToken=;expires=;';
      router.push('/login');
    };
    onMounted(() => {
      checkAdmin();
    });
    return {
      checkAdmin,
      logout,
    };
  },
};
</script>
