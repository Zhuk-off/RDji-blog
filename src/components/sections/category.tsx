import { IPostResponseShort } from '@/interfaces/posts.interfaces';
import Image from 'next/image';
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
    <section id="#about" className="bg-[#010101] pt-24 sm:pt-40 lg:pt-[250px]">
      <div className="flex gap-2 justify-center">
        <h2 className="uppercase text-center relative text-white text-3xl sm:text-4xl font-semibold">
          Welcome to our blog <br />{' '}
          <span className="font-thin mt-2 block">Let&rsquo;s fly together</span>
        </h2>
        <Image
          src={droneImg}
          alt={'drone'}
          width={20}
          height={20}
          className="opacity-80 self-start"
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
