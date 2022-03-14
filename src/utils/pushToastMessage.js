import emitter from './emitter';

// 傳資料進去 toast
export default (fromPage, res, msg = '更新') => {
  emitter.emit('pushMessage', {
    fromPage,
    msg,
    res,
  });
};
