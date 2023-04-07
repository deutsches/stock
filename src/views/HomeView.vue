<template>
    <loading v-model:active="isLoading" :can-cancel="true"/>
  <main>
    <div class="container">
      <div class="row">
        <div class="position-relative text-md-start text-lg-center">
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
          <button type="button" class="ms-2 btn btn-outline-primary" @click="addStock">
            加入
          </button>
        </div>
        <div class="text-md-start text-lg-center mt-4">
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
        </div>
      </div>
      <div id="pie" class="mt-5"></div>
      <table class="table mt-5 table-responsive" v-show="store.length">
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
              <button type="button" class="btn btn-primary" @click="openDetail(stock.code)">
                明細
              </button>
              &nbsp;
              <button type="button" class="btn btn-danger" @click="deleteStock(stock.code)">
                刪除
              </button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td ></td>
            <td ></td>
            <td ></td>
            <td></td>
            <td >總損益<br>{{ moneyFormat(total + '') }}</td>
            <!-- <td>報酬率</td> -->
            <td >報酬率<br>{{ROI}}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
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
import Loading from 'vue-loading-overlay';
import { computed, onMounted, ref, onBeforeUnmount} from 'vue';
import 'vue-loading-overlay/dist/css/index.css';
import axios from 'axios';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import stockModal from '../components/DetailComponent.vue';

export default {
  components: {
    stockModal,
    Loading,
  },
  setup() {
    const router = useRouter();
    const search = ref('');
    const counts = ref(1);
    const price = ref(1);
    const isCheck = ref(false);
    const list = ref(null);
    const store = ref([]);
    const stockModal = ref(null);
    const stock = ref([]);
    const btn = ref(null);
    const stockData = ref([]);
    const token = ref('');
    const stockCode = ref('');
    const codeDetail = ref('');
    const total = ref(0);
    const ROI = ref('');
    const isLoading = ref(false);
    // const searchListStyle = reactive({
    //   'd-none': true,
    //   'position-absolute': false,
    // });

    const stocks = computed(() => {
      if (!search.value) {
        return '';
      }
      return stockData.value.filter(
        (item) => item.name.match(search.value) || item.code.match(search.value),
      );
    });
    const searchListStyle = computed(() => {
      if (stocks.value.length > 0) {
        return {
          'd-none': false,
          'position-absolute': true,
        };
      }
      return {
        'd-none': true,
        'position-absolute': false,
      };
    });
    function inputValue(code) {
      search.value = `${code.code}`;
      console.log(searchListStyle);
      searchListStyle.value['position-absolute'] = false;
      searchListStyle.value['d-none'] = true;
    }
    function getAnalysis(analysis) {
      const chart = c3.generate({
        bindto: '#pie',
        data: {
          columns: analysis,
          type: 'pie',
        },
      });
    }
    function getStoreStock() {
      token.value = document.cookie.replace(
        /(?:(?:^|.*;\s*)stockToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
      );
      axios.defaults.headers.common.Authorization = token.value;
      axios
        .post('http://127.0.0.1:3000/api/stock/getStoreStock')
        .then((res) => {
          store.value = res.data.resultArray;
          total.value = res.data.total;
          ROI.value = res.data.ROI;
          getAnalysis(res.data.analysis);
        })
        .catch((err) => {
          console.log(err);
          // alert(err.data);
        });
    }
    const addStock = () => {
      Swal.fire('123');
      const code = stockData.value.filter(
        (item) => item.name.match(search.value) || item.code.match(search.value),
      );

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
        .post('http://127.0.0.1:3000/api/stock/addStock', data)
        .then((res) => {
          console.log(res);
          getStoreStock();
        })
        .catch((err) => {
          console.log(err);
          // alert(err.data);
          // router.push('/login');
        });

      // store.value.push(data);
      search.value = '';
      counts.value = 1;
      price.value = 1;
      console.log(stockModal.value);
    };
    function clean() {
      const temp = search.value;
      search.value = '';
      search.value = `${temp}`;
    }
    const deleteStock = (code) => {
      token.value = document.cookie.replace(
        /(?:(?:^|.*;\s*)stockToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
      );
      axios.defaults.headers.common.Authorization = token.value;
      axios
        .delete(`http://127.0.0.1:3000/api/stock/deleteStock?code=${code}`)
        .then((res) => {
          if (res.data.success) {
            getStoreStock();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    function getStockDetail(code) {
      token.value = document.cookie.replace(
        /(?:(?:^|.*;\s*)stockToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
      );
      axios.defaults.headers.common.Authorization = token.value;
      axios
        .get(`http://127.0.0.1:3000/api/stock/stockDetail?code=${code}`)
        .then((res) => {
          stock.value = res.data;
          codeDetail.value = code;
        })
        .catch((err) => {
          console.log(err);
        });
    }
    const openDetail = (code) => {
      console.log(code);
      getStockDetail(code);
      stockModal.value.openModal();
    };

    // 取得所有個股資料
    function getStocks() {
      axios
        .get('http://127.0.0.1:3000/api/stock/getStocks')
        .then((res) => {
          stockData.value = res.data;
          isLoading.value = false;
        })
        .catch((err) => {
          console.log(err);
          // alert(err.data);
          // router.push('/login');
        });
    }

    // 登出
    const logout = () => {
      document.cookie = 'stockToken=;expires=;';
    };

    // 千分位
    function moneyFormat(money) {
      return money.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
    }

    // 更新現價
    // function updateStoreStockPrice() {
    //   token.value = document.cookie.replace(
    //     /(?:(?:^|.*;\s*)stockToken\s*=\s*([^;]*).*$)|^.*$/,
    //     '$1',
    //   );
    //   axios.defaults.headers.common.Authorization = token.value;
    //   axios
    //     .post('http://127.0.0.1:3000/api/stock/updateStoreStockPrice')
    //     .then((res) => {
    //       console.log(res);
    //       store.value = res.data;
    //       getStoreStock();
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       // alert(err.data);
    //     });
    // }

    onMounted(() => {
      getStoreStock();
      getStocks();
      isLoading.value = true;
      console.log(stockModal.value);
      console.log(btn.value);
      // setInterval(() => {
      //   // 每5秒鐘執行一次
      //   getStoreStock();
      // }, 5000);
    });

    onBeforeUnmount(() => {
      clearInterval(getStoreStock);
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
      searchListStyle,
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
      // updateStoreStockPrice,
      moneyFormat,
      codeDetail,
      getStockDetail,
      getAnalysis,
      total,
      ROI,
      isLoading,
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
@media (max-width: 992px) {
  .input_stock {
    width: 75%;
  }
  .input {
    width: 35%;
  }
  .searchList{
    left: 3%;
  }
}
</style>
