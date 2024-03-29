import { Open_Sans } from 'next/font/google';
import { GetStaticProps } from 'next';
import {
  getAllPagesSlug,
  getAllPostsForHome,
  getFooterHeaderRestAPIData,
  getMenuByLocation,
  getPostsPagination,
} from '@/lib/api';
import {
  IFooter,
  IHeader,
  IWPMenuItem,
  LocationMenu,
} from '@/interfaces/footerHeaderRestAPIDataResponse';
import { IPagination, IPostResponseShort } from '@/interfaces/posts.interfaces';
import type { Metadata } from 'next';
import { NextSeo } from 'next-seo';
import * as React from 'react';
import { Header1 } from '@/components/header';
import logo from '/public/bg_home.webp';
import Image from 'next/image';
import Container from '@/components/container';
import { TitleBlock } from '@/components/title';
import { About } from '@/components/sections/about';
import { Category } from '@/components/sections/category';
import { getCategory } from '@/lib/helpers';
import { Projects } from '@/components/sections/projects';
import { Contact } from '@/components/sections/contact';
import { Footer } from '@/components/footer';

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
  footerItemsMenuLeft,
  footerItemsMenuRight,
  additionalInformationOnTheSite,
}: {
  allPosts: IPostResponseShort[];
  preview: any;
  header: IHeader;
  footer: IFooter;
  pagination: IPagination;
  headerItemsMenu: IWPMenuItem[];
  headerItemsMenuRight: IWPMenuItem[];
  headerItemsMenuLeft: IWPMenuItem[];
  footerItemsMenuLeft: IWPMenuItem[];
  footerItemsMenuRight: IWPMenuItem[];
  additionalInformationOnTheSite: any;
}) {
  const categories = getCategory(allPosts);

  const { aboutCompanyInFooterBlock, aboutUsBlock, copyright } =
    additionalInformationOnTheSite;

  return (
    <>
      <NextSeo
        title="Create Next App"
        description="Generated by create next app"
        noindex
        nofollow
      />
      <main
        className={`${openSans.className} relative bg-[#010101] 
      `}
      >
        <div className="absolute z-10">
          <Image src={logo} alt={'background'} className="lg:h-[1200px] object-cover" />
          <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-[#010101] to-transparent"></div>
        </div>
        <Container>
          <Header1
            headerItemsMenuLeft={headerItemsMenuLeft}
            headerItemsMenuRight={headerItemsMenuRight}
          />
          <div className="mt-10 sm:mt-12">
            <TitleBlock />
          </div>

          <About aboutUsBlock={aboutUsBlock} />
          <Category categories={categories} allPosts={allPosts} />
          <Projects
            categories={categories}
            allPosts={allPosts}
            pagination={pagination}
          />
          <Contact />
          <Footer
            footerItemsMenuLeft={footerItemsMenuLeft}
            footerItemsMenuRight={footerItemsMenuRight}
            aboutCompanyInFooterBlock={aboutCompanyInFooterBlock}
            copyright={copyright}
          />
        </Container>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allPosts = await getAllPostsForHome(preview);
  const pages = await getAllPagesSlug();
  const additionalInformationOnTheSite = pages?.edges[0].node.siteInformation;
  const pagination = await getPostsPagination(100000, '');
  const headerItemsMenu = await getMenuByLocation(LocationMenu.HEADER_HCMS);
  const footerItemsMenu = await getMenuByLocation(LocationMenu.FOOTER_HCMS);
  const headerItemsMenuLeft = headerItemsMenu.slice(
    0,
    Math.floor(headerItemsMenu.length / 2)
  );
  const headerItemsMenuRight = headerItemsMenu.slice(
    Math.floor(headerItemsMenu.length / 2),
    headerItemsMenu.length
  );
  const footerItemsMenuLeft = footerItemsMenu.slice(
    0,
    Math.floor(footerItemsMenu.length / 2)
  );
  const footerItemsMenuRight = footerItemsMenu.slice(
    Math.floor(footerItemsMenu.length / 2),
    footerItemsMenu.length
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
      footerItemsMenuLeft,
      footerItemsMenuRight,
      additionalInformationOnTheSite,
    },
    revalidate: 10,
  };
};
