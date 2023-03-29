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
import { FindWhiteTextField } from '@/lib/helpers';

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
 
  return (
    <section
      id="projects"
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
        {posts.length!==0 ? Object.keys(postByCat).map((cat) => (
          <CategoryPosts key={cat} allPostsCat={postByCat[cat]} catName={cat} />
        )):<p className='text-center pb-6 font-normal text-red-600'>Not Found. Change your query, please.</p>}
      </div>
    </section>
  );
};
