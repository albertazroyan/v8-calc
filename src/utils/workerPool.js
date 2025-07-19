export class WorkerPool {
  constructor(size) {
    this.poolSize = size;
    this.workers = [];
    this.queue = [];
    this.active = new Map();
    for (let i = 0; i < size; i++) {
      const worker = new Worker(new URL("../workers/heavyWorker.js", import.meta.url));
      worker.onmessage = (e) => this._handleResult(e);
      this.workers.push(worker);
    }
    this.nextJobId = 1;
    this.callbacks = {};
  }

  _handleResult(e) {
    const { jobId, result } = e.data;
    if (this.callbacks[jobId]) {
      this.callbacks[jobId](result);
      delete this.callbacks[jobId];
    }
    this.active.delete(jobId);
    this._processQueue();
  }

  _processQueue() {
    if (this.queue.length === 0) return;
    const available = this.workers.find(w => ![...this.active.values()].includes(w));
    if (!available) return;
    const { data, resolve } = this.queue.shift();
    const jobId = this.nextJobId++;
    this.active.set(jobId, available);
    this.callbacks[jobId] = resolve;
    available.postMessage({ ...data, jobId });
  }

  run(data) {
    return new Promise((resolve) => {
      this.queue.push({ data, resolve });
      this._processQueue();
    });
  }
}