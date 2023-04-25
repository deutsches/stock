<template>
  <loading v-model:active="isLoading" :can-cancel="true" />
  <main>
    <div class="container">
      <div class="row">
        <div class="position-relative text-center p-2">
          <input
            type="search"
            id="stock_code"
            v-model="search"
            aria-label="Search"
            placeholder="請輸入股票代號或是股票名稱"
            class="input_stock p-2"
          />
          <button type="button" class="ms-2 btn btn-outline-success" @click="addStock">加入</button>
          <ul
            class="list-unstyled searchList position-absolute"
          >
            <li
              v-for="stock in stocks"
              :key="stock.code"
              @click="inputValue(stock)"
              @keypress.enter="inputValue(stock)"
              role="button"
              :tabIndex="0"
              v-show="showList"
              class="p-1"
            >
              {{ stock.code + ' ' + stock.name }}
            </li>
          </ul>
        </div>
      </div>
      <div class="d-md-inline-block d-lg-flex justify-content-around mt-3">
        <div class="mb-2 mb-lg-0" :style="{ color: index?.tse?.updown * 1 > 0 ? 'red' : 'green' }">
          加權指數：{{ index?.tse?.deal }}
          <span v-if="index?.tse?.updown * 1 > 0"><i class="bi bi-arrow-up"></i></span>
          <span v-else><i class="bi bi-arrow-down"></i></span>
          {{ index?.tse?.updown }}
          ({{ index?.tse?.change }})
        </div>
        <div :style="{ color: index?.otc?.updown * 1 > 0 ? 'red' : 'green' }">
          櫃買指數：{{ index?.otc?.deal }}
          <span v-if="index?.otc?.updown * 1 > 0"><i class="bi bi-arrow-up"></i></span>
          <span v-else><i class="bi bi-arrow-down"></i></span>
          {{ index?.otc?.updown }}
          ({{ index?.otc?.change }})
        </div>
      </div>
      <div class="table-responsive">
        <table class="table mt-4" v-show="focusStock.length">
          <thead>
            <tr>
              <td>名稱</td>
              <td>現價</td>
              <td>漲跌</td>
              <td>幅度</td>
              <td width="150"></td>
              <td width="150"></td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="stock in focusStock" :key="stock.code">
              <td>{{ stock.name }}</td>
              <td>{{ stock.dealPrice }}</td>
              <td>{{ stock.updown }}</td>
              <td>{{ stock.change }}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-outline-success"
                  @click="updateStockPrice(stock)"
                >
                  設定警示價格
                </button>
              </td>
              <td>
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  @click="deleteStock(stock?.code)"
                >
                  刪除
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<script type="module">
import {
  computed, onMounted, ref, onUnmounted, watch,
} from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

export default {
  components: {
    Loading,
  },
  setup() {
    const isLoading = ref(false);
    const timer = ref(null);
    const search = ref('');
    const list = ref(null);
    const focusStock = ref([]);
    const token = ref('');
    const stockData = ref([]);
    const { VITE_URL } = import.meta.env;
    const index = ref({});
    const showList = ref(false);

    const stocks = computed(() => {
      if (!search.value) {
        return '';
      }
      return stockData.value.filter(
        (item) => item.name.match(search.value) || item.code.match(search.value),
      );
    });
    watch(() => stocks.value, () => {
      showList.value = true;
    });
    function inputValue(stock) {
      search.value = `${stock.code}`;
      showList.value = false;
    }

    // 取得關注股
    function getFocusStock() {
      token.value = document.cookie.replace(
        /(?:(?:^|.*;\s*)stockToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
      );
      axios.defaults.headers.common.Authorization = token.value;
      axios
        .post(`${VITE_URL}api/focus/getfocusStock`)
        .then((res) => {
          index.value = res.data.index;
          focusStock.value = res.data.resultArray;
        })
        .catch((err) => {
          alert(err.data);
        });
    }

    // 新增關注股
    const addStock = () => {
      token.value = document.cookie.replace(
        /(?:(?:^|.*;\s*)stockToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
      );
      axios.defaults.headers.common.Authorization = token.value;
      const code = stockData.value.filter(
        (item) => item.name.match(search.value) || item.code.match(search.value),
      );
      if (code.length === 0 || search.value === '') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '沒有該個股資料，請確認是否輸入正確!',
        });
      } else {
        const data = {
          code: code[0].code,
          name: code[0].name,
          token: token.value,
          stockCode: code[0].stockCode,
          uid: Date.parse(new Date()),
          dealPrice: 0,
          updown: 0,
          change: '',
        };
        axios
          .post(`${VITE_URL}api/focus/addStock`, data)
          .then((res) => {
            if (res.data.success) {
              Swal.fire({
                title: '加入完成!',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
              });
              getFocusStock();
            }
          })
          .catch((err) => {
            console.log(err);
          });
        search.value = '';
      }
    };

    // 取得所有個股資料
    function getStocks() {
      axios
        .get(`${VITE_URL}api/stock/getStocks`)
        .then((res) => {
          stockData.value = res.data;
          isLoading.value = false;
        })
        .catch((err) => {
          console.log(err);
        });
    }
    const deleteStock = (code) => {
      token.value = document.cookie.replace(
        /(?:(?:^|.*;\s*)stockToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
      );
      axios.defaults.headers.common.Authorization = token.value;
      Swal.fire({
        title: '確定要刪除嗎?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確定',
        cancelButtonText: '取消',
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`${VITE_URL}api/focus/deleteStock?code=${code}`)
            .then((res) => {
              if (res.data.success) {
                Swal.fire({
                  title: '已刪除完成!',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 1500,
                });
                getFocusStock();
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    };
    function updateStockPrice(stock) {
      console.log(stock);
      Swal.fire({
        title: '設定要警示的價格',
        input: 'text',
        inputValue: stock.notice.dealPrice,
        showCancelButton: true,
        confirmButtonText: '確認',
        cancelButtonText: '取消',
        showLoaderOnConfirm: true,
        preConfirm: (dealPrice) => {
          axios
            .post(`${VITE_URL}api/focus/updateNoticePrice?code=${stock.code}&dealPrice=${dealPrice}`)
            .then((res) => {
              if (res.data.success) {
                Swal.fire({
                  title: '已設定完成!',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 1500,
                });
                getFocusStock();
              }
            })
            .catch((err) => {
              console.log(err);
            });
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: '設定完成!',
          });
        }
      });
    }
    onMounted(() => {
      getStocks();
      getFocusStock();
      isLoading.value = true;
      timer.value = setInterval(() => {
        // 每5秒鐘執行一次
        const now = Date.parse(new Date());
        const beginTime = Date.parse(`${new Date().getFullYear()}/${new Date().getMonth()}/${new Date().getDate()} 09:00:00`);
        const endTime = Date.parse(`${new Date().getFullYear()}/${new Date().getMonth()}/${new Date().getDate()} 13:30:00`);

        if (now >= beginTime && now <= endTime) {
          getFocusStock();
        }
      }, 5000);
    });
    onUnmounted(() => {
      clearInterval(timer.value);
    });
    return {
      search,
      stocks,
      inputValue,
      addStock,
      list,
      focusStock,
      getFocusStock,
      getStocks,
      deleteStock,
      index,
      isLoading,
      updateStockPrice,
      showList,
    };
  },
};
</script>

<style>
.input_stock {
  width: 270px;
}
.searchList {
  width: 270px;
  background: rgb(252, 215, 215);
  max-height: 6rem;
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 0.2rem;
  font-size: 1rem;
  color: rgba(108, 117, 125, 0.8);
  z-index: 10;
  left: 37%;
}
@media (max-width: 992px) {
  .input_stock {
    width: 75%;
  }
  .searchList {
    left: 4%;
  }
}
</style>
