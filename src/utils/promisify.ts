const promisify = fn => (...args) => new Promise((resolve, reject) => {
  fn(...args, (err:Error, data) => {
    if(err) {
      return reject(err);
    }
    return resolve(data);
  })
})

export default promisify;
