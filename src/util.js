export const searchArray = (key, arr, value) => {
  let result = false
  arr.forEach(item => {
    if (item[key] === value) {
      result = item
    }
  })

  return result
}

// export const checkForOrderObject = order => {
//   if (order.length > 0) {
//     const removeMe = []
//     // loop through each order object checking for a match
//     // Check matching key directions and change if 'ASC', remove if 'DESC'
//     order.forEach((item, i) => {
//       if (item.key === obj.key) {
//         if (item.direction === "ASC") {
//           item.direction = "DESC"
//           return
//         }

//         if (item.direction === "DESC") {
//           removeMe.push(i)
//         }
//       }
//     })

//     // remove any order objects targetted in earlier loop
//     if (removeMe.length > 0) {
//       removeMe.forEach(i => order.splice(i, 1))
//     }
//   } else {
//     order.push(obj)
//   }

//   return {
//     order
//   }

export const basicCopy = item => {
  return JSON.parse(JSON.stringify(item))
}
