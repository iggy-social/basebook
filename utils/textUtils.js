export function findFirstCollectionUrl(text) {
  // if there is an NFT collection url (from our website) in the text, return it as address string
  // example: 
  //   - input: https://sgb.chat/nft/collection?id=0x5923c15079AF3E14FBF96bd2fC1127633d42Ff28 
  //   - output: 0x5923c15079AF3E14FBF96bd2fC1127633d42Ff28

  const config = useRuntimeConfig();

  let urlRegex;

  try {
    urlRegex = new RegExp('(https?:\\/\\/(?!.*\\.(jpg|png|jpeg|img|gif|pdf|docx))[^\\s]+)(?<![,.:;?!\\-\\"\')])', 'g');
  } catch (error) {
    // fallback to simplified regex (without lookbehinds) in case of an old browser or Safari
    urlRegex = /(https?:\/\/(?!.*\.(jpg|png|jpeg|img|gif|pdf|docx))[^\s]+)/g;
  }

  const match = text.match(urlRegex);

  if (match) {
    const url = match[0];

    if (url.startsWith(config.projectUrl+"/nft/collection")) {
      return url.split("?id=")[1]; // return address string
    }

    return null;
  }
  
  return null;
}

export function findFirstUrl(text) {
  const config = useRuntimeConfig();

  let urlRegex;

  try {
    urlRegex = new RegExp('(https?:\\/\\/(?!.*\\.(jpg|png|jpeg|img|gif|pdf|docx))[^\\s]+)(?<![,.:;?!\\-\\"\')])', 'g');
  } catch (error) {
    // fallback to simplified regex (without lookbehinds) in case of an old browser or Safari
    urlRegex = /(https?:\/\/(?!.*\.(jpg|png|jpeg|img|gif|pdf|docx))[^\s]+)/g;
  }

  const match = text.match(urlRegex);

  if (match) {
    const url = match[0];

    if (
      url.startsWith("https://www.youtube.com") || 
      url.startsWith("http://www.youtube.com") ||
      url.startsWith("https://youtu.be") || 
      url.startsWith("http://youtu.be")
    ) {
      // ignore youtube embeds
      return null;
    } else if (url.startsWith(config.projectUrl+"/nft/collection")) {
      // ignore collection links from our website
      return null;
    }

    return url;
  }
  
  return null;
}

export function getImageFromText(text) {
  let imageRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i;
  let imageLinks = text.match(imageRegex);

  if (!imageLinks) { 
    imageRegex = /(http|https|ipfs):\/\/\S+\?.img/;
    imageLinks = text.match(imageRegex);
  };

  if (!imageLinks) { return "" };

  return imageLinks[0];
}

export function imgParsing(text) {
  const imageRegex = /(?:https?:\/\/(?:www\.)?)?(?:[-\w]+\.)+[^\s]+\.(?:jpe?g|gif|png|img)/gi;
  //const imageRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i;

  if (!imageRegex.test(text)) { return text };

  return text.replace(imageRegex, function(url) {
    return '<div></div><img class="img-fluid rounded" style="max-height: 500px;" src="' + url + '" />';
  })
}

export function imgWithoutExtensionParsing(text) {
  // if image doesn't have an extension, it won't be parsed by imgParsing
  // so we need to parse it here
  // but image link needs to end with "?img" to be parsed (otherwise frontend will think it's a link)
  const imageRegex = /(http|https|ipfs):\/\/\S+\?img/;

  if (!imageRegex.test(text)) { return text };

  return text.replace(imageRegex, function(url) {
    return '<img class="img-fluid rounded" style="max-height: 500px;" src="' + url + '" />';
  })
}

export function textLengthWithoutBlankCharacters(text) {
  return text.replace(/\s/g, '').replace(/[^\x00-\x7F]/g, "").trim().length;
}

export function urlParsing(text) {
  const config = useRuntimeConfig();

  let urlRegex;

  try {
    urlRegex = new RegExp('(https?:\\/\\/(?!.*\\.(jpg|png|jpeg|img|gif|pdf|docx))[^\\s]+)(?<![,.:;?!\\-\\"\')])', 'g');
  } catch (error) {
    // fallback to simplified regex (without lookbehinds) in case of an old browser or Safari
    urlRegex = /(https?:\/\/(?!.*\.(jpg|png|jpeg|img|gif|pdf|docx))[^\s]+)/g;
  }

  if (!urlRegex.test(text)) { return text };

  return text.replace(urlRegex, function(url) {
    if (url.startsWith("https://www.youtube.com/embed/")) {
      // ignore youtube embeds
      return url;
    } else if (url.endsWith("?.img") || url.endsWith("?img")) {
      // ignore urls ending with "?.img" beause they represent images (even though they don't have an image extension)
      return url;
    } else if (url.startsWith(config.projectUrl+"/nft/collection")) {
      // ignore collection links from our website
      return url;
    }

    return '<a target="_blank" href="' + url + '">' + url + '</a>';
  })
}

export function youtubeParsing(text) {
  const ytRegex = /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/g;

  if (!ytRegex.test(text)) { return text };

  return text.replace(ytRegex, function(url) {
    const videoId = url.match(/(?:https?:\/\/)?(?:www\.|m\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\/?\?v=|\/embed\/|\/)([^\s&\?\/\#]+)/)[1];

    return "<iframe class='rounded' width='100%' height='315' src='https://www.youtube.com/embed/" + videoId + "' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share' allowfullscreen></iframe>";
  })
}