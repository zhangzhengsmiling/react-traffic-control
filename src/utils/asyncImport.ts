export default (path:string):Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      const module = import(path);
      return resolve(module);
    } catch(e) {
      return reject(e);
    }
  });
}