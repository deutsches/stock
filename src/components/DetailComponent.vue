<script>
import Modal from 'bootstrap/js/dist/modal';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  props: ['stock', 'code'],
  emits: ['getStoreStock', 'getStockDetail'],
  setup(props, { emit }) {
    const stockModal = ref(null);
    const token = ref(null);
    const stocks = ref(props.stock);
    const { VITE_URL } = import.meta.env;
    const openModal = () => {
      stockModal.value.show();
    };
    const deleteSingleStock = (uid) => {
      token.value = document.cookie.replace(
        /(?:(?:^|.*;\s*)stockToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
      );
      Swal.fire({
        title: '確定要刪除此細項嗎?',
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
            .delete(`${VITE_URL}api/stock/deleteSingleStock?uid=${uid}`)
            .then((res) => {
              if (res.data.success) {
                emit('get-store-stock');
                emit('get-stock-detail', props.code);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
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
