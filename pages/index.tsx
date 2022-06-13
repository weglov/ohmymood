import { Layout } from "@revolut/ui-kit";
import { createGlobalStyle } from "styled-components";
import { Mood } from "../components/MoodForm";
import { MoodFormProvider } from "../providers";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const IndexPage = () => {
  return (
    <Layout>
      <GlobalStyle />
      <Layout.Main>
        <MoodFormProvider>
          <Mood />
        </MoodFormProvider>
      </Layout.Main>
    </Layout>
  );
};

export default IndexPage;
