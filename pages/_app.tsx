import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Script from "next/script";
import { ChakraProvider } from "@chakra-ui/react";

const client = new ApolloClient({
  uri: "https://api-eu-central-1.graphcms.com/v2/cl43xcw2r5y7z01xjbq7ffclx/master",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Script src="https://telegram.org/js/telegram-web-app.js" />
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
