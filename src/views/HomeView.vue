<template>
  <loading v-model:active="isLoading" :can-cancel="true" />
  <main>
    <div class="container">
      <div class="row">
        <div class="position-relative text-center p-2">
          <v-form v-slot="{ errors }" lazy @submit="addStock">
            <VField
              type="search"
              class="input_stock p-2"
              id="stock_code"
              name="股票名稱"
              placeholder="請輸入股票代號或是股票名稱"
              rules="required"
              :class="{ 'is-invalid': errors['股票名稱'] }"
              v-model="search"
              @blur="clean"
            >
            </VField>
            <button type="submit" class="ms-2 btn btn-outline-success">加入</button>
            <ul class="list-unstyled searchList position-absolute">
              <li
                v-for="stock in stocks"
                :key="stock.code"
                @click="inputValue(stock)"
                @keypress.enter="inputValue(stock)"
                role="button"
                :tabIndex="0"
                :data-code="stock.stockCode"
                v-show="showList"
                class="p-1"
              >
                {{ stock.code + ' ' + stock.name }}
              </li>
            </ul>
            <error-message name="股票名稱" class="text-danger errorMessage"></error-message>
            <div class="row mt-4">
              <div class="col-6 col-lg-2  offset-lg-4 offset-md-0">
                <label for="counts" class="d-block mb-1">股數&nbsp;</label>
                <VField
                  type="number"
                  class="input p-2"
                  id="counts"
                  min="1"
                  name="股數"
                  placeholder="請輸入股數"
                  rules="min_value:1|required"
                  :class="{ 'is-invalid': errors['股數'] }"
                  v-model="counts"
                  aria-label="counts"
                >
                </VField>
                <error-message name="股數" class="text-danger d-block"></error-message>
              </div>
              <div class="col-6 col-lg-2">
                <label for="price" class="d-block mb-1">成交價</label>
                <VField
                  type="number"
                  class="input p-2"
                  id="price"
                  min="1"
                  name="成交價"
                  placeholder="請輸入成交價"
                  rules="min_value:1|required"
                  :class="{ 'is-invalid': errors['成交價'] }"
                  v-model="price"
                  aria-label="price"
                >
                </VField>
                  <error-message name="成交價" class="text-danger d-block"></error-message>
              </div>

              </div>
            <div class="text-md-start text-lg-center mt-4 row row-cols-4">
            </div>
          </v-form>
        </div>

        <!-- <div class="position-relative text-md-start text-lg-center">
          <input
            type="search"
            id="stock_code"
            v-model="search"
            aria-label="Search"
            placeholder="請輸入股票代號或是股票名稱"
            class="input_stock p-2"
            @blur="clean"
          />
          <ul class="list-unstyled searchList" :class="searchListStyle">
            <li
              v-for="stock in stocks"
              :key="stock.code"
              @click="inputValue(stock)"
              @keypress.enter="inputValue(stock)"
              role="button"
              :tabIndex="0"
              :data-code="stock.stockCode"
              class="p-1"
            >
              {{ stock.code + ' ' + stock.name }}
            </li>
          </ul>
          <button type="button" class="ms-2 btn btn-outline-success" @click="addStock">加入</button>
        </div> -->
        <!-- <div class="text-md-start text-lg-center mt-4">
          <label for="counts" class="d-inline"
            >股數
            <input
              type="number"
              id="counts"
              min="1"
              v-model="counts"
              aria-label="counts"
              placeholder="請輸入股數"
              class="input p-2"
            />
          </label>
          <label for="price" class="ms-2 d-inline"
            >成交價
            <input
              type="number"
              id="price"
              min="1"
              v-model="price"
              aria-label="price"
              placeholder="請輸入價格"
              class="input p-2"
            />
          </label>
        </div> -->
      </div>
      <div id="pie" class="mt-5" v-show="store.length"></div>
      <div class="d-md-inline-block d-lg-flex justify-content-around mt-3">
        <div class="mb-2 mb-lg-0" :style="{ color: index?.tse?.updown * 1 > 0 ? 'red' : 'green' }">
          加權指數：{{ index?.tse?.deal }}
          <span v-if="index?.tse?.updown * 1 > 0"><i class="bi bi-arrow-up"></i></span>
          <span v-else><i class="bi bi-arrow-down"></i></span>
          {{ index?.tse?.updown }}
          ({{ index?.tse?.change }})
        </div>
        <div class="mt" :style="{ color: index?.otc?.updown * 1 > 0 ? 'red' : 'green' }">
          櫃買指數：{{ index?.otc?.deal }}
          <span v-if="index?.otc?.updown * 1 > 0"><i class="bi bi-arrow-up"></i></span>
          <span v-else><i class="bi bi-arrow-down"></i></span>
          {{ index?.otc?.updown }}
          ({{ index?.otc?.change }})
        </div>
      </div>
      <div class="table-responsive">
        <table class="table mt-4" v-show="store.length">
          <thead>
            <tr>
              <td>名稱</td>
              <td>股數</td>
              <td>成交價</td>
              <td>現價</td>
              <td>損益</td>
              <td>幅度</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="stock in store" :key="stock.code">
              <td>{{ stock.name }}</td>
              <td>{{ moneyFormat(stock.counts + '') }}</td>
              <td>{{ stock.price }}</td>
              <td>{{ stock.dealPrice }}</td>
              <td style="color:{{ stock.profit < 0 ? green : red }}">
                {{ moneyFormat(stock.profit + '') }}
              </td>
              <td style="color:{{ stock.profit < 0 ? green : red }}">{{ stock.change }}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-outline-success"
                  @click="openDetail(stock.code)"
                >
                  明細
                </button>
                &nbsp;
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  @click="deleteStock(stock.code)"
                >
                  刪除
                </button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>總損益<br />{{ moneyFormat(total + '') }}</td>
              <!-- <td>報酬率</td> -->
              <td>報酬率<br />{{ ROI }}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </main>
  <stockModal
    :stock="stock"
    @get-store-stock="getStoreStock"
    :code="codeDetail"
    @get-stock-detail="getStockDetail"
    ref="stockModal"
  ></stockModal>
</template>

<script type="module">
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import axios from 'axios';
import {
  computed, onMounted, ref, onUnmounted, watch,
} from 'vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import stockModal from '../components/DetailComponent.vue';

export default {
  components: {
    stockModal,
    Loading,
  },
  setup() {
    const stockModal = ref();
    const { VITE_URL } = import.meta.env;
    const search = ref('');
    const counts = ref(1);
    const price = ref(1);
    const isCheck = ref(false);
    const list = ref(null);
    const store = ref([]);
    const stock = ref([]);
    const btn = ref(null);
    const stockData = ref([]);
    const token = ref('');
    const stockCode = ref('');
    const codeDetail = ref('');
    const total = ref(0);
    const ROI = ref('');
    const isLoading = ref(false);
    const index = ref({});
    const router = useRouter();
    const timer = ref(null);
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
    function inputValue(code) {
      search.value = `${code.code}`;
      showList.value = false;
    }

    // 圓餅圖
    function getAnalysis(analysis) {
      const chart = c3.generate({
        bindto: '#pie',
        data: {
          columns: analysis,
          type: 'pie',
        },
      });
    }

    // 取得庫存股資料
    function getStoreStock() {
      token.value = document.cookie.replace(
        /(?:(?:^|.*;\s*)stockToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
      );
      axios.defaults.headers.common.Authorization = token.value;
      axios
        .post(`${VITE_URL}api/stock/getStoreStock`)
        .then((res) => {
          if (res.data.resultArray.length !== 0) {
            store.value = res.data.resultArray;
            total.value = res.data.total;
            ROI.value = res.data.ROI;
            index.value = res.data.index;
            getAnalysis(res.data.analysis);
          } else {
            index.value = res.data.index;
            store.value = res.data.resultArray;
          }
        })
        .catch((err) => {
          console.log(err);
          // alert(err.data);
        });
    }

    // 新增各股
    const addStock = () => {
      const code = stockData.value.filter(
        (item) => item.name.match(search.value) || item.code.match(search.value),
      );
      if (code.length === 0) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '沒有該個股資料!',
        });
      } else {
        const data = {
          code: code[0].code,
          name: code[0].name,
          counts: counts.value,
          price: price.value,
          token: token.value,
          stockCode: code[0].stockCode,
          uid: Date.parse(new Date()),
          profit: 0,
          dealPrice: 0,
          change: '',
        };
        axios
          .post(`${VITE_URL}api/stock/addStock`, data)
          .then((res) => {
            if (res.data.success) {
              Swal.fire({
                title: '加入完成!',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
              });
              getStoreStock();
            }
          })
          .catch((err) => {
            console.log(err);
            // alert(err.data);
          });

        search.value = '';
        counts.value = 1;
        price.value = 1;
      }
    };
    function clean() {
      const temp = search.value;
      search.value = '';
      search.value = `${temp}`;
    }

    // 刪除個股
    const deleteStock = (code) => {
      token.value = document.cookie.replace(
        /(?:(?:^|.*;\s*)stockToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
      );
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
          axios.defaults.headers.common.Authorization = token.value;
          axios
            .delete(`${VITE_URL}api/stock/deleteStock?code=${code}`)
            .then((res) => {
              if (res.data.success) {
                Swal.fire({
                  title: '已刪除完成!',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 1500,
                });
                // Swal.fire('已刪除完成!', '', 'success');
                getStoreStock();
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    };

    // 展開細項
    function getStockDetail(code) {
      token.value = document.cookie.replace(
        /(?:(?:^|.*;\s*)stockToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
      );
      axios.defaults.headers.common.Authorization = token.value;
      axios
        .get(`${VITE_URL}api/stock/stockDetail?code=${code}`)
        .then((res) => {
          stock.value = res.data;
          codeDetail.value = code;
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // 展開細項
    const openDetail = (code) => {
      getStockDetail(code);
      stockModal.value.openModal();
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

    // 千分位
    function moneyFormat(money) {
      return money.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
    }

    function logout() {
      document.cookie = 'stockToken=;expires=;';
      router.push('/login');
    }
    onMounted(() => {
      getStoreStock();
      getStocks();
      isLoading.value = true;
      timer.value = setInterval(() => {
        // 每5秒鐘執行一次
        const now = Date.parse(new Date());
        const beginTime = Date.parse(`${new Date().getFullYear()}/${new Date().getMonth()+1}/${new Date().getDate()} 09:00:00`);
        const endTime =   Date.parse(`${new Date().getFullYear()}/${new Date().getMonth()+1}/${new Date().getDate()} 13:30:00`);
        if (now >= beginTime && now <= endTime) {
          getStoreStock();
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
      price,
      counts,
      addStock,
      list,
      store,
      showList,
      clean,
      deleteStock,
      openDetail,
      stockModal,
      btn,
      stock,
      isCheck,
      logout,
      getStocks,
      stockCode,
      getStoreStock,
      moneyFormat,
      codeDetail,
      getStockDetail,
      getAnalysis,
      total,
      ROI,
      isLoading,
      index,
    };
  },
};
</script>

<style>
.input_stock {
  width: 270px;
}
.input {
  width: 125px;
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
.errorMessage {
  position: absolute;
  left: 38%;
  top: 30%;
}
@media (max-width: 992px) {
  .input_stock {
    width: 70%;
  }
  .input {
    width: 100%;
  }
  .searchList {
    left: 0%;
  }
}
@media (max-width: 767px) {
  .table {
    width: 600px !important;
  }
  .errorMessage{
    top: 30%;
    left: 3%;
  }
}
</style>
