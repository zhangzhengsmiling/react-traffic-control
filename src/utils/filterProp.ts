// function filterProp<P, K extends keyof P>(obj: P, filterKey: K){
//   const target = Object.keys(obj)
//                   .filter(key => key !== filterKey)
//                   .reduce((temp, cur) => {
//                     return {
//                       [cur]: obj[cur],
//                       ...temp,
//                     }
//                   }, {})
//   return target;
// }
const filterProp = <P, K extends keyof P>(obj: P, filterKey: K) => {
    const target = Object.keys(obj)
                    .filter(key => key !== filterKey)
                    .reduce((temp, cur) => {
                      return {
                        [cur]: obj[cur],
                        ...temp,
                      }
                    }, {})
    return target;
  }

export default filterProp;
