<template>
  <div class="login_body" :style="bodyStyle">
    <div class="main" :style="mainStyle">
      <div class="text-center">
        <h3>已經有帳號了</h3>
        <button class="text-white loginDisplay" :class="{ active: !status }" @click="loginDisplay">
          登入
        </button>
      </div>
      <div class="text-center">
        <h3>還沒有帳號?</h3>
        <button
          class="text-white registerDisplay"
          :class="{ active: status }"
          @click="registerDisplay"
        >
          註冊
        </button>
      </div>
      <div class="moveArea" :style="moveAreaStyle">
        <form class="login_form" :style="loginFormStyle">
          <h1 class="h1">登入</h1>
          <div class="position-relative">
            <span for="login_email" class="label-text"> 信箱 </span>
            <input
              type="email"
              name="login_email"
              id="login_email"
              class="position-relative"
              v-model="loginEmail"
              aria-label="login_email"
            />
          </div>
          <div class="position-relative mt-3">
            <span for="login_password" class="label-text">密碼</span>
            <input
              type="password"
              name="login_password"
              id="login_password"
              v-model="loginPassword"
              aria-label="login_password"
            />
          </div>
          <div class="mt-2">
            <button
              type="button"
              @click="login"
              class="btn rounded-2 text-white"
              style="background-color: rgb(4, 168, 4)"
            >
              登入
            </button>
          </div>
        </form>
        <form class="register_form" :style="registerFormStyle">
          <h1 class="h1">註冊</h1>
          <div class="position-relative">
            <span for="register_email" class="label-text"> 信箱 </span>
            <input
              type="email"
              name="register_email"
              id="register_email"
              class="position-relative"
              v-model="registerEmail"
              aria-label="email"
            />
          </div>
          <div class="position-relative mt-3">
            <span for="register_password" class="label-text">密碼</span>
            <input
              type="password"
              name="register_password"
              id="register_password"
              v-model="registerPassword"
              aria-label="register_password"
            />
          </div>
          <div class="mt-2">
            <button
              type="button"
              @click="register"
              class="btn rounded-2 text-white"
              style="background-color: #cc0a0a"
            >
              註冊
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import { reactive, ref, computed } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const {
  VITE_APIKEY,
  VITE_STORAGEBUCKET,
  VITE_AUTHDOMAIN,
  VITE_MWSSAGINGSENDERID,
  VITE_DATABASEURL,
  VITE_APPID,
  VITE_PROJECTID,
} = import.meta.env;
export default {
  setup() {
    const loginEmail = ref('');
    const loginPassword = ref('');
    const registerPassword = ref('');
    const registerEmail = ref('');
    const router = useRouter();
    const status = ref(false); // fasle = login  true = register
    const loginFormStyle = reactive({});
    const registerFormStyle = reactive({});
    const firebaseConfig = {
      apiKey: VITE_APIKEY,
      authDomain: VITE_AUTHDOMAIN,
      databaseURL: VITE_DATABASEURL,
      projectId: VITE_PROJECTID,
      storageBucket: VITE_STORAGEBUCKET,
      messagingSenderId: VITE_MWSSAGINGSENDERID,
      appId: VITE_APPID,
    };
    const { VITE_URL } = import.meta.env;
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    async function login() {
      signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
        .then((userCredential) => {
          // Signed in
          const { user } = userCredential;
          const { uid } = user;
          const { expirationTime } = user.stsTokenManager;
          document.cookie = `stockToken=${uid};expires=${new Date(expirationTime)};`;
          console.log('document1',document.cookie);
          router.push('/');
        })
        .catch((error) => {
          const errorMessage = error.message;
          let message = '';
          if (errorMessage === 'Firebase: Error (auth/missing-password).') {
            message = '密碼不可空白!';
          }
          if (errorMessage === 'Firebase: Error (auth/invalid-email).') {
            message = '信箱錯誤!';
          }
          if (errorMessage === 'Firebase: Error (auth/wrong-password).') {
            message = '密碼錯誤!';
          }
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: message,
          });
        });
    }
    function loginDisplay() {
      status.value = false;
      registerFormStyle.transform = 'translateY(-100%) translateX(100%)';
      registerFormStyle.visibility = 'hidden';
      loginFormStyle.visibility = 'visible';
      loginFormStyle.transform = 'translateX(0%)';
    }
    function register() {
      const data = {
        email: registerEmail.value,
        password: registerPassword.value,
      };
      axios
        .post(`${VITE_URL}api/signup`, data)
        .then((res) => {
          if (res.data === 'success') {
            Swal.fire({
              title: '註冊完成!',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500,
            });
            loginDisplay();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: res.data,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    const registerDisplay = () => {
      status.value = true;
      loginFormStyle.transform = 'translateX(-100%)';
      loginFormStyle.visibility = 'hidden';
      registerFormStyle.visibility = 'visible';
      registerFormStyle.transform = 'translateY(-100%) translateX(0%)';
    };
    const bodyStyle = computed(() => {
      if (status.value) {
        return {
          'background-color': '#cc0a0a',
        };
      }
      return {
        'background-color': 'rgb(4, 168, 4)',
      };
    });
    const mainStyle = computed(() => {
      if (status.value) {
        return {
          'background-color': '#f56c6c',
        };
      }
      return {
        'background-color': 'rgb(158, 253, 186)',
      };
    });

    const moveAreaStyle = computed(() => {
      if (window.screen.width > 767) {
        if (status.value) {
          return {
            left: '45%',
          };
        }
        return {
          left: '10%',
        };
      }
      return {
        left: 0,
        width: '100%',
      };
    });
    return {
      loginEmail,
      loginPassword,
      registerEmail,
      registerPassword,
      login,
      register,
      loginDisplay,
      registerDisplay,
      status,
      loginFormStyle,
      registerFormStyle,
      bodyStyle,
      mainStyle,
      moveAreaStyle,
    };
  },
};
</script>

<style>
.login_body {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(4, 168, 4);
}
.main {
  position: relative;
  min-height: 400px;
  width: 70%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.label-text {
  position: absolute;
  background-color: white;
  z-index: 10;
  top: -10px;
  left: 15px;
  padding-left: 2px;
  padding-right: 2px;
}
.moveArea > form {
  width: 100%;
  text-align: center;
  padding-top: 20%;
  padding-left: 30px;
  padding-right: 30px;
  transition: all 0.5s;
}
.login_form input,
.register_form input {
  width: 100%;
  height: 40px;
  padding: 5px 15px;
}

.register_form {
  visibility: hidden;
  transform: translateY(-100%) translateX(100%);
}
.moveArea {
  top: -10%;
  left: 10%;
  width: 40%;
  overflow: hidden;
  transition: all 0.5s;
  height: 120%;
  position: absolute;
  background-color: #fff;
}
.loginDisplay {
  border-radius: 10px;
  border: none;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 25px;
  padding-left: 25px;
  background-color: rgb(176, 178, 180);
}
.registerDisplay {
  border-radius: 10px;
  border: none;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 25px;
  padding-left: 25px;
  background-color: rgb(176, 178, 180);
}
@media (max-width: 767px) {
  .main {
    display: inline-block;
  }
  .main > div {
    display: inline-block;
    width: 50%;
  }
  .main > div button {
    width: 100%;
  }
  .moveArea {
    top: 0;
    height: auto;
    position: relative;
    width: 100%;
  }
  .login_body h3 {
    display: none;
  }
  .registerDisplay {
    border: none;
    cursor: pointer;
    padding-top: 5px;
    padding-bottom: 5px;
    background-color: rgb(176, 178, 180);
  }
  .loginDisplay {
    border: none;
    cursor: pointer;
    padding-top: 5px;
    padding-bottom: 5px;
    background-color: rgb(176, 178, 180);
  }
  .loginDisplay.active {
    background-color: #4ccf57;
  }
  .registerDisplay.active {
    background-color: #f36767;
  }
}
</style>
