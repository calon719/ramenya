import store from '@/store';

function checkBtnLoading(item) {
  return store.state.btnLoadingItems.includes(item);
}

export default checkBtnLoading;
