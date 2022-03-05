<template>
  <h2>優惠券管理列表</h2>
  <button class="btn btn-secondary px-4 d-flex ms-auto mb-3"
    @click="showModal('add')">
    <span class="material-icons-outlined">
      add
    </span>
    新增優惠券
  </button>

  <div class="table-responsive">
    <table class="table table-striped text-center text-nowrap">
      <thead>
        <tr>
          <th scope="col">到期日</th>
          <th scope="col">折扣碼</th>
          <th scope="col">優惠券名稱</th>
          <th scope="col">打折數</th>
          <th scope="col">啟用狀態</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody class="align-middle">
        <tr v-show="!couponsData.length">
          <td colspan="6" class="py-5">
            尚未有任何優惠券，可以點擊右上角的「新增優惠券」來新增優惠券
          </td>
        </tr>
        <tr v-show="couponsData.length" v-for="coupon in couponsData" :key="coupon.id">
          <td>
            {{ new Date(coupon.due_date * 1000).toLocaleString('zh-TW', dateOptions) }}
          </td>
          <td>{{ coupon.code }}</td>
          <td>{{ coupon.title }}</td>
          <td>{{ coupon.percent }} %</td>
          <td
            :class="coupon.is_enabled ? 'text-success' : 'text-muted'">
            <div class="d-flex justify-content-center align-items-center">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch"
                  :true-value="1" :false-value="0"
                  :id="`${coupon.id}`" v-model="coupon.is_enabled"
                  @change="changeEnable(coupon)" />
                <label class="form-check-label" :for="`${coupon.is_enabled}`">
                  {{ coupon.is_enabled ? '啟用' : '不啟用' }}
                </label>
              </div>
            </div>
          </td>
          <td>
            <div class="btn-group" role="group" aria-label="edit coupon">
              <button type="button" class="btn btn-outline-secondary"
                @click="showModal('edit', coupon)">編輯</button>
              <button type="button"
                class="btn btn-outline-danger"
                @click="showModal('delete', coupon)"
              >刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <pagination :pages="paginationData" @page="getCoupons"></pagination>

  <couponModal
    :methodStatus="methodStatus"
    :coupon="modalTemp"
    @update="getCoupons"
    ref="couponModalOuter">
  </couponModal>

  <delModal
    view="coupon"
    :item="modalTemp"
    @update="getCoupons"
    ref="delModalOuter">
    <template #modal-text>
      <p>
        優惠券名稱：
        <strong>
          {{ modalTemp.title }}
        </strong>
      </p>
    </template>
  </delModal>
  <loadingText :isLoading="isLoading"></loadingText>
</template>

<script>
import Swal from 'sweetalert2';
import pagination from '@/components/PaginationComponent.vue';
import couponModal from '@/components/CouponModal.vue';
import delModal from '@/components/DelModal.vue';
import pushToastMessage from '@/utils/pushToastMessage';

export default {
  data() {
    return {
      couponsData: [],
      paginationData: {},
      modalTemp: {
        is_enabled: 0,
      },
      methodStatus: '',
      dateOptions: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      },
      isLoading: false,
    };
  },
  provide: {
    pushToastMessage,
  },
  methods: {
    getCoupons(page = this.paginationData?.current_page || 1) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`;

      this.isLoading = true;
      this.$http.get(api)
        .then((res) => {
          this.couponsData = res.data.coupons;
          this.paginationData = res.data.pagination;
          this.isLoading = false;
        }).catch((err) => {
          alert(err.response.data.message); // eslint-disable-line
          this.$router.replace({
            name: 'Login',
          });
          this.isLoading = false;
        });
    },
    showModal(status, coupon) {
      this.methodStatus = status;

      switch (status) {
        case 'add':
          this.modalTemp = {
            due_date: new Date(),
            is_enabled: 0,
          };
          this.$refs.couponModalOuter.showModal();
          break;
        case 'edit':
          this.modalTemp = JSON.parse(JSON.stringify(coupon));
          this.$refs.couponModalOuter.showModal();
          break;
        case 'delete':
          this.modalTemp = coupon;
          this.$refs.delModalOuter.showModal();
          break;
        default:
          break;
      }
    },
    changeEnable(coupon) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${coupon.id}`;
      this.isLoading = true;
      this.$http.put(api, { data: coupon })
        .then((res) => {
          pushToastMessage(res.data.success, '更新優惠券');
          this.getCoupons();
          this.isLoading = false;
        }).catch((err) => {
          Swal.fire({
            icon: 'error',
            text: err.data.response.message,
          });
          pushToastMessage(err.response.data.success, '更新優惠券');
          this.isLoading = false;
        });
    },
  },
  created() {
    this.getCoupons();
  },
  components: {
    pagination,
    couponModal,
    delModal,
  },
};
</script>
