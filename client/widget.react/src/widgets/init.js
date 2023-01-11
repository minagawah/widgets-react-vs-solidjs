import Cookies from 'js-cookie';
import moment from 'moment';

import { debounce } from '@/lib/utils';
import { Result } from '@/lib/Result';

const worker = new SharedWorker('./build/widget.react.worker.js');

if (worker?.port) {
  worker.port.start();

  // Resize Handler
  const resize_handler = debounce(() => {
    worker.port.postMessage({
      action: 'resize',
      payload: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    });
  }, 500);

  window.addEventListener('resize', resize_handler, true);
  window.setTimeout(resize_handler, 200);

  // Error Handler
  worker.port.addEventListener('error', e => {
    console.error('[init]', e);
  });
}
