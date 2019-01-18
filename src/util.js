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

/**
 * @param {Object} item The current item in the .filter method
 * @param {Map} filter A Map of the current applied filters
 * @param {Map} userOptions A Map of the current applied userOptions
 * @return {boolean} Returns true if the item should remain in the list, false to filter it out
 */
export function itemFilterMethod(item, filters, userOptions) {
  const weaponTypes = filters.get("weaponTypes"),
    elementTypes = filters.get("elementTypes"),
    rarity = filters.get("rarity"),
    damageTypes = filters.get("damageTypes"),
    groups = filters.get("groups"),
    favorites = userOptions.get("favorites"),
    comparisons = userOptions.get("comparisons"),
    materials = filters.get("materials"),
    search = filters.get("search"),
    armorTypes = filters.get("armorTypes")

  // default let all items through
  let result = true

  // check search keywords

  if (search) {
    result = false
    if (item.name.toLowerCase().includes(search.toLowerCase())) result = true
  }

  // check item groups
  if (groups.size > 0) {
    if (groups.includes("favorites") && !favorites.includes(item.id))
      return false
    if (groups.includes("comparisons") && !comparisons.includes(item.id))
      return false
  }

  // check weapon types
  if (weaponTypes.size > 0 && !weaponTypes.includes(item.type)) return false

  // check rarity
  if (rarity.size > 0 && !rarity.includes(item.rarity)) return false

  // Check damage types
  if (damageTypes.size > 0 && !damageTypes.includes(item.attributes.damageType))
    return false

  if (elementTypes.size > 0) {
    const weaponElements = List(item.elements).map(e => e.type)

    if (elementTypes.isSubset(weaponElements)) {
      result = true
    } else {
      return false
    }
  }

  // check selected materials

  if (materials.size) {
    const { craftingMaterials, upgradeMaterials } = item.crafting

    const weaponMaterials = item.crafting.craftable
      ? craftingMaterials
      : upgradeMaterials

    // materials.forEach(mat => {
    //   if (weaponMaterials.every(weaponMat => mat.value === weaponMat.item.id))
    //     result = true
    // })

    const selectedMaterialIdList = materials.map(mat => mat.value)
    const weaponMaterialIdList = List(weaponMaterials.map(mat => mat.item.id))

    if (selectedMaterialIdList.isSubset(weaponMaterialIdList)) {
      result = true
    } else {
      return false
    }
    // console.log(selectedMaterialIdList.toJS())
    // console.log(weaponMaterialIdList.toJS())
    // debugger

    // weaponMaterials.forEach(weaponMat => {

    // })
  }

  if (armorTypes.size) {
    if (armorTypes.includes(item.type)) {
      result = true
    } else {
      return false
    }
  }

  return result
}
