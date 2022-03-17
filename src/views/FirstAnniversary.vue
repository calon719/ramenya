<template>
  <cartDropdown></cartDropdown>
  <div class="anniversary footer-bottom">
    <header class="banner">
      <h2 class="banner-title fs-1">歡慶一週年</h2>
    </header>

    <div class="content container">
      <p class="content-text fs-4">慶祝拉麵屋一週年，只要在活動期間參加幸運大轉盤活動，
        就有機會抽中最高打 5 折優惠券，快來試試你的好手氣吧！</p>
      <div class="row g-3 g-md-5 justify-content-center">
        <div class="col-12 col-md-7 d-flex justify-content-center order-2 order-md-1">
          <luckyWheel @get-prize="getPrize"></luckyWheel>
        </div>
        <div class="col-12 col-md-5 order-1 order-md-2">
          <p class="fs-4 mt-5">你所抽中的獎項是：
            <br>
            <span :class="{ 'invisible': !prize.split('').length }"
            class="fs-2 text-danger text-nowrap">
              {{ prizeName }} 折優惠券
              <br>
              優惠券號碼：{{ prize }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import luckyWheel from '@/components/LuckyWheel.vue';
import cartDropdown from '@/components/CartDropdown.vue';

export default {
  data() {
    return {
      prize: '',
    };
  },
  computed: {
    prizeName() {
      let str = this.prize.split('');
      const len = str.length;
      if (str[len - 1] > 0) {
        str = str.splice(-2, 2);
      } else {
        str = str.splice(-2, 1);
      }
      return str.join('');
    },
  },
  methods: {
    getPrize(result) {
      this.prize = result;
    },
  },
  components: {
    cartDropdown,
    luckyWheel,
  },
};
</script>
