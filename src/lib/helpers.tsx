import { styled } from '@mui/material/styles';


/** Use to modify page URLs from backend to frontend.
 * The default WordPress tools don't work.
 * When creating a post, an error occurs in WordPress. */

import { IPostResponseShort } from '@/interfaces/posts.interfaces';
import TextField from '@mui/material/TextField';

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
            if (
              typeof element === 'string' &&
              process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL
            ) {
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

export const getCategory = (allPosts: IPostResponseShort[]) => {
  const categories = [];
  allPosts.map((item) =>
    item.node.categories.edges.map((i) => categories.push(i.node.name))
  );
  const newSet = new Set(categories);
  const uniqCat = Array.from(newSet);
  const filteredByUncategorized = uniqCat.filter(
    (item) => item !== 'Uncategorized'
  );
  return filteredByUncategorized;
};


export const FindWhiteTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#fff',
  },
  '& label.MuiFormLabel-colorPrimary': {
    color: '#A6A2A4',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#fff',
  },
  '& .MuiInputBase-root-MuiInput-root:before': {
    color: '#A6A2A4',
  },
  // multi text color
  '& .MuiInputBase-input.MuiInput-input.MuiInputBase-inputMultiline.css-66dh3a-MuiInputBase-input-MuiInput-input': {
    color: '#fff',
  },
  // multi border noHover
  '& .css-94tsml-MuiInputBase-root-MuiInput-root:before': {
    borderBottomColor: '#A6A2A4',
  },
  // multi border noHover
  '& .css-94tsml-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before': {
    borderBottomColor: '#A6A2A4',
  },
  '& .css-1g30tq1-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before':
    {
      borderBottomColor: '#A6A2A4',
    },
  '& .css-1g30tq1-MuiInputBase-root-MuiInput-root:before': {
    borderBottomColor: '#A6A2A4',
  },

  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#A6A2A4',
    },
    '&:hover fieldset': {
      borderColor: '#fff',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#fff',
    },
  },
});