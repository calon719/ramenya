import emitter from './emitter';

export default (fromPage, res, msg = '更新') => {
  emitter.emit('pushMessage', {
    fromPage,
    msg,
    res,
  });
};
