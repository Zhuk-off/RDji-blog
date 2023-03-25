import Head from 'next/head';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';

import Typography from '@mui/material/Typography';

import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.scss';
import Slider from '@mui/material/Slider';
import {
  Button,
  Checkbox,
  Pagination,
  PaginationItem,
  Stack,
  TextField,
} from '@mui/material';
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
  LocationMenu,
} from '@/interfaces/footerHeaderRestAPIDataResponse';
import { IPagination, IPostResponseShort } from '@/interfaces/posts.interfaces';
import type { Metadata } from 'next';
import { NextSeo } from 'next-seo';
import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { FRONTEND_SITE_URL } from '@/lib/constants';
import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

const inter = Inter({ subsets: ['latin'] });
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
}: {
  allPosts: IPostResponseShort[];
  preview: any;
  header: IHeader;
  footer: IFooter;
  pagination: IPagination;
  headerItemsMenu: IWPMenuItem[];
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
      <main className={styles.main}>
        <header className="w-full">
          <menu className="flex justify-between">
            {header.headerMenuItems.map((item) => (
              <li key={item.ID}>
                <Link href={item.pageSlug}>{item.title}</Link>
              </li>
            ))}
          </menu>
        </header>

        <Link href="/" locale="en">
          To /en/
        </Link>
        <Link href="/">To /ru/</Link>

        {/* Многоуровневое меню с выпдающими списками  */}
        <MenuList>
          <List>
            {headerItemsMenu.map((im1Level) => {
              if (
                im1Level.node.childItems.edges.length === 0 &&
                !im1Level.node.parentId
              ) {
                return (
                  <ListItemButton key={im1Level.node.id}>
                    <ListItemIcon></ListItemIcon>
                    <ListItemText primary={im1Level.node.label} />
                  </ListItemButton>
                );
              } else {
                return (
                  !im1Level.node.parentId && (
                    <Fragment key={im1Level.node.id}>
                      {im1Level.node.childItems.edges.length === 0 ? (
                        <ListItemButton>
                          <ListItemIcon></ListItemIcon>
                          <ListItemText primary={im1Level.node.label} />
                        </ListItemButton>
                      ) : (
                        <ListItemButton
                          onClick={() => handleClick(im1Level.node.id)}
                        >
                          <ListItemIcon></ListItemIcon>
                          <ListItemText primary={im1Level.node.label} />
                          {open[im1Level.node.id] ? (
                            <ExpandLess />
                          ) : (
                            <ExpandMore />
                          )}
                        </ListItemButton>
                      )}
                      <Collapse
                        in={open[im1Level.node.id]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List>
                          {im1Level.node.childItems.edges.map((im2Level) => {
                            if (im2Level.node.childItems.edges.length === 0) {
                              return (
                                <ListItemButton
                                  key={im2Level.node.label}
                                  sx={{ pl: 4 }}
                                >
                                  <ListItemIcon></ListItemIcon>
                                  <ListItemText primary={im2Level.node.label} />
                                </ListItemButton>
                              );
                            } else {
                              return (
                                <Fragment key={im2Level.node.label}>
                                  <ListItemButton
                                    sx={{ pl: 4 }}
                                    onClick={() =>
                                      handleClick(im2Level.node.id)
                                    }
                                  >
                                    <ListItemIcon></ListItemIcon>
                                    <ListItemText
                                      primary={im2Level.node.label}
                                    />
                                    {open[im2Level.node.id] ? (
                                      <ExpandLess />
                                    ) : (
                                      <ExpandMore />
                                    )}
                                  </ListItemButton>
                                  <Collapse
                                    in={open[im2Level.node.id]}
                                    timeout="auto"
                                    unmountOnExit
                                  >
                                    <List>
                                      {im2Level.node.childItems.edges.map(
                                        (im3Level) => {
                                          if (
                                            im3Level.node.childItems.edges
                                              .length === 0
                                          ) {
                                            return (
                                              <ListItemButton
                                                key={im3Level.node.label}
                                                sx={{ pl: 8 }}
                                              >
                                                <ListItemIcon></ListItemIcon>
                                                <ListItemText
                                                  primary={im3Level.node.label}
                                                />
                                              </ListItemButton>
                                            );
                                          } else {
                                            return (
                                              <Fragment
                                                key={im3Level.node.label}
                                              >
                                                <ListItemButton
                                                  sx={{ pl: 8 }}
                                                  onClick={() =>
                                                    handleClick(
                                                      im3Level.node.id
                                                    )
                                                  }
                                                >
                                                  <ListItemIcon></ListItemIcon>
                                                  <ListItemText
                                                    primary={
                                                      im3Level.node.label
                                                    }
                                                  />
                                                  {open[im3Level.node.id] ? (
                                                    <ExpandLess />
                                                  ) : (
                                                    <ExpandMore />
                                                  )}
                                                </ListItemButton>
                                                <Collapse
                                                  in={open[im3Level.node.id]}
                                                  timeout="auto"
                                                  unmountOnExit
                                                >
                                                  <List>
                                                    {im3Level.node.childItems.edges.map(
                                                      (im4Level) => {
                                                        return (
                                                          <ListItemButton
                                                            sx={{ pl: 12 }}
                                                            key={
                                                              im4Level.node
                                                                .label
                                                            }
                                                          >
                                                            <ListItemIcon></ListItemIcon>
                                                            <ListItemText
                                                              primary={
                                                                im4Level.node
                                                                  .label
                                                              }
                                                            />
                                                          </ListItemButton>
                                                        );
                                                      }
                                                    )}
                                                  </List>
                                                </Collapse>
                                              </Fragment>
                                            );
                                          }
                                        }
                                      )}
                                    </List>
                                  </Collapse>
                                </Fragment>
                              );
                            }
                          })}
                        </List>
                      </Collapse>
                    </Fragment>
                  )
                );
              }
            })}
          </List>
        </MenuList>
        {/*Конец --- Многоуровневое меню с выпдающими списками  */}


        <p>{`Страница номер ${page}`}</p>
        <TextField
          fullWidth
          label="Найти"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <Stack spacing={2}>
          {!!pageQty && (
            <Pagination
              count={pageQty}
              page={page}
              onChange={(_, num) => setPage(num)}
              showFirstButton
              showLastButton
              sx={{ marginY: 3, marginX: 'auto' }}
            />
          )}
          {posts.map((post) => (
            <Link key={post.cursor} href={`posts/${post?.node.slug}` || '#'}>
              {post.node.title}
            </Link>
          ))}
        </Stack>
        <div className="">
          <Slider defaultValue={30} className="mt-8" />
          <p>Стилизация через Tailwind</p>
          <Slider defaultValue={30} className="text-teal-600" />
          <p>Более глубокие элементы</p>
          <Slider
            defaultValue={30}
            className="text-teal-600"
            slotProps={{ thumb: { className: 'rounded-sm' } }}
          />
          <p>Стилизация псевдосостояний</p>
          <Slider defaultValue={30} classes={{ active: 'shadow-none' }} />
        </div>
        <div className="flex">
          <Checkbox {...label} defaultChecked />
          <Checkbox {...label} />
          <Checkbox {...label} disabled />
          <Checkbox {...label} disabled checked />
        </div>
        <div className="flex">
          <Stack spacing={2} direction="row">
            <Button variant="text">Text</Button>
            <Button variant="contained">Contained</Button>
            <Button variant="outlined">Outlined</Button>
          </Stack>
        </div>
        <ul>
          {allPosts.map((item, index) => (
            <li key={index}>
              <Link href={`posts/${item.node.slug}`}>{item.node.title}</Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allPosts = await getAllPostsForHome(preview);
  const pagination = await getPostsPagination(100000, '');
  const headerItemsMenu = await getMenu(LocationMenu.HEADER_RU);

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
    },
    revalidate: 10,
  };
};
