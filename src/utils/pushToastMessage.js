import emitter from './emitter';

// 傳資料進去 toast
export default (res, msg = '更新') => {
  emitter.emit('pushMessage', {
    msg,
    res,
    status: true,
  });
};
