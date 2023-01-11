import { useState, useEffect } from 'react';

export const useWorker = () => {
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

  return { worker };
};
