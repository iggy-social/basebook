exports.handler = async function (event, context) {
  const metascraper = require('metascraper')([
    require('metascraper-description')(),
    require('metascraper-image')(),
    require('metascraper-title')()
  ])

  const url = event.queryStringParameters.url;

  try {
    const response = await fetch(url); 
    const html = await response.text();

    const metadata = await metascraper({ html, url });

    const finalMetadata = {
      "url": url,
      "title": metadata.title,
      "description": metadata.description,
      "image": { 
        url: metadata.image
      }
    };

    if (url.startsWith("https://opensea.io") && metadata.title == "Access denied") {
      finalMetadata.title = "OpenSea";
      finalMetadata.description = "OpenSea is the world's first and largest web3 marketplace for NFTs and crypto collectibles. Browse, create, buy, sell, and auction NFTs using OpenSea today.";
      finalMetadata.image.url = "https://static.opensea.io/og-images/Metadata-Image.png";
    } else if (url.startsWith("https://dune.com") && metadata.title.startsWith("Attention Required")) {
      finalMetadata.title = "Dune";
      finalMetadata.description = "Blockchain ecosystem analytics by and for the community. Explore and share data from Ethereum, Polygon, Arbitrum, Optimism, and others for free.";
      finalMetadata.image.url = "https://dune.com/assets/poster-1440w.png";
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ data: finalMetadata }),
    };
    
    //return metadata;
  } catch (error) {
    console.error('Error fetching Twitter card metadata:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
    };
  }
  
};