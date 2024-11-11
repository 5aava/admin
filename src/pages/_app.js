import { AppProvider } from '@toolpad/core/nextjs';

export default function App(props) {
  const { Component, pageProps } = props;

  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}
