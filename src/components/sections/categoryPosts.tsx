import { IPostResponseShort } from '@/interfaces/posts.interfaces';
import { Pagination, Stack } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import droneImg from '/public/drone.svg';
import { alpha, styled } from '@mui/material/styles';
import Link from 'next/link';
import { DEFAULT_IMG_URL } from '@/lib/constants';

const PaginationWhite = styled(Pagination)({
  '& button.MuiPaginationItem-textPrimary': {
    color: '#fff',
  },
  '& button.MuiPaginationItem-text': {
    color: '#fff',
  },
  '& button.css-18h0c6m-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected':
    {
      backgroundColor: '#A6A2A4',
    },
  '& button.css-18h0c6m-MuiButtonBase-root-MuiPaginationItem-root:hover': {
    backgroundColor: 'rgba(166,162,164, .2)',
  },
});

export const CategoryPosts = ({
  allPostsCat,
  catName,
}: {
  allPostsCat: IPostResponseShort[];
  catName: string;
}) => {
  // Выводимые посты на страницу
  const [posts, setPosts] = useState<IPostResponseShort[]>([]);
  // строка поиска
  const [query, setQuery] = useState('');
  // текущая страница пагинации
  const [page, setPage] = useState(1);
  // количество постов на страницу
  const [firstPosts, setFirstPosts] = useState(6);
  // вычисляем количество страниц в пагинации
  const paginationQty = Math.ceil(allPostsCat.length / firstPosts);
  // устанавливаем количество страниц в пагинации
  const [pageQty, setPageQty] = useState(paginationQty);

  useEffect(() => {
    /**
     * Поиск по массиву с выводом результатов и пагинацией результатов
     *
     */
    const newPostsSearch = allPostsCat.filter((item) =>
      item.node.title.toLowerCase().includes(query.toLowerCase())
    );
    const number = page * firstPosts - firstPosts;
    const newPosts = newPostsSearch.slice(
      number < 0 ? 0 : number,
      firstPosts + number
    );
    const paginationQty = Math.ceil(newPostsSearch?.length / firstPosts);

    setPosts(newPosts);
    setPageQty(paginationQty);
  }, [query, page, firstPosts, allPostsCat]);

  if (allPostsCat?.length === 0) return null;

  const description = allPostsCat[0].node.categories?.edges.find((cat) =>
    cat.node.name === catName ? cat.node.description : null
  ).node.description;

  return (
    <div className="flex flex-col items-center">
      <div className="mt-14 flex justify-center gap-2">
        <h3 className="relative overflow-hidden text-ellipsis text-center text-xl font-thin uppercase text-white text-opacity-80 sm:text-3xl">
          {catName}
        </h3>
        <Image
          src={droneImg}
          alt={'drone'}
          width={20}
          height={20}
          className="self-start opacity-80"
        />
      </div>
      <p className="mt-5 block max-w-xl overflow-hidden text-ellipsis text-center text-base font-thin leading-relaxed text-opacity-70">
        {description ? description : null}
      </p>
      {/* {!!pageQty && (
        <PaginationWhite
          count={pageQty}
          page={page}
          onChange={(_, num) => setPage(num)}
          showFirstButton
          showLastButton
          color="primary"
          sx={{ marginY: 3, marginX: 'auto' }}
          className="mt-5"
        />
      )} */}
      <ul
        className="mt-10 flex flex-wrap justify-center gap-5
      sm:gap-5
      md:gap-7
      lg:gap-10
      xl:gap-12
      "
      >
        {posts.map((post, index) => (
          <li
            key={post.node.title + index}
            className="w-full hover:text-opacity-100
          sm:w-auto
          "
          >
            {post.node.featuredImage?.node?.sourceUrl ? (
              <>
                <div
                  className="relative 
                  h-[482px] w-full
                  text-white text-opacity-80 transition-all
                  duration-300 hover:text-opacity-100 hover:brightness-125
                  sm:inline-block sm:h-[382px]
                  sm:w-[265px] md:inline-block
                  md:h-[382px]
                  md:w-[265px]
                  lg:h-[482px]
                  lg:w-[365px]

              "
                >
                  <Link href={`/posts/${post.node?.slug}`} className="">
                    <Image
                      src={post.node.featuredImage?.node?.sourceUrl}
                      alt={post.node.title}
                      width={365}
                      height={480}
                      className="h-full w-full object-cover "
                    />
                    <div className="absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-[rgba(1,1,1,0.8)] to-transparent" />
                    <h4
                      className="absolute bottom-0 left-1/2 w-full
                    -translate-x-1/2 overflow-hidden text-ellipsis px-4 pb-6 text-center text-xl font-light md:text-2xl
                        "
                    >
                      {post.node?.title}
                    </h4>
                  </Link>
                </div>
              </>
            ) : null}
          </li>
        ))}
      </ul>
      {/* <Stack spacing={3} > */}
      {!!pageQty && (
        <PaginationWhite
          count={pageQty}
          page={page}
          onChange={(_, num) => setPage(num)}
          showFirstButton
          showLastButton
          color="primary"
          sx={{ marginY: 3, marginX: 'auto' }}
          className=""
        />
      )}
      {/* </Stack> */}
    </div>
  );
};
