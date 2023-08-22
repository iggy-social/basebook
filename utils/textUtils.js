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
    return '<div></div><img class="img-fluid rounded" style="max-height: 400px;" src="' + url + '" />';
  })
}

export function imgWithoutExtensionParsing(text) {
  // if image doesn't have an extension, it won't be parsed by imgParsing
  // so we need to parse it here
  // but image link needs to end with "?img" to be parsed (otherwise frontend will think it's a link)
  const imageRegex = /(http|https|ipfs):\/\/\S+\?img/;

  if (!imageRegex.test(text)) { return text };

  return text.replace(imageRegex, function(url) {
    return '<img class="img-fluid rounded" style="max-height: 400px;" src="' + url + '" />';
  })
}

export function textLengthWithoutBlankCharacters(text) {
  return text.replace(/\s/g, '').replace(/[^\x00-\x7F]/g, "").trim().length;
}

export function urlParsing(text) {
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