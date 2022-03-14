# 開發中小紀錄
## 使用的 plugin
- Bootstrapa 5
- Axios
- Sweetalert2
- V-Calendar
- VeeValidate
- mitt
- vue-loading-overlay

## lucky wheel 元件
參考資料：
- [JS地下城:9F抽獎轉盤](https://medium.com/js%E5%9C%B0%E4%B8%8B%E5%9F%8E-if-99%E4%B9%98%E6%B3%95%E8%A1%A8/js%E5%9C%B0%E4%B8%8B%E5%9F%8E-9f%E6%8A%BD%E7%8D%8E%E8%BD%89%E7%9B%A4-92f940d06c)

## 遇到的問題
### UserProduct.vue 使用 router-link 前往其他商品畫面時資料有進來卻沒有重新渲染

原本程式碼：
```
<template>
<a href="#" @click.prevent="goOtherProduct(product.id)"></a>
</template>

<script>
export default {
  methods: {
    goOtherProduct(id) {
      this.$router.push(`/product/${id}`);
    },
  },
};
</script>
```
問題分析：
因為先進到下一個產品的畫面後，畫面先渲染完後向後端請求的商品資料才傳回來，所以畫面是使用前一個商品資料做渲染。
如果重新整理畫面就會正確渲染所點擊的商品畫面。

解決方法：
先取的資料後再進入所點擊的商品頁面。
修正後的程式碼：
```
<template>
<a href="#" @click.prevent="getProduct(product.id)"></a> // 改成觸發取得資料的請求 method
</template>

<script>
export default {
  methods: {
   getProduct(id = this.$route.params.id) {
    this.isLoading = true;
    this.$http.get(`${this.apiBase}/product/${id}`)
      .then((res) => {
        const { product } = res.data;
        this.product = product;

        // 修正處開始
        // 判斷上一頁是否也是 product 頁面
        if (JSON.stringify(this.product) !== '{}') {
        // 取得資料後再轉往所點選的商品頁面
        // 否則先進到畫面時資料還沒更新，畫面也不會更新
          this.isAddedCart = false;
          this.$router.push(`/product/${id}`);
        }
        // 修正處結束

        this.getProducts();
        this.isAlcohol = product.is_alcohol;
      }).catch((err) => {
        const msg = err.response.data.message;
        Swal.fire({
          icon: 'error',
          text: msg,
        });
        this.isLoading = false;
      });
    },   
  },
};
</script>
```

