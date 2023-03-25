
/** Use to modify page URLs from backend to frontend.
 * The default WordPress tools don't work.
 * When creating a post, an error occurs in WordPress. */

export const modifyUrlBackendToFrontend = (data: object): object => {
  // console.log('modifyUrlBackendToFrontend start', data);
  modifyUrl(data);

  function modifyUrl(data: object) {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const element = data[key];
        if (typeof element === 'object') {
          modifyUrl(element);
        } else {
          let result = key.match(/^url$/);
          if (result) {
            if (typeof element === 'string' && process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL) {
              const elementReplaced = element.replace(
                process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
                // process.env.NEXT_PUBLIC_SITE_URL
                ''
              );
              data[key] = elementReplaced;
            }
          }
        }
      }
    }
  }

  // console.log('modifyUrlBackendToFrontend end', data);
  return data;
};

