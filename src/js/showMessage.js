import Notify from 'simple-notify';
import 'simple-notify/dist/simple-notify.min.css';

export default function showMessage(type, text) {
  new Notify({
    status: `${type}`, //'error', 'warning','success'
    title: `${text}`,
    effect: 'slide',
    speed: 300,
    customClass: null,
    customIcon: null,
    showIcon: true,
    showCloseButton: true,
    autoclose: true,
    autotimeout: 3000,
    gap: 20,
    distance: 20,
    type: 3,
    position: 'top right',
  });
}
