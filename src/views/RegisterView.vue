<template>
  <label for="email"
    >信箱
    <input type="email" name="email" id="email" v-model="email" />
  </label>
  <label for="password"
    >密碼
    <input type="password" name="password" id="password" v-model="password" />
  </label>
  <button type="button" @click="login2">註冊</button>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();
    // const route = useRoute();

    function register() {
      const data = {
        email: email.value,
        password: password.value,
      };
      axios
        .post('http://127.0.0.1:3000/api/signup', data)
        .then((res) => {
          if (res.data === 'success') {
            alert('您已註冊成功!');
            router.push('/login');
          } else {
            alert(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    function login() {
      const data = {
        email: email.value,
        password: password.value,
      };
      axios
        .post('http://127.0.0.1:3000/api/login', data)
        .then((res) => {
          if (res.data === 'success') {
            alert('登入成功!');
            const { uid } = res.data;
            const { expirationTime } = res.data.stsTokenManager;
            document.cookie = `stockToken=${uid};expires=
            ${new Date(expirationTime)};`;
          } else {
            alert(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      // router.push('/');
    }
    async function login2() {
      signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
          // Signed in
          const { user } = userCredential;
          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    }
    return {
      register,
      email,
      password,
      login,
      login2,
    };
  },
};
</script>
