<script>
import Modal from 'bootstrap/js/dist/modal';
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  props: ['stock', 'code'],
  emits: ['getStoreStock', 'getStockDetail'],
  setup(props, { emit }) {
    const stockModal = ref(null);
    const token = ref(null);
    const stocks = ref(props.stock);
    const openModal = () => {
      stockModal.value.show();
    };
    const deleteSingleStock = (uid) => {
      token.value = document.cookie.replace(
        /(?:(?:^|.*;\s*)stockToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
      );
      axios.defaults.headers.common.Authorization = token.value;
      axios
        .delete(`http://127.0.0.1:3000/api/stock/deleteSingleStock?uid=${uid}`)
        .then((res) => {
          if (res.data.success) {
            emit('get-store-stock');
            emit('get-stock-detail', props.code);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    onMounted(() => {
      stockModal.value = new Modal(document.getElementById('stockModal'), { keyboard: false });
    });
    return {
      openModal,
      stocks,
      deleteSingleStock,

    };
  },
};
</script>

<template>
  <div
    id="stockModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="stockModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="stockModalLabel" class="modal-title">
            <span>個股細項</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <table class="table">
            <thead>
              <tr>
                <td>名稱</td>
                <td>股數</td>
                <td>成交價</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="detail in stock" :key="detail.uid">
                <td>{{ detail.name }}</td>
                <td>{{ detail.counts }}</td>
                <td>{{ detail.price }}</td>
                <td>
                  <button type="button" class="btn btn-danger"
                  @click="deleteSingleStock(detail.uid)">
                    刪除
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
