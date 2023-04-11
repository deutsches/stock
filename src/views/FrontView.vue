<template>
  <nav class="d-flex justify-content-center mt-4 mb-4">
    <RouterLink to="/" class="me-4">庫存股</RouterLink>
    <RouterLink to="/focus">關注股</RouterLink>
  </nav>
  <RouterView />
</template>

<script>
import { RouterView, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import axios from 'axios';

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
          console.log(res);
          if (!res.data.success) {
            alert('您尚未登入，請先登入!');
            router.push('/login');
          }
        })
        .catch((err) => {
          console.log(err);
          // alert(err.data);
          router.push('/login');
        });
    };
    onMounted(() => {
      checkAdmin();
    });
    return {
      checkAdmin,
    };
  },
};
</script>
