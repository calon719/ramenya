拉出來到 store

[x] cartDropDown: 
  [x]  刪除資料

[x] homePage:
  [x] 取得新品資料
  [x] 新增購物車

products:
[x] 取得 store 資料
[x] 變更切換頁方式
[x] 變更商品渲染數量
[x] 切換分頁時跳到頁面頂端

product:
[x] 將 products 資料改成從 store 取出 productsList
[x] 將 cart 資料改成從 store 取出 cartList
[x] 使用 store 來篩選 random 推薦
[x] 重構 addCart 方法
[x] 重構 isAdded 判斷

search:
[x] 將 searchInput 放回 ProductsSearch.vue 並使用 teleport 調整位置
[x] 使用 store 來取得資料
[x] 將 keyword 放到 store 裡面管理

cart
[x] 將 cartData 資料從 store 裡取得
[x] 清空購物車改成使用 actions 的 clearCart
[x] 刪除單一商品改成使用 actions 的 delCart
[x] 更改單一商品改成使用 actions 的 putCart
[x] 重構 coupon 取得方法、是否有使用的方法

first:
[x] 將 carts 資料從 store 裡取得

orderInfo:
[x] 將 carts 資料從 store 裡取得
[x] 修改：將 userData 存至 sessionStorage

orderConfirm:
[x] 將 carts 資料從 store 裡取得
[x] 修改：將 userData 從 sessionStorage 取得

orderConfirm:
[x] 修改：將 orderData 從 sessionStorage 刪除
[x] 導入 showErrMsg.js

共通全域：
  [x] 取得 cart 資料
  [x] 取得 products 資料
  [] isLoading
  [] 將 sweetalert 全轉為用 utils 裡的 showErrMessage
