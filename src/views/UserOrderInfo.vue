<template>
  <div class="userOrderInfo">
    <main class="footer-bottom">
      <div class="container bg-white mb-5 py-5 px-md-5">
        <div class="row justify-content-center mb-5">
          <div class="col-12 col-md-8 col-lg-7">
            <ul class="multi-steps steps-one">
              <li>確認品項</li>
              <li class="active">填寫資料</li>
              <li>確認資料</li>
              <li>完成訂單</li>
            </ul>
          </div>
        </div>

        <Form ref="form" v-slot="{ errors, meta }" @submit="goOrderConfirm">
          <div class="row justify-content-center mb-5">
            <div class="col-12 col-md-10 col-lg-8">
              <small class="text-muted">
                <span class="text-danger">*</span>
                為必填資料
              </small>
              <div class="mb-3">
                <label class="form-label" for="name">
                  姓名
                  <span class="text-danger">*</span>
                </label>
                <Field id="name" class="form-control" type="text"
                  name="姓名" placeholder="請輸入姓名"
                  rules="required" v-model="userData.user.name"
                  :class="{ 'is-invalid': errors['姓名'] }" />
                <ErrorMessage name="姓名" class="invalid-feedback" />
              </div>
              <div class="mb-3">
                <label class="form-label" for="tel">
                  電話
                  <span class="text-danger">*</span>
                </label>
                <Field id="tel" class="form-control" type="tel"
                  name="電話" placeholder="請輸入電話，室內電話請省略 - ，ex. 012345678"
                  rules="required|numeric|min:9|max:10"
                  v-model="userData.user.tel"
                  :class="{ 'is-invalid': errors['電話'] }" />
                <ErrorMessage name="電話" class="invalid-feedback" />
              </div>
              <div class="mb-3">
                <label class="form-label" for="email">
                  Email
                  <span class="text-danger">*</span>
                </label>
                <Field id="email" class="form-control" type="email"
                  name="Email" placeholder="請輸入 Email"
                  rules="required|email" v-model="userData.user.email"
                  :class="{ 'is-invalid': errors['Email'] }" />
                <ErrorMessage name="Email" class="invalid-feedback" />
              </div>
              <div class="mb-3">
                <label class="form-label" for="address">
                  地址
                  <span class="text-danger">*</span>
                </label>
                <Field id="address" class="form-control" type="text"
                  name="地址" placeholder="請輸入地址"
                  rules="required" v-model="userData.user.address"
                  :class="{ 'is-invalid': errors['地址'] }" />
                <ErrorMessage name="地址" class="invalid-feedback" />
              </div>
              <div class="mb-3">
                <label class="form-label" for="message">留言</label>
                <textarea class="p-3 form-control" id="message" style="height: 250px;"
                  placeholder="請輸入留言" v-model="userData.message"></textarea>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-5 col-md-4 col-lg-3 col-xl-2 me-auto">
              <a href="#" class="btn btn-outline-secondary w-100"
                @click.prevent="backPrePage">
                <i class="bi bi-arrow-left"></i>
                返回上一頁
              </a>
            </div>
            <div class="col-5 col-md-4 col-lg-3 col-xl-2">
              <button type="submit" class="btn btn-primary w-100"
                :disabled="!meta.valid">
                下一步
                <i class="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>
        </Form>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: {
        user: {},
        message: '',
      },
    };
  },
  inject: ['showErrMsg'],
  computed: {
    cartData() {
      return this.$store.state.cartList.carts;
    },
  },
  methods: {
    goOrderConfirm() {
      if (!this.cartData?.length) {
        this.showErrMsg('購物車沒有商品！');
        this.$router.replace({
          name: 'UserCart',
        });
      } else {
        const data = JSON.stringify(this.userData);
        sessionStorage.setItem('orderData', data);
        this.$router.push({
          name: 'UserOrderConfirm',
        });
      }
    },
    backPrePage() {
      this.$router.go(-1);
    },
  },
};
</script>
