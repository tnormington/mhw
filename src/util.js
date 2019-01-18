import { Range, List, Map } from "immutable"

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

export function removeOrAddFromList(list, item) {
  if (!List.isList(list))
    throw "must provide list to removeOrAddFromList util method"

  if (list.includes(item)) {
    // remove it
    console.log("items exists, removing...")
    list = list.delete(list.indexOf(item))
  } else {
    // add it
    console.log("item does not exist, adding...")
    list = list.push(item)
  }

  return list
}

// map over properties in fresh Map and set to data type of default
// if there are no properties in fresh array, set to default property

export function mapAndMerge(defaults, fresh) {
  if (!Map.isMap(defaults) || !Map.isMap(fresh))
    throw "must pass Map to mapAndMerge util method"

  let result

  result = fresh.map((option, key) => {
    const defaultOption = defaults.get(key)
    // let optKey = userOptions[key]

    if (List.isList(defaultOption)) {
      // optKey = List(optKey)
      return List(option)
    } else if (Map.isMap(defaultOption)) {
      // optKey = Map(optKey)
      return Map(option)
    } else {
      // optKey = optKey
      return option
    }
  })

  if (result) result = defaults.merge(fresh)

  return result
}

// // compare numbers a to b, return a string of the difference ie. a = 3 b = 5; output would be '-2'
// export function compareNumbersToString(a, b) {

// }

/**
 * @param {Map} map A Map containing atleast one list
 * @param {String} listKey The key inside of map that is the list you want to search
 * @param {String|Number} valueInList The value you would like to either add/remove from the List
 */

export function toggleListInMapByKey(map, listKey, valueInList) {
  if (!Map.isMap(map)) throw "must provide an immutable Map as first argument"
  const list = map.get(listKey)
  if (!list) throw `no List found at ${listKey} in ${map}`
  if (!List.isList(list))
    throw `item found at ${listKey} in ${map} is not a list`

  let result = Map(map)
  if (list.includes(valueInList)) {
    // remove the value
    result = result.update(listKey, l => l.delete(l.indexOf(valueInList)))
  } else {
    // add the value
    result = result.update(listKey, l => l.push(valueInList))
  }

  return result
}
