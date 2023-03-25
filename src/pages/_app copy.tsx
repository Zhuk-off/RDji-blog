import '../src/styles/index.scss';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/router';
import * as gtag from '../lib/gtag';
import createCache from '@emotion/cache';
import { createTheme } from '@mui/material/styles';

import {
  CssBaseline,
  GlobalStyles,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material';
import { CacheProvider } from '@emotion/react';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const cache = createCache({
    key: 'css',
    prepend: true,
  });

  const globalStyles = (
    <GlobalStyles
      styles={{
        '*': { margin: '0', padding: '0', border: '0' },
        li: { listStyle: 'none' },
        ul: { listStyle: 'none' },
        a: { textDecoration: 'none', color:'#6D7893' },
        'a:visited': { textDecoration: 'none' },
        'a:hover': { textDecoration: 'none' },
      }}
    />
  );

  const theme = createTheme({
    palette: {
      primary: {
        // light: will be calculated from palette.primary.main,
        main: '#D4313A',
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
        contrastText: '#FFFFFF',
      },
      secondary: {
        // light: '#0066ff',
        main: '#00D4FF',
        // dark: will be calculated from palette.secondary.main,
        // contrastText: '#ffcc00',
      },
      success: { main: '#38BB8A' },
      error:{main:'#BA4025'},

      // Provide every color token (light, main, dark, and contrastText) when using
      // custom colors for props in Material UI's components.
      // Then you will be able to use it like this: `<Button color="custom">`
      // (For TypeScript, you need to add module augmentation for the `custom` value)
      // custom: {
      //   light: '#ffa726',
      //   main: '#f57c00',
      //   dark: '#ef6c00',
      //   contrastText: 'rgba(0, 0, 0, 0.87)',
      // },
      // Used by `getContrastText()` to maximize the contrast between
      // the background and the text.
      contrastThreshold: 3,
      // Used by the functions below to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset: 0.2,
    },
    typography: {
      fontFamily: [
        'Fira Semi-bold',
        'Fira Bold',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      fontSize: 16,
    },
  });

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      {/* <Header/> */}
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CacheProvider value={cache}>
            {globalStyles}
            <CssBaseline />
            <Component {...pageProps} />
          </CacheProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
}
