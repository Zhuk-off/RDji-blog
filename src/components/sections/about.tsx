import Image from 'next/image';
import aboutImg from '/public/aboutImg.png';
import droneImg from '/public/drone.svg';

export const About = ({ aboutUsBlock }: { aboutUsBlock: string }) => {
  return (
    <section
      id="about"
      className="mt-96 bg-gradient-to-t from-[#010101] to-transparent pt-3
        sm:mt-[550px] md:mt-[700px] lg:mt-[900px] xl:mt-[650px]"
    >
      <div className="flex justify-center gap-2">
        <h2 className="relative overflow-hidden text-ellipsis text-center text-3xl font-semibold uppercase text-white sm:text-4xl">
          About Us
        </h2>
        <Image
          src={droneImg}
          alt={'drone'}
          width={20}
          height={20}
          className="self-start opacity-80"
        />
      </div>
      <div className="mt-10 flex flex-col justify-center gap-10 sm:flex-row lg:mt-20 lg:gap-20">
        <Image
          src={aboutImg}
          alt={'about'}
          width={600}
          height={490}
          className="object-contain sm:w-[300px] md:w-[400px] lg:w-[500px]"
        />
        <p
          className="max-w-xl self-center overflow-hidden text-ellipsis text-base font-normal leading-relaxed text-white text-opacity-80 lg:text-xl"
          dangerouslySetInnerHTML={{
            __html:
              aboutUsBlock && typeof aboutUsBlock === 'string'
                ? aboutUsBlock
                : null,
          }}
        />
      </div>
    </section>
  );
};
