const arr = [];

const make_handler = port => event => {
  if (port && event?.data) {
    if (event.data?.action === 'close') {
      port.close();
    } else {
      arr.forEach(p => {
        p.postMessage(event.data);
      });
    }
  }
};

// Wait for connection.
onconnect = e => {
  const port = e?.ports?.[0];

  if (port) {
    arr.push(port);

    // Register an event handler for `onmessage`.
    port.onmessage = make_handler(port);

    port.start();
  }
};
