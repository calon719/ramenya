<template>
  <div class="luckyWheel">
    <div class="luckyWheel-indicator">
      <div class="luckyWheel-indicator-wrap">
        <div class="luckyWheel-indicator-shadow"></div>
        <button class="luckyWheel-btn" type="button"
          @click="drawLottery">抽獎</button>
      </div>
    </div>
    <div class="luckyWheel-inner" :style="`transition: ${transitionTime}s`">
      <div class="luckyWheel-inner-shadow"></div>
      <div class="luckyWheel-sector" v-for="(sector, i) in prizes" :key="sector"
        :style="`transform: ${drawFans(i)}; background-color: ${drawBgColor(i)};`">
        <p class="luckyWheel-sector-text">{{ prizesName[i] }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      innerEl: {},
      prizesEl: [],
      prize: '',
      prizes: [
        '1stANNIV90',
        '1stANNIV85',
        '1stANNIV80',
        '1stANNIV75',
        '1stANNIV65',
        '1stANNIV50',
      ],
      prizesName: [],
      transitionTime: 6,
      rotateTimes: 5,
      deg: 0,
      stopDeg: 0,
      isClicked: false,
      bgColors: [
        '#16a085',
        '#2980b9',
        '#34495e',
        '#f39c12',
        '#d35400',
        '#c0392b',
      ],
    };
  },
  methods: {
    drawFans(index) {
      this.deg = 360 / this.prizes.length; // 計算每個扇形面積
      const titls = -this.deg / 2; // 第一個角度介於 0 - deg / 2 和 deg / 2 之間，故 deg 要為負數
      const skewY = this.deg - 90; // 90 為四角形其中一角的角度，相減求得要變形的角度

      return `rotate(${titls + this.deg * index}deg) skewY(${skewY}deg)`;
    },
    drawBgColor(index) {
      let color = '';
      if (this.bgColors[index]) {
        color = this.bgColors[index];
      } else {
        const len = this.bgColors.length;
        color = this.bgColors[index - len];
      }
      return color;
    },
    drawLottery() {
      if (!this.isClicked) {
        this.prize = '';
        this.$emit('getPrize', this.prize);
        this.isClicked = true;

        const randomNum = Math.floor(Math.random() * this.prizes.length);
        this.prize = this.prizes[randomNum];

        // 總共要轉的角度
        let rotate = this.rotateTimes * 360 + randomNum * this.deg;

        // 前一次角度 + 這次角度並扣除上次停留的角度
        rotate -= (this.stopDeg % 360);
        this.stopDeg += rotate;

        this.innerEl.style.transform = `rotate(${-this.stopDeg}deg)`;

        this.prizesEl.forEach((el) => {
          el.classList.remove('active');
        });
        setTimeout(() => {
          this.$emit('getPrize', this.prize);
          localStorage.setItem('coupon', this.prize);
          this.prizesEl[randomNum].classList.add('active');
          this.isClicked = false;
        }, this.transitionTime * 1000);
      }
    },
  },
  mounted() {
    this.innerEl = document.querySelector('.luckyWheel-inner');
    this.prizesEl = document.querySelectorAll('.luckyWheel-sector');
    this.prizesEl = [...this.prizesEl];
    this.prizesName = this.prizes.map((prize) => {
      let str = prize;
      str = prize.split('');
      const len = str.length;
      if (str[len - 1] > 0) {
        str = str.splice(-2, 2);
      } else {
        str = str.splice(-2, 1);
      }
      return `${str.join('')} 折`;
    });
  },
};
</script>

<style lang="scss" scoped>
@import './../assets/stylesheet/all';

.luckyWheel {
  height: 300px;
  width: 300px;
  border-radius: 50%;
  border: 1px solid #dee2e6;
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, .1);
  position: relative;
  &-indicator {
    &::before {
      content: '';
      width: 0;
      height: 0;
      border: solid;
      border-width: 20px 10px;
      border-color: transparent;
      border-bottom-color: #fff;
      position: absolute;
      top: calc(50% - 80px - 10px);
      left: 50%;
      transform:  translateX(-50%);
      z-index: 10;
    }
    &-wrap {
      position: absolute;
      top: 50%;
      left: 50%;
      transform:  translate(-50%, -50%);
      z-index: 5;
      background-color: #fff;
      border: 10px solid #fff;
      box-shadow: 0 0 5px 2px rgba(0, 0, 0, .1);
      border-radius: 50%;
      overflow: hidden;
    }
  }
  &-btn {
    font-size: 1.25rem;
    padding: 29px 24px;
    background-color: rgba(247, 247, 247, .75);
    border: none;
    user-select: none;
    border-radius: 50%;
    box-shadow: inset 0 0 5px 1px rgba(0, 0, 0, .1);
    &:hover {
      opacity: .75;
      color: #dc3545;
    }
  }
  &-inner {
    overflow: hidden;
    position: relative;
    padding: 0;
    margin: 0;
    list-style: none;
    height: 100%;
    width: 100%;
    border-radius: 50%;
    border: 10px solid #fff;
    &-shadow {
      height: 100%;
      width: 100%;
      box-shadow: inset 4px 4px 5px rgba(0, 0, 0, .2);
      border-radius: 50%;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 2;
    }
  }
  &-sector{
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    height: 50%;
    transform-origin: left bottom;
    &.active {
      box-shadow: inset 0 0 25px 5px #ffff05;
      z-index: 1;
    }
    &-text {
      font-size: 1.25rem;
      color: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-107%, -27%) rotate(49.25deg) skewX(10deg);
    }
  }
}
@include media-breakpoint-up(sm) {
  .luckyWheel {
    height: 350px;
    width: 350px;
  }
}
@include media-breakpoint-up(md) {
  .luckyWheel {
    height: 380px;
    width: 380px;
    &-indicator {
      &::before {
        border-width: 20px 10px;
        position: absolute;
        top: calc(50% - 80px - 10px);
        left: 50%;
        transform:  translateX(-50%);
      }
      &-wrap {
        border: 10px solid #fff;
      }
    }
  }
}
@include media-breakpoint-up(lg) {
  .luckyWheel {
    height: 500px;
    width: 500px;
  }
}
</style>
