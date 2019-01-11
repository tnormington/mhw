import { Range } from "immutable"

export const searchArray = (key, arr, value) => {
  let result = false
  arr.forEach(item => {
    if (item[key] === value) {
      result = item
    }
  })

  return result
}

export const titleize = title => {
  if (!title) return false
  return title.charAt(0).toUpperCase() + title.slice(1).replace(/-/g, " ")
}

export const chunkList = (list, chunkSize = 5) => {
  if (!list) return false

  return Range(0, list.count(), chunkSize).map(chunkStart =>
    list.slice(chunkStart, chunkStart + chunkSize)
  )
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
