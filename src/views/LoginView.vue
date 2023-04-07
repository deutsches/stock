<template>
  <label for="email"
    >信箱
    <input type="email" name="email" id="email" v-model="email" />
  </label>
  <label for="password"
    >密碼
    <input type="password" name="password" id="password" v-model="password" />
  </label>
  <button type="button" @click="login">登入</button>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
const {
  VITE_APIKEY, VITE_STORAGEBUCKET,
  VITE_AUTHDOMAIN, VITE_MWSSAGINGSENDERID,
  VITE_DATABASEURL, VITE_APPID,
  VITE_PROJECTID,
} = import.meta.env;
export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();
    // const route = useRoute();
    const firebaseConfig = {
      apiKey: VITE_APIKEY,
      authDomain: VITE_AUTHDOMAIN,
      databaseURL: VITE_DATABASEURL,
      projectId: VITE_PROJECTID,
      storageBucket: VITE_STORAGEBUCKET,
      messagingSenderId: VITE_MWSSAGINGSENDERID,
      appId: VITE_APPID,
    };
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    async function login() {
      signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
          // Signed in
          const { user } = userCredential;
          console.log(user.uid, user.stsTokenManager.expirationTime);
          const { uid } = user;
          const { expirationTime } = user.stsTokenManager;
          document.cookie = `stockToken=${uid};expires=
            ${new Date(expirationTime)};`;
          // console.log(user);
          router.push('/');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    }

    // function login() {
    //   const data = {
    //     email: email.value,
    //     password: password.value,
    //   };
    //   console.log(data);
    //   axios
    //     .post('http://127.0.0.1:3000/api/login', data)
    //     .then((res) => {
    //       if (res.data.success) {
    //         console.log(res.data);
    //         document.cookie = `stockToken=${res.data.uid};expires=
    //         ${new Date(res.data.expirationTime)};`;
    //         router.push('/');
    //       } else {
    //         alert(res.data);
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }
    return {
      email,
      password,
      login,
    };
  },
};
</script>
