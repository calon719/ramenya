# 開發中小紀錄
## 使用的 plugin
- Bootstrapa 5
- Axios
- Sweetalert2
- V-Calendar
- VeeValidate
- mitt
- vue-loading-overlay

<br>

## 首頁底部視覺動差設計
一開始使用 `scrollY` 發現 `section.subscription` 太下面觸及不到，改成計算 `body` 底部到可視視窗底部的距離。

<br>

## 進度條元件設計
1. 先將所有進度點都寫成完成的樣式
2. 設定當下步驟的樣式
3. 最後設定尚未完成的步驟樣式

參考資料：
- [Responsive Multi-Step Progress Bar](https://codepen.io/athimannil/pen/wWPYZQ)

<br>

## lucky wheel 元件
- 問題點：參考資料裡的是轉動指針，而自己想做的是轉動圓盤的動畫，除了 0 和 360 的倍數外，圓盤都不會轉到正確的位置。
- 解決方式：轉動指針是將指針轉往指定位置，而轉動圓盤是將指定的圓盤位置轉向不動的指針，如果用正數的話，轉完指定圈數後轉盤會依據剩下的數字順時針轉，也就是說假如指定位置在 30 度，轉完 5 圈後指定位置會從 30 度在順時針轉 30 度，而原本 330 度的位置就會跑到指針的地方。
  所以只要將數字轉為負數，指定位置就會從原本的位置逆時針轉並角度歸 0 ，轉盤就可以正常運作。

參考資料：
- [JS地下城:9F抽獎轉盤](https://medium.com/js%E5%9C%B0%E4%B8%8B%E5%9F%8E-if-99%E4%B9%98%E6%B3%95%E8%A1%A8/js%E5%9C%B0%E4%B8%8B%E5%9F%8E-9f%E6%8A%BD%E7%8D%8E%E8%BD%89%E7%9B%A4-92f940d06c)

<br>

## UserProduct.vue 使用 router-link 前往其他商品畫面時資料有進來卻沒有重新渲染
原本程式碼：
```vue
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
```vue
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
