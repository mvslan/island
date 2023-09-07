Promise.resolve()
  .then(() => {
    console.log(1);
  })
  .finally(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  });
