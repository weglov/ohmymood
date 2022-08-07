import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Script from "next/script";
import { TelegramProvider } from "../providers";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider, UnifiedTheme } from "@revolut/ui-kit";

const client = new ApolloClient({
  uri: "https://api-eu-central-1.graphcms.com/v2/cl43xcw2r5y7z01xjbq7ffclx/master",
  cache: new InMemoryCache(),
});


const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={client}>
        <Script src="https://telegram.org/js/telegram-web-app.js" />
        <TelegramProvider>
          <Provider theme={UnifiedTheme} mode="auto" highContrast="auto">
            <Component {...pageProps} />
          </Provider>
        </TelegramProvider>
      </ApolloProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
