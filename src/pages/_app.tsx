import '@/styles/globals.scss';

import {
  createTheme,
  CssBaseline,
  GlobalStyles,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Script from 'next/script';
import * as React from 'react';
import * as gtag from '../lib/gtag';

/**
 * Get __next. Fix 'document not defined'
 */
// One working version
let rootElement;
if (typeof window !== 'undefined') {
  let rootElement = document.getElementById('__next');
}
// The second working version
// React.useEffect(() => {
//   if (document) {
//   let rootElement = document.getElementById('__next');
//   }
// }, []);

/**
 * Material UI globalStyles
 */
const globalStyles = (
  <GlobalStyles
    styles={{
      '': {
        boxSizing: 'border-box',
        borderWidth: '0',
        borderStyle: 'solid',
        borderColor: "theme('borderColor.DEFAULT')",
      },
      // before: { '-twContent': "''" },
      // after: { '-twContent': "''" },
      html: {
        lineHeight: '1.5',
        WebkitTextSizeAdjust: '100%',
        MozTabSize: '4',
        tabSize: '4',
        fontFamily: "theme('fontFamily.sans')",
      },
      body: { margin: '0', lineHeight: 'inherit' },
      hr: { margin: '0' },
      abbr_where__title: { textDecoration: 'underline dotted' },
      h1: { margin: '0' },
      h2: { margin: '0' },
      h3: { margin: '0' },
      h4: { margin: '0' },
      h5: { margin: '0' },
      h6: { margin: '0' },
      a: { color: 'inherit', textDecoration: 'inherit' },
      b: { fontWeight: 'bolder' },
      strong: { fontWeight: 'bolder' },
      code: { fontFamily: "theme('fontFamily.mono')", fontSize: '1em' },
      kbd: { fontFamily: "theme('fontFamily.mono')", fontSize: '1em' },
      samp: { fontFamily: "theme('fontFamily.mono')", fontSize: '1em' },
      pre: { margin: '0' },
      small: { fontSize: '80%' },
      sub: { bottom: '-0.25em' },
      sup: { top: '-0.5em' },
      table: {
        textIndent: '0',
        borderColor: 'inherit',
        borderCollapse: 'collapse',
      },
      button: { cursor: 'pointer' },
      input: {
        fontFamily: 'inherit',
        fontSize: '100%',
        fontWeight: 'inherit',
        lineHeight: 'inherit',
        color: 'inherit',
        margin: '0',
        padding: '0',
      },
      optgroup: {
        fontFamily: 'inherit',
        fontSize: '100%',
        fontWeight: 'inherit',
        lineHeight: 'inherit',
        color: 'inherit',
        margin: '0',
        padding: '0',
      },
      select: { textTransform: 'none' },
      textarea: { resize: 'vertical' },
      type__button: {
        WebkitAppearance: 'button',
        backgroundColor: 'transparent',
        backgroundImage: 'none',
      },
      type__reset: {
        WebkitAppearance: 'button',
        backgroundColor: 'transparent',
        backgroundImage: 'none',
      },
      type__submit: {
        WebkitAppearance: 'button',
        backgroundColor: 'transparent',
        backgroundImage: 'none',
      },
      moz_focusring: { outline: 'auto' },
      moz_ui_invalid: { boxShadow: 'none' },
      progress: { verticalAlign: 'baseline' },
      webkit_inner_spin_button: { height: 'auto' },
      webkit_outer_spin_button: { height: 'auto' },
      type__search: { WebkitAppearance: 'textfield', outlineOffset: '-2px' },
      webkit_search_decoration: { WebkitAppearance: 'none' },
      webkit_file_upload_button: {
        WebkitAppearance: 'button',
        font: 'inherit',
      },
      summary: { display: 'list-item' },
      blockquote: { margin: '0' },
      dl: { margin: '0' },
      dd: { margin: '0' },
      figure: { margin: '0' },
      p: { margin: '0' },
      fieldset: { margin: '0', padding: '0' },
      legend: { padding: '0' },
      ol: { listStyle: 'none', margin: '0', padding: '0' },
      ul: { listStyle: 'none', margin: '0', padding: '0' },
      menu: { listStyle: 'none', margin: '0', padding: '0' },
      input__placeholder: { opacity: '1', color: "theme('colors.gray.400')" },
      textarea__placeholder: {
        opacity: '1',
        color: "theme('colors.gray.400')",
      },
      role__button: { cursor: 'pointer' },
      disabled: { cursor: 'default' },
      img: { maxWidth: '100%', height: 'auto' },
      svg: { display: 'block', verticalAlign: 'middle' },
      video: { maxWidth: '100%', height: 'auto' },
      canvas: { display: 'block', verticalAlign: 'middle' },
      audio: { display: 'block', verticalAlign: 'middle' },
      iframe: { display: 'block', verticalAlign: 'middle' },
      embed: { display: 'block', verticalAlign: 'middle' },
      object: { display: 'block', verticalAlign: 'middle' },
      hidden: { display: 'none' },
    }}
  />
);

/**
 * Material UI Theme
 */
const theme = createTheme({
  components: {
    MuiPopover: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiPopper: {
      defaultProps: {
        container: rootElement,
      },
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  React.useEffect(() => {
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
      {/* End Global Site Tag (gtag.js) - Google Analytics */}
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        {globalStyles}
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
}
