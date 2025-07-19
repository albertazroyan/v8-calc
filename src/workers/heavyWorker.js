self.onmessage = function (e) {
  const { jobId, matrixSize } = e.data;
  const result = simulateHeavyCalculation(matrixSize);
  postMessage({ jobId, result });
};

function simulateHeavyCalculation(size) {
  let total = 0;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      total += Math.sqrt(i * j + 0.5);
    }
  }
  return total.toFixed(2);
}