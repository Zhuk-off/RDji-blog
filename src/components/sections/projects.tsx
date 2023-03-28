import { IPagination, IPostResponseShort } from '@/interfaces/posts.interfaces';
import Image from 'next/image';
import aboutImg from '/public/aboutImg.png';
import droneImg from '/public/drone.svg';
import { Fragment, useEffect, useState } from 'react';
import { Button, Checkbox, Pagination, Stack, TextField } from '@mui/material';

import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import { TextFieldProps } from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { OutlinedInputProps } from '@mui/material/OutlinedInput';
import { CategoryPosts } from './categoryPosts';

const FindWhiteTextField = styled(TextField)({
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

export const Projects = ({
  categories,
  allPosts,
  pagination,
}: {
  categories: string[];
  allPosts: IPostResponseShort[];
  pagination: IPagination;
}) => {
  // Выводимые посты на страницу
  const [posts, setPosts] = useState([]);
  // строка поиска
  const [query, setQuery] = useState('');
  // текущая страница пагинации
  const [page, setPage] = useState(1);
  // количество постов на страницу
  const [firstPosts, setFirstPosts] = useState(3);
  // вычисляем количество страниц в пагинации
  const paginationQty = Math.ceil(pagination.edges.length / firstPosts);
  // устанавливаем количество страниц в пагинации
  const [pageQty, setPageQty] = useState(paginationQty);

  useEffect(() => {
    /**
     * Поиск по массиву с выводом результатов и пагинацией результатов
     *
     */
    const newPostsSearch = allPosts.filter((item) =>
      item.node.title.toLowerCase().includes(query.toLowerCase())
    );

    setPosts(newPostsSearch);
  
  }, [allPosts, query]);

  // Отсортируем посты по категориям. Создадим объект с категориями и массивами постов
  const postByCat = {};
  categories.forEach((cat) => (postByCat[cat] = []));
  categories.forEach((cat) =>
    posts.forEach((post) =>
      post.node.categories?.edges.forEach((postInCat) =>
        postInCat.node.name === cat ? postByCat[cat].push(post) : null
      )
    )
  );

  const categoryCard = categories.map((cat) => {
    const post = allPosts.find(
      (post) => post.node.categories.edges[0].node.name === cat
    );
    return (
      <li key={cat}>
        {post.node.featuredImage?.node?.sourceUrl ? (
          <>
            <div
              className="relative md:inline-block 
              w-max-[365px] h-[482px]
              md:w-[365px] md:h-[482px]
            max-w-[365px]
            "
            >
              <Image
                src={post.node.featuredImage?.node?.sourceUrl}
                alt={cat}
                width={365}
                height={480}
                className="object-cover w-full h-full "
              />
              <div className="w-full h-1/2 absolute bottom-0 left-0 bg-gradient-to-t from-[#010101] to-transparent" />
              <h3
                className="absolute bottom-10 left-1/2 -translate-x-1/2
                text-2xl md:text-4xl uppercase text-white
                    "
              >
                {post.node.categories.edges[0].node.name}
              </h3>
            </div>
          </>
        ) : null}
      </li>
    );
  });

  return (
    <section
      id="#projects"
      className="bg-[#010101] pt-24 sm:pt-40 lg:pt-[250px]"
    >
      <div className="flex gap-2 justify-center">
        <h2 className="uppercase text-center relative text-white text-3xl sm:text-4xl font-semibold">
          Check out our projects{' '}
        </h2>
        <Image
          src={droneImg}
          alt={'drone'}
          width={20}
          height={20}
          className="opacity-80 self-start"
        />
      </div>
      <div className="flex justify-center mt-7">
        <FindWhiteTextField
          label="Find Post"
          id="custom-css-outlined-input"
          variant="standard"
          sx={{ input: { color: 'white' } }}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className=""
        />
      </div>

      <div className="sm:mt-10 md:mt-12 text-white text-opacity-80">
        {Object.keys(postByCat).map((cat) => (
          <CategoryPosts key={cat} allPostsCat={postByCat[cat]} catName={cat} />
        ))}
      </div>
    </section>
  );
};
