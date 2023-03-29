import { FindWhiteTextField } from '@/lib/helpers';
import { Box, Button, Switch } from '@mui/material';
import ReCAPTCHA from 'react-google-recaptcha';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import aboutImg from '/public/contact1.webp';
import droneImg from '/public/drone.svg';

interface ISendData {
  email: string;
  info: string;
  name: string;
  phone: string;
  policy: boolean;
}

// The delay is needed for rebooting Recaptcha. Without delay, it gives out an error.
const sleep = () =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1500);
  });

export const Contact = () => {
  const [sendData, setSendData] = useState<ISendData>({
    email: '',
    info: '',
    name: '',
    phone: '',
    policy: false,
  });
  const [loading, setLoading] = useState(false);
  const [send, setSend] = useState(false);
  const [reCaptureVerify, setReCaptureVerify] = useState(false);
  const [errorName, setErrorName] = useState({
    error: false,
  });
  const [errorPhone, setErrorPhone] = useState({
    error: false,
  });
  const [errorPolicy, setErrorPolicy] = useState({
    className: '',
  });

  // react-hook-form initialization
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // React-hook-form function, which works when sending a form
  const onSubmit = async (data) => {
    setSendData(data);
    // Execute the reCAPTCHA when the form is submitted
    recaptchaRef.current.execute();
  };

  // Processing error in the form, it is necessary to install and eliminate red fields in the form
  if (errors['name'] && !errorName.error) {
    setErrorName({
      error: true,
    });
  }
  if (!errors['name'] && errorName.error) {
    setErrorName({
      error: false,
    });
  }
  if (errors['phone'] && !errorPhone.error) {
    setErrorPhone({
      error: true,
    });
  }
  if (!errors['phone'] && errorPhone.error) {
    setErrorPhone({
      error: false,
    });
  }
  if (errors['policy'] && errorPolicy.className === '') {
    setErrorPolicy({
      className: 'ring-1 ring-red-600 ring-inset rounded',
    });
  }
  if (!errors['policy'] && errorPolicy.className !== '') {
    setErrorPolicy({
      className: '',
    });
  }
  const label = {
    inputProps: { 'aria-label': 'Switch agree with privacy policy' },
  };


    // We use for invisible Recaptcha
    const recaptchaRef = useRef(null);

  // ReCapture
  const onReCAPTCHAChange = async (captchaCode) => {
    // If the reCAPTCHA code is null or undefined indicating that
    // the reCAPTCHA was expired then return early
    if (!captchaCode) {
      return;
    }
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({ sendData, captcha: captchaCode }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        setLoading(true);
        await sleep();
        recaptchaRef.current.reset();
        setSend(true);
        setLoading(false);
        // If the response is ok than show the success alert
      } else {
        // Else throw an error with the message returned
        // from the API
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      alert(error?.message || 'Something went wrong');
      await sleep();
      recaptchaRef.current.reset();
    }
  };

  return (
    <section
      id="#contact"
      // className="bg-[#686767] pt-24 sm:pt-40 lg:pt-[250px]"
      className="bg-[#010101] pt-24 sm:pt-40 lg:pt-[250px]"
    >
      <div className="flex justify-center gap-2">
        <h2 className="relative text-center text-3xl font-semibold uppercase text-white sm:text-4xl">
          Contact Us
        </h2>
        <Image
          src={droneImg}
          alt={'drone'}
          width={20}
          height={20}
          className="self-start opacity-80"
        />
      </div>
      <div className="mt-10 flex flex-col items-center justify-center gap-10 sm:flex-row sm:gap-5 lg:mt-20 lg:gap-20">
        <Image
          src={aboutImg}
          alt={'about'}
          width={600}
          height={490}
          className="hidden object-contain sm:block sm:w-[200px] md:w-[300px] lg:w-[500px]"
        />
        <div className="flex min-w-[290px] flex-col gap-5 sm:min-w-[350px]">
          <Box
            component={'form'}
            className="screen-box-shadow-all grid gap-5 p-10 text-2xl text-black"
            action="/api/form"
            method="post"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <FindWhiteTextField
              {...register('name', { required: true, minLength: 2 })}
              id="name"
              required
              {...errorName}
              label="Name"
              // id="custom-css-outlined-input"
              variant="standard"
              sx={{ input: { color: 'white' } }}
              // value={query}
              // onChange={(event) => setQuery(event.target.value)}
              className=""
              
            />
            <FindWhiteTextField
              {...register('email')}
              id="email"
              type={'email'}
              label="Email Address"
              // id="custom-css-outlined-input"
              variant="standard"
              sx={{ input: { color: 'white' } }}
              // value={query}
              // onChange={(event) => setQuery(event.target.value)}
              className=""
            />
            <FindWhiteTextField
              label="Phone Number"
              {...register('phone', {
                required: true,
                minLength: 7,
                pattern: /^[0-9+\-()\s]+$/,
              })}
              id="phone"
              type={'tel'}
              // id="custom-css-outlined-input"  required
              {...errorPhone}
              variant="standard"
              sx={{ input: { color: 'white' } }}
              // value={query}
              // onChange={(event) => setQuery(event.target.value)}
              className=""
            />
            <FindWhiteTextField
              {...register('info')}
              label="Message"
              id="info"
              // id="custom-css-outlined-input"
              variant="standard"
              sx={{ input: { color: 'white' } }}
              // value={query}
              // onChange={(event) => setQuery(event.target.value)}
              className=""
              multiline
            />
            <div {...errorPolicy}>
              <div className="flex items-center">
                <Switch
                  {...register('policy', { required: true })}
                  id="policy"
                  {...label}
                  color="primary"
                  required
                />

                <p className="font-roboto-regular text-sm text-white text-opacity-80 ">
                  I agree to the{' '}
                  <Link
                    href={'/privacy-policy/'}
                    className="text-white text-opacity-80 underline "
                    target={'_blank'}
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>

            <Button
              variant="outlined"
              className="rounded-full px-6"
              size="medium"
              type={'submit'}
            >
              send
            </Button>
            <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        onChange={onReCAPTCHAChange}
        className="invisible absolute z-30 lg:visible"
      /> 
          </Box>
        </div>
      </div>
    </section>
  );
};
