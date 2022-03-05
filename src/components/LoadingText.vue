<template>
  <div class="loading-bg" v-if="isLoading">
    <div class="loading-text rotate-scale-up-ver">
      <p class="fs-1 d-flex align-items-center">
        <span style="--s:1">
          <span class="material-icons-outlined fs-1 me-2">
            ramen_dining
          </span>
        </span>
        <span style="--s:2">加</span>
        <span style="--s:3">載</span>
        <span style="--s:4">中</span>
        <span style="--s:5">.</span>
        <span style="--s:6">.</span>
        <span style="--s:7">.</span>
      </p>
    </div>
  </div>
</template>

<style>
.loading-bg{
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 2000;
  background: #000;
  opacity: .7;
  cursor: wait;
}

.loading-text{
  font-size: 2.5rem;
  color: #fff;
}
.loading-text span{
  margin-right: 1.5rem;
}

/* animation */
.rotate-scale-up-ver span {
  -webkit-animation: rotate-scale-up-ver 1s linear both infinite calc(0.5s * var(--s));
  -moz-animation: rotate-scale-up-ver 1s linear both infinite calc(0.5s * var(--s));
  animation: rotate-scale-up-ver 1.5s linear both infinite calc(0.3s * var(--s));
}

@-webkit-keyframes rotate-scale-up-ver {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  25% {
    -webkit-transform: translateY(-20px);
    transform: translateY(-20px);
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}
@-moz-keyframes rotate-scale-up-ver {
  0% {
    -moz-transform: translateY(0);
    transform: translateY(0);
  }
  25% {
    -moz-transform: translateY(-20px);
    transform: translateY(-20px);
  }
  100% {
    -moz-transform: translateY(0);
    transform: translateY(0);
  }
}
@keyframes rotate-scale-up-ver {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  25% {
    -webkit-transform: translateY(-20px);
    transform: translateY(-20px);
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}
</style>

<script>
export default {
  data() {
    return {
      status: false,
    };
  },
  props: ['isLoading'],
  mounted() {
    this.status = this.isLoading;
  },
};
</script>
