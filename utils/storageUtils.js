const usernameExtension = "-username";
const collectionExtension = "-collection";

export function fetchCollection(window, cAddress) {
  if (!window) {
    console.log("No window object in fetchCollection");
    return null;
  }

  try {
    const config = useRuntimeConfig();
    const expiration = config.expiryCollections; // in milliseconds
    const currentTime = new Date().getTime();

    const objectString = window.localStorage.getItem(String(cAddress).toLowerCase()+collectionExtension);

    if (!objectString) {
      return null;
    }

    const obj = JSON.parse(objectString);

    // check if expired (expiration = 0 means never expire)
    if (expiration != 0 && (obj.stored + expiration < currentTime)) {
      return null;
    }

    if (typeof(obj) == "object") {
      return obj;
    }
    
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function storeCollection(window, cAddress, collectionObject) {
  if (!window) {
    console.log("No window object in storeCollection");
    return null;
  }

  const timestamp = new Date().getTime();

  collectionObject["stored"] = timestamp;

  window.localStorage.setItem(String(cAddress).toLowerCase()+collectionExtension, JSON.stringify(collectionObject));
}

export function fetchUsername(window, userAddress) {
  if (!window) {
    console.log("No window object in fetchUsername");
    return null;
  }

  try {
    const config = useRuntimeConfig();
    const expiration = config.expiryUsernames; // in milliseconds
    const currentTime = new Date().getTime();

    const usernameObjectString = window.localStorage.getItem(String(userAddress).toLowerCase()+usernameExtension);

    if (!usernameObjectString) {
      return null;
    }

    const usernameObject = JSON.parse(usernameObjectString);

    // check if username is expired (expiration = 0 means never expire)
    if (expiration != 0 && (usernameObject.stored + expiration < currentTime)) {
      return null;
    }

    if (usernameObject.username) {
      return usernameObject.username;
    }
    
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function storeUsername(window, userAddress, username) {
  if (!window) {
    console.log("No window object in storeUsername");
    return null;
  }

  const timestamp = new Date().getTime();

  const usernameObject = {
    username: username,
    stored: timestamp
  }

  window.localStorage.setItem(String(userAddress).toLowerCase()+usernameExtension, JSON.stringify(usernameObject));
}