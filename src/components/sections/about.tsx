import Image from 'next/image';
import aboutImg from '/public/aboutImg.png';
import droneImg from '/public/drone.svg';

export const About = () => {
  return (
    <section
      id="#about"
      className="mt-96 sm:mt-[550px] md:mt-[700px] lg:mt-[900px] xl:mt-[650px]
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
          We are a young and creative team of videographers who specialize in
          shooting high-quality commercial videos. We utilize the latest DJI
          drone technology to capture stunning aerial footage that takes our
          videos to the next level. <br />
          <br /> We&rsquo;re so passionate about the work that we&rsquo;ve
          created a blog to share our experiences, showcase our work, and keep
          our clients updated on the latest videography trends. <br />
          <br /> Trust us to deliver exceptional video content that will leave a
          lasting impression on your audience.
        </p>
      </div>
    </section>
  );
};
