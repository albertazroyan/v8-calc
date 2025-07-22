self.onmessage = function(e) {
  const { size } = e.data;
  let total = 0;
  for(let i = 0; i < size; i++) {
    for(let j = 0; j < size; j++) {
      total += Math.sqrt(i * j + 0.5);
    }
  }
  postMessage(total.toFixed(2));
};
