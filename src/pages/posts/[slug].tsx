import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getAllPostsWithSlug, getPostAndMorePosts } from '@/lib/api';
import styles from '../../styles/post-body.module.scss';
import { NextSeo } from 'next-seo';
import { IPostResponse } from '@/interfaces/posts.interfaces';

export default function Post({ post, posts, preview }:{post:IPostResponse, posts: IPostResponse[], preview: any}) {
  const router = useRouter();
  // console.log('post', post);

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
          <article>
            <Head>
              <title>{`${post.title}`}</title>
              <meta
                property="og:image"
                content={post.featuredImage?.node.sourceUrl}
              />
            </Head>
            <div className={styles.content}>
              <h1 dangerouslySetInnerHTML={{ __html: post.title }} />
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
            <footer>
              <p>Footer Post</p>
            </footer>
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

  return {
    props: {
      preview,
      post: data.post,
      posts: data.posts,
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
