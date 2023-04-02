import { IPagination, IPostResponseShort } from '@/interfaces/posts.interfaces';
import Image from 'next/image';
import droneImg from '/public/drone.svg';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { FindWhiteTextField } from '@/lib/helpers';
import { CategoryPosts } from './categoryPosts';

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
  const [posts, setPosts] = useState([...allPosts]);
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
      <div className="flex justify-center gap-2">
        <h2 className="relative text-center text-3xl font-semibold uppercase text-white sm:text-4xl">
          Check out our projects{' '}
        </h2>
        <Image
          src={droneImg}
          alt={'drone'}
          width={20}
          height={20}
          className="self-start opacity-80"
        />
      </div>
      <div className="mt-7 flex justify-center">
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

      <div className="text-white text-opacity-80 sm:mt-10 md:mt-12">
        {posts.length !== 0 ? (
          Object.keys(postByCat).map((cat) => (
            <CategoryPosts
              key={cat}
              allPostsCat={postByCat[cat]}
              catName={cat}
            />
          ))
        ) : (
          <p className="pb-6 text-center font-normal text-red-600">
            Not Found. Change your query, please.
          </p>
        )}
      </div>
    </section>
  );
};
