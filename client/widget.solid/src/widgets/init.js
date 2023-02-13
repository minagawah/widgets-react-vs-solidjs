import Cookies from 'js-cookie';
import PubSub from 'pubsub-js';
import moment from 'moment';

import { debounce, check_support, show_native_error } from '@/lib/utils';

window.PubSub = PubSub;

const resize_handler = debounce(() => {
  window.PubSub.publish('resize', {
    origin: 'init',
    payload: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
  });
}, 500);

window.addEventListener('resize', resize_handler, true);
window.setTimeout(resize_handler, 200);

setTimeout(() => {
  window.PubSub.publish('test', {
    action: 'test',
    payload: {
      message: 'hello',
    },
  });
}, 2000);
