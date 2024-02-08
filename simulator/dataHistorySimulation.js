function dataHistorySimulation(scale, max, min) {
  let stamp = new Date().valueOf();
  stamp = Math.floor(stamp / 1000);
  console.log(stamp);
  let res = stamp % (max - min) + min;
  console.log(res/scale);
}

dataHistorySimulation(100, 160, 110);