import sweetAlert from 'sweetalert2';

function showErrMsg(msg) {
  sweetAlert.fire({
    icon: 'error',
    text: msg,
  });
}

export default showErrMsg;
