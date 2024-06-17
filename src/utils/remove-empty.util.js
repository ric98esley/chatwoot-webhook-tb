// Modified from here: https://stackoverflow.com/a/43781499
// Modified from here: https://github.com/readmeio/remove-undefined-objects

// This utility class is used to remove empty objects from a given object.

// The isObject() function checks if a value is an object and not an array.
function isObject(obj) {
  return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
}

// The isEmptyObject() function checks if an object is empty.
function isEmptyObject(obj) {
  return typeof obj === 'object' && obj !== null && !Object.keys(obj).length && !Object.getOwnPropertySymbols(obj).length;
}

// The stripEmptyObjects() function recursively removes empty objects and nullish arrays from an object.
function stripEmptyObjects(obj) {
  const cleanObj = obj;

  // If is primitive, return as is.
  if (!isObject(obj) && !Array.isArray(cleanObj)) {
    return cleanObj;
  } else if (obj === null) {
    return null;
  }

  // If it's an object, we need to iterate over each key and recursively clean them.
  if (!Array.isArray(cleanObj)) {
    // Use Reflect.ownKeys() to get all keys of an object, including non-enumerable ones.
    Reflect.ownKeys(cleanObj).forEach(key => {
      let value = cleanObj[key];

      if (typeof value === 'object' && value !== null) {
        value = stripEmptyObjects(value);

        if (isEmptyObject(value)) {
          delete cleanObj[key];
        } else {
          cleanObj[key] = value;
        }
      } else if (value === undefined) {
        // Undefined properties in an object should be removed.
        delete cleanObj[key];
      } else if (value === null) {
        // Null properties in an object should remain!
      }
    });

    return cleanObj;
  }

  //If it's an array, we need to iterate over each element and recursively clean them.
  cleanObj.forEach((o, idx) => {
    let value = o;
    if (typeof value === 'object' && value !== null) {
      value = stripEmptyObjects(value);
      if (isEmptyObject(value)) {
        delete cleanObj[idx];
      } else {
        cleanObj[idx] = value;
      }
    } else if (value === null) {
      // Null entries within an array should be removed.
      delete cleanObj[idx];
    }
  });

  // Since deleting a key from an array will retain an undefined value in that array, we need to
  // filter them out.
  return cleanObj.filter(el => el !== undefined);
}

function removeUndefinedObjects(obj) {
  if (obj === undefined) {
    return undefined;
  }

  // Then we recursively remove all empty objects and nullish arrays.
  let withoutUndefined = stripEmptyObjects(obj);

  return withoutUndefined;
}

export function removeEmpty(obj) {
  return removeUndefinedObjects(obj);
}