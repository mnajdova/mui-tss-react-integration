import * as React from 'react';
import { createTheme } from '@material-ui/core/styles';
import createEmotionServer from '@emotion/server/create-instance';
import { CacheProvider } from '@emotion/react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import createCache from '@emotion/cache';

function getCache() {
  const cache = createCache({ key: 'css', prepend: true });
  cache.compat = true;
  return cache;
}

const defaultTheme = createTheme();

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang={'en'}>
        <Head>
          {/* PWA primary color */}
          <meta name="theme-color" content={defaultTheme.palette.primary.main} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;

  const cache = getCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      // Take precedence over the CacheProvider in our custom _app.js
      enhanceComponent: (Component) => (props) =>
        (
          <CacheProvider value={cache}>
            <Component {...props} />
          </CacheProvider>
        ),
    });

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    userLanguage: ctx.query.userLanguage || 'en',
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...emotionStyleTags,
    ],
  };
};
