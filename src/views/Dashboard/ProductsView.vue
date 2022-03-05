<template>
  <h2>產品資料管理列表</h2>
  <button class="btn btn-secondary px-4 d-flex ms-auto mb-3"
    @click="showModal('add')">
    <span class="material-icons-outlined">
      add
    </span>
    新增產品
  </button>

  <div class="table-responsive">
    <table class="table table-striped text-center text-nowrap">
      <thead>
        <tr>
          <th scope="col">分類</th>
          <th scope="col">產品圖片</th>
          <th scope="col">產品名稱</th>
          <th scope="col">原價</th>
          <th scope="col">售價</th>
          <th scope="col">產品標籤</th>
          <th scope="col">啟用狀態</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody class="align-middle">
        <tr v-show="!productsData.length">
          <td colspan="8" class="py-5">
            尚未有任何產品，可以點擊右上角的「新增產品」來新增產品
          </td>
        </tr>
        <tr v-show="productsData.length" v-for="product in productsData" :key="product.id">
          <td>{{ product.category }}</td>
          <td>
            <img class="productImg-height" alt="產品圖片" :src="product.imageUrl">
          </td>
          <td>{{ product.title }}</td>
          <td class="text-end">NTD {{ product.origin_price }}</td>
          <td class="text-end">NTD {{ product.price }}</td>
          <td :class="productTags[product.tag]['className']">
            {{ productTags[product.tag]['text'] }}
          </td>
          <td
            :class="product.is_enabled ? 'text-success' : 'text-muted'">
            <div class="d-flex justify-content-center align-items-center">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch"
                  :id="product.id" v-model="product.is_enabled"
                  :true-value="1" :false-value="0"
                  @change="changeEnable(product)" />
                <label class="form-check-label" :for="product.id">
                  {{ product.is_enabled ? '啟用' : '不啟用' }}
                </label>
              </div>
            </div>
          </td>
          <td>
            <div class="btn-group" role="group" aria-label="edit product">
              <button type="button" class="btn btn-outline-secondary"
                @click="showModal('edit', product)">編輯</button>
              <button type="button"
                class="btn btn-outline-danger"
                @click="showModal('delete', product)"
              >刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <pagination :pages="paginationData" @page="getProducts"></pagination>

  <productModal ref="productModalOuter"
    :product="modalTemp" :status="methodStatus"
    @update="getProducts"></productModal>

  <delModal ref="delModalOuter"
    :item="modalTemp"
    view="product"
    @update="getProducts">
    <template #modal-text>
      <p>產品名稱：
        <strong>
          {{ modalTemp.title }}
        </strong>
      </p>
    </template>
  </delModal>
  <loadingText :isLoading="isLoading"></loadingText>

</template>

<style lang="scss">
.productImg-height {
  height: 100px;
}
</style>

<script>
import Swal from 'sweetalert2';
import pagination from '@/components/PaginationComponent.vue';
import productModal from '@/components/EditProductModal.vue';
import delModal from '@/components/DelModal.vue';
import pushToastMessage from '@/utils/pushToastMessage';

export default {
  data() {
    return {
      productsData: [],
      paginationData: {},
      modalTemp: {
        imagesUrl: [],
        tag: 0,
        is_enabled: 0,
      },
      isEnableChanged: {},
      methodStatus: '',
      productTags: {
        0: {
          text: '無',
          className: 'text-muted',
        },
        1: {
          text: '人氣精選',
          className: 'text-danger',
        },
        2: {
          text: '新品上市',
          className: 'text-success',
        },
      },
      isLoading: false,
    };
  },
  provide: {
    pushToastMessage,
  },
  methods: {
    getProducts(page = this.paginationData?.current_page || 1) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      this.isLoading = true;
      this.$http.get(api)
        .then((res) => {
          this.productsData = res.data.products;
          this.paginationData = res.data.pagination;
          this.isLoading = false;
        }).catch((err) => {
          Swal.fire({
            icon: 'error',
            text: err.data.response.message,
          });
          this.isLoading = false;
        });
    },
    showModal(status, product) {
      this.methodStatus = status;

      switch (status) {
        case 'add':
          this.modalTemp = {
            imagesUrl: [],
            tag: 0,
            is_enabled: 0,
          };
          this.$refs.productModalOuter.showModal();
          break;
        case 'edit':
          this.modalTemp = JSON.parse(JSON.stringify(product));
          this.$refs.productModalOuter.showModal();
          break;
        case 'delete':
          this.modalTemp = product;
          this.$refs.delModalOuter.showModal();
          break;
        default:
          break;
      }
    },
    changeEnable(product) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${product.id}`;
      this.isLoading = true;
      this.$http.put(api, { data: product })
        .then((res) => {
          this.getProducts();
          pushToastMessage(res.data.success, '產品更新');
          this.isLoading = false;
        }).catch((err) => {
          pushToastMessage(err.response.data.success, '產品更新');
          this.isLoading = false;
        });
    },
  },
  created() {
    this.getProducts();
  },
  components: {
    pagination,
    productModal,
    delModal,
  },
};
</script>
