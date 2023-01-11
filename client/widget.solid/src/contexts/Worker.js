import { createContext, createSignal, createEffect, onCleanup } from 'solid-js';

// ----------------------
// WorkerContext
// ----------------------

export const WorkerContext = createContext([{ worker: null, ready: false }]);

// ----------------------
// WorkerProvider
// ----------------------

export const WorkerProvider = props => {
  const [worker, setWorker] = createSignal();

  createEffect(() => {
    if (!worker()) {
      setWorker(
        new SharedWorker(
          /* webpackChunkName: "worker" */ new URL('@/worker', import.meta.url)
        )
      );
    }
  });

  onCleanup(() => {
    if (worker()) {
      worker.port.close();
      setWorker(void 0);
    }
  });

  return (
    <WorkerContext.Provider value={[worker]}>
      {props.children}
    </WorkerContext.Provider>
  );
};
