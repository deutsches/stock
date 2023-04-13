<template>
  <div class="d-flex justify-content-center align-items-center" style="min-height: 80vh">
    <div>
      <div class="text-center error">
        <div class="clip">
          <div class="shadow">
            <span class="first" v-text="first"></span>
          </div>
        </div>
        <div class="clip">
          <div class="shadow">
            <span class="second" v-text="second"></span>
          </div>
        </div>
        <div class="clip">
          <div class="shadow">
            <span class="third" v-text="third"></span>
          </div>
        </div>
      </div>
      <h2 class="h1 text-center mt-3">Sorry! 此頁面不存在喔!</h2>
    </div>
  </div>
</template>

<script type="module">
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const first = ref(0);
    const second = ref(0);
    const third = ref(0);

    function randomNum() {
      return Math.floor(Math.random() * 9) + 1;
    }
    const firstLoop = () => new Promise((resolve, reject) => {
      let count = 0;
      const interval = setInterval(() => {
        first.value = randomNum();
        count += 1;
        if (count >= 10) {
          clearInterval(interval);
          first.value = 4;
          resolve();
        }
      }, 30);
    });

    const secondLoop = () => new Promise((resolve, reject) => {
      let count = 0;
      const interval = setInterval(() => {
        second.value = randomNum();
        count += 1;
        if (count >= 20) {
          clearInterval(interval);
          second.value = 0;
          resolve();
        }
      }, 50);
    });

    const thirdLoop = () => new Promise((resolve, reject) => {
      let count = 0;
      const interval = setInterval(() => {
        third.value = randomNum();
        count += 1;
        if (count >= 30) {
          clearInterval(interval);
          third.value = 4;
          resolve();
        }
      }, 80);
    });

    const runLoops = async () => {
      await firstLoop();
      await secondLoop();
      await thirdLoop();
    };

    onMounted(() => {
      runLoops();
    });
    return {
      runLoops,
      first,
      second,
      third,
    };
  },
};
</script>

<style>
.first,
.second,
.third {
  width: 150px;
  height: 150px;
  line-height: 150px;
  display: inline-block;
  background-color: #07b3f9;
  border-radius: 50%;
  text-align: center;
  color: #fff;
  transform: skew(45deg);
  overflow: hidden;
  font-weight: bold;
  font-size: 120px;
}
.first {
  left: 10%;
}
.third {
  left: -10%;
}
.error {
  transform: skew(-45deg);
  position: relative;
}
.clip {
  overflow: hidden;
  display: inline-block;
}
.shadow {
  overflow: hidden;
  width: 180px;
}
.clip:nth-of-type(2) {
  overflow: hidden;
  position: relative;
  box-shadow: inset 20px 0px 20px -15px rgba(150, 150, 150, 0.8),
    20px 0px 20px -15px rgba(150, 150, 150, 0.8);
}

</style>
