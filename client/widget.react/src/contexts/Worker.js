import React, { useContext, createContext, useState, useEffect } from 'react';

// ----------------------
// WorkerContext
// ----------------------

const WorkerContext = createContext({
  worker: null,
});

// ----------------------
// WorkerProvider
// ----------------------

export const WorkerProvider = (props = {}) => {
  const [worker, setWorker] = useState(null);

  useEffect(() => {
    if (!worker) {
      setWorker(
        new SharedWorker(
          /* webpackChunkName: "worker" */ new URL('@/worker', import.meta.url)
        )
      );
    }

    return () => {
      if (worker) {
        worker.close();
        setWorker(null);
      }
    };
  }, []);

  return <WorkerContext.Provider value={{ worker }} {...props} />;
};

// ----------------------
// useWorker
// ----------------------

export const useWorker = () => useContext(WorkerContext);
