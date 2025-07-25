self.onmessage = function (e) {
  const { data, query } = e.data;
  const q = query.toLowerCase();

  const filtered = data.filter((item) => item.toLowerCase().includes(q));

  postMessage(filtered);
};
