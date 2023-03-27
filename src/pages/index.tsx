import MenuList from '@mui/material/MenuList';
import { Open_Sans } from 'next/font/google';
import styles from '@/styles/Home.module.scss';
import Slider from '@mui/material/Slider';
import { Button, Checkbox, Pagination, Stack, TextField } from '@mui/material';
import { GetStaticProps } from 'next';
import {
  getAllPostsForHome,
  getFooterHeaderRestAPIData,
  getMenu,
  getPostsPagination,
} from '@/lib/api';
import Link from 'next/link';
import {
  IFooter,
  IHeader,
  IWPMenuItem,
} from '@/interfaces/footerHeaderRestAPIDataResponse';
import { IPagination, IPostResponseShort } from '@/interfaces/posts.interfaces';
import type { Metadata } from 'next';
import { NextSeo } from 'next-seo';
import { Fragment, useEffect, useState } from 'react';
import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Header1 } from '@/components/header';
import logo from '/public/bg_home.webp';
import Image from 'next/image';
import Container from '@/components/container';
import droneImg from '/public/drone.svg';
import aboutImg from '/public/aboutImg.png';
import { TitleBlock } from '@/components/title';

const openSans = Open_Sans({ subsets: ['latin'] });
const BASE_URL = 'https://hn.algolia.com/api/v1/search?';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
};

export default function Home({
  allPosts,
  preview,
  header,
  footer,
  pagination,
  headerItemsMenu,
  headerItemsMenuRight,
  headerItemsMenuLeft,
}: {
  allPosts: IPostResponseShort[];
  preview: any;
  header: IHeader;
  footer: IFooter;
  pagination: IPagination;
  headerItemsMenu: IWPMenuItem[];
  headerItemsMenuRight: IWPMenuItem[];
  headerItemsMenuLeft: IWPMenuItem[];
}) {
  /**
   * Функции и стейт для многоуровневое меню с выпдающими списками
   */
  const stateOpenMenu = {};
  headerItemsMenu.forEach((item) => {
    stateOpenMenu[item.node.id] = false;
  });

  const [open, setOpen] = useState(stateOpenMenu);

  const handleClick = (id) => {
    const newState = { ...open };
    newState[id] = !open[id];
    setOpen(newState);
  };
  /**
   * Конец -- Функции и стейт для многоуровневое меню с выпдающими списками
   */

  // Выводимые посты на страницу
  const [posts, setPosts] = useState([]);
  // строка поиска
  const [query, setQuery] = useState('Сейшелы');
  // текущая страница пагинации
  const [page, setPage] = useState(1);
  // количество постов на страницу
  const [firstPosts, setFirstPosts] = useState(2);
  // вычисляем количество страниц в пагинации
  const paginationQty = Math.ceil(pagination.edges?.length / firstPosts);
  // устанавливаем количество страниц в пагинации
  const [pageQty, setPageQty] = useState(paginationQty);

  const [menuOpen, setMenuOpen] = useState(stateOpenMenu);

  useEffect(() => {
    /**
     * Поиск по массиву с выводом результатов и пагинацией результатов
     *
     */
    const newPostsSearch = pagination.edges.filter((item) =>
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

    /**
     * Для получения данных из массива полученного в getStaticProps
     *
     */
    // С какого номера поста начинать следующую страницу пагинации для выборки из массива
    // const number = page * firstPosts - firstPosts;
    //  newPosts = pagination.edges.slice(
    //   number < 0 ? 0 : number,
    //   firstPosts + number
    // );
    // setPosts(newPosts);

    /**
     * Для Axios и получения данных из WP
     *
     */
    // С какого номера поста начинать следующую страницу пагинации для курсора и axios
    // const number = (page * firstPosts - firstPosts) - 1;
    // Получаем курсор от которого будем делать вывод следущих постов
    // const cursor = number < 0 ? '' : pagination.edges[number < 0 ? 0 : number].cursor;
    // запрос на WordPress задержка .5-.7 секунды
    // axios
    //   .post(FRONTEND_SITE_URL + `/api/postsby/`, {
    //     firstPosts,
    //     afterCursor: cursor,
    //   })
    //   .then(({ data }) => {
    //     const { posts } = data;
    //     setPosts(posts);
    //   })
    //   .catch((res) => console.log(res));
    /**
     * --------------------------------------
     */
  }, [query, page, firstPosts, pagination.edges]);

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  return (
    <>
      <NextSeo
        title="Create Next App"
        description="Generated by create next app"
      />
      <main
        className={`${openSans.className} bg-[#010101] relative 
      `}
      >
        <div className="absolute z-10">
          <Image src={logo} alt={'background'} className=" " />
          <div className="h-24 w-full absolute bottom-0 left-0 bg-gradient-to-t from-[#010101] to-transparent"></div>
        </div>
        <Container>
          <Header1
            headerItemsMenuLeft={headerItemsMenuLeft}
            headerItemsMenuRight={headerItemsMenuRight}
          />
          <div className="mt-10 sm:mt-12">
            <TitleBlock />
          </div>

          <section
            id="#about"
            className="mt-96 sm:mt-[550px] md:mt-[700px] lg:mt-[900px] 
          bg-gradient-to-t from-[#010101] to-transparent pt-3"
          >
            <div className="flex gap-2 justify-center">
              <h2 className="uppercase text-center relative text-white text-3xl sm:text-4xl font-semibold">
                About Us
              </h2>
              <Image
                src={droneImg}
                alt={'drone'}
                width={20}
                height={20}
                className="opacity-80 self-start"
              />
            </div>
            <div className="flex flex-col sm:flex-row mt-10 lg:mt-20 gap-10 lg:gap-20 justify-center">
              <Image
                src={aboutImg}
                alt={'about'}
                width={600}
                height={490}
                className="object-contain sm:w-[300px] md:w-[400px] lg:w-[500px]"
              />
              <p className="text-base lg:text-xl text-white text-opacity-80 leading-relaxed self-center max-w-xl font-normal">
                We are a young and creative team of videographers who specialize
                in shooting high-quality commercial videos. We utilize the
                latest DJI drone technology to capture stunning aerial footage
                that takes our videos to the next level. <br />
                <br /> We&rsquo;re so passionate about the work that we&rsquo;ve
                created a blog to share our experiences, showcase our work, and
                keep our clients updated on the latest videography trends.{' '}
                <br />
                <br /> Trust us to deliver exceptional video content that will
                leave a lasting impression on your audience.
              </p>
            </div>
          </section>
        </Container>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allPosts = await getAllPostsForHome(preview);
  const pagination = await getPostsPagination(100000, '');
  const headerItemsMenu = await getMenu();
  const headerItemsMenuLeft = headerItemsMenu.slice(
    0,
    Math.floor(headerItemsMenu.length / 2)
  );
  const headerItemsMenuRight = headerItemsMenu.slice(
    Math.floor(headerItemsMenu.length / 2),
    headerItemsMenu.length
  );

  const footerHeaderData = await getFooterHeaderRestAPIData();
  const header = footerHeaderData ? footerHeaderData.data.header : null;
  const footer = footerHeaderData ? footerHeaderData.data.footer : null;

  return {
    props: {
      allPosts: allPosts?.edges,
      preview,
      header,
      footer,
      pagination,
      headerItemsMenu,
      headerItemsMenuLeft,
      headerItemsMenuRight,
    },
    revalidate: 10,
  };
};
