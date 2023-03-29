import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import {
  getAllPagesSlug,
  getAllPostsWithSlug,
  getMenuByLocation,
  getPostAndMorePosts,
} from '@/lib/api';
import styles from '../../styles/post-body.module.scss';
import { NextSeo } from 'next-seo';
import { IPostResponse } from '@/interfaces/posts.interfaces';
import Container from '@/components/container';
import { Header1 } from '@/components/header';
import { Footer } from '@/components/footer';
import { Contact } from '@/components/sections/contact';
import {
  IWPMenuItem,
  LocationMenu,
} from '@/interfaces/footerHeaderRestAPIDataResponse';
import Image from 'next/image';
import { Open_Sans } from 'next/font/google';

const openSans = Open_Sans({ subsets: ['latin'] });

export default function Post({
  post,
  posts,
  preview,
  headerItemsMenuLeft,
  headerItemsMenuRight,
  footerItemsMenuLeft,
  footerItemsMenuRight,
  additionalInformationOnTheSite,
}: {
  post: IPostResponse;
  posts: IPostResponse[];
  preview: any;
  headerItemsMenuLeft: IWPMenuItem[];
  headerItemsMenuRight: IWPMenuItem[];
  footerItemsMenuLeft: IWPMenuItem[];
  footerItemsMenuRight: IWPMenuItem[];
  additionalInformationOnTheSite: any;
}) {
  const router = useRouter();
  console.log('post', post);
  const { aboutCompanyInFooterBlock, aboutUsBlock, copyright } =
    additionalInformationOnTheSite;

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <NextSeo
        title={post?.seo?.title}
        description={post?.seo?.metaDesc}
        canonical={post?.seo?.canonical}
      />
      {router.isFallback ? (
        <p>Loading…</p>
      ) : (
        <>
          <article
            className={`${openSans.className} relative bg-[#010101] 
      `}
          >
            <div className=" absolute h-screen w-screen overflow-hidden">
              <Image
                src={post.featuredImage?.node.sourceUrl}
                alt={'background'}
                fill
                className="object-cover"
              />
              <div className="absolute top-0 left-0 h-1/2 w-full bg-gradient-to-b from-[#010101e5] to-transparent"></div>
              <div className="absolute bottom-0 left-0 h-1/3 w-full bg-gradient-to-t from-[#010101] to-transparent"></div>
            </div>
            <Container>
              <div className="  relative h-screen">
                <Header1
                  headerItemsMenuLeft={headerItemsMenuLeft}
                  headerItemsMenuRight={headerItemsMenuRight}
                />

                <h1 className="mt-2 max-h-96 overflow-hidden text-ellipsis text-center text-4xl font-semibold uppercase tracking-tight text-white sm:text-5xl">
                  {post.title}
                </h1>
              </div>
              <div className="relative min-h-screen">
                <div
                  className={`${styles.content} relative -top-40 left-0 bottom-0 mx-auto 
                max-w-2xl overflow-hidden text-ellipsis bg-gradient-to-t from-[#010101]
                to-transparent text-white text-opacity-80
                
                 
                
                `}
                  dangerouslySetInnerHTML={{
                    __html:
                      post?.content && typeof post?.content === 'string'
                        ? post?.content
                        : null,
                  }}
                />
                <div className="h-[1px] w-full bg-[#242424]" />
                <Contact />
                <Footer
                  footerItemsMenuLeft={footerItemsMenuLeft}
                  footerItemsMenuRight={footerItemsMenuRight}
                  aboutCompanyInFooterBlock={aboutCompanyInFooterBlock}
                  copyright={copyright}
                />
              </div>
            </Container>
          </article>
        </>
      )}
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData,
}) => {
  const data = await getPostAndMorePosts(params?.slug, preview, previewData);

  const pages = await getAllPagesSlug();
  const additionalInformationOnTheSite = pages?.edges[0].node.siteInformation;
  const headerItemsMenu = await getMenuByLocation(LocationMenu.HEADER_HCMS);
  const footerItemsMenu = await getMenuByLocation(LocationMenu.HEADER_HCMS);
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
  return {
    props: {
      preview,
      post: data.post,
      posts: data.posts,
      headerItemsMenuLeft,
      headerItemsMenuRight,
      footerItemsMenuLeft,
      footerItemsMenuRight,
      additionalInformationOnTheSite,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPostsWithSlug();

  return {
    paths: allPosts.edges.map(({ node }) => `/posts/${node.slug}`) || [],
    fallback: true,
  };
};
