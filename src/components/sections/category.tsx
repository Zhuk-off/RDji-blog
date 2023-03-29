import { IPostResponseShort } from '@/interfaces/posts.interfaces';
import { DEFAULT_IMG_URL } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import aboutImg from '/public/aboutImg.png';
import droneImg from '/public/drone.svg';

export const Category = ({
  categories,
  allPosts,
}: {
  categories: string[];
  allPosts: IPostResponseShort[];
}) => {
  const categoryCard = categories.map((cat) => {
    const post = allPosts.find(
      (post) => post.node.categories.edges[0].node.name === cat
    );

    return (
      <li key={cat}>
        {post.node.featuredImage?.node?.sourceUrl ? (
          <>
            <div
              className="w-max-[365px] relative 
              h-[482px] max-w-[365px] text-white
              text-opacity-80 transition-all
              hover:text-opacity-100 hover:brightness-125
              md:inline-block
              md:h-[482px] md:w-[365px]
            "
            >
              <Link href={`/#${post.node.categories?.edges[0].node.name?.toLocaleLowerCase()}`} className="">
                <Image
                  src={post.node.featuredImage?.node?.sourceUrl}
                  alt={cat}
                  width={365}
                  height={480}
                  className="h-full w-full object-cover "
                />
                <div className="absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-[#010101] to-transparent" />
                <h3
                  className="absolute bottom-10 left-1/2 -translate-x-1/2
                overflow-hidden text-ellipsis text-2xl uppercase md:text-4xl
                    "
                >
                  {post.node.categories.edges[0].node.name}
                </h3>
              </Link>
            </div>
          </>
        ) : null}
      </li>
    );
  });

  return (
    <section
      id="categories"
      className="bg-[#010101] pt-24 sm:pt-40 lg:pt-[250px]"
    >
      <div className="flex justify-center gap-2">
        <h2 className="relative overflow-hidden text-ellipsis text-center text-3xl font-semibold uppercase text-white sm:text-4xl">
          Welcome to our blog <br />{' '}
          <span className="mt-2 block font-thin">Let&rsquo;s fly together</span>
        </h2>
        <Image
          src={droneImg}
          alt={'drone'}
          width={20}
          height={20}
          className="self-start opacity-80"
        />
      </div>

      <div className="mt-10 md:mt-14 lg:mt-24">
        <ul
          className="flex flex-col items-center gap-5
        md:flex-row md:flex-wrap md:justify-center
        lg:gap-12
        "
        >
          {categoryCard}
        </ul>
      </div>
    </section>
  );
};
