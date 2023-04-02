import { Button } from '@mui/material';

export const TitleBlock = () => {
  return (
    <>
      <h1 className="text-lg sm:text-xl font-normal text-white text-center">
        <span className="opacity-70 ">
          Taking your vision to new heights with
        </span>
        <br />
        <span className="text-4xl sm:text-5xl mt-2 block uppercase font-semibold tracking-tight">
          DJI drone videograp
        </span>
      </h1>
      <div className="sm:text-xl font-semibold mt-3 text-white text-center">
        Learn about our projects
      </div>
      <div className="flex justify-center mt-5 gap-5">
        <Button variant="outlined" className="rounded-full" size="medium" href='#categories'>
          <span className="px-6">read</span>
        </Button>
        <Button variant="outlined" className="rounded-full" size="medium" href='#projects'>
          <span className="px-6">more</span>
        </Button>
      </div>
    </>
  );
};
