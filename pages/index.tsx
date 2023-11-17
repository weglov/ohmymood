import { Layout, Relative } from '@revolut/ui-kit'
import { createGlobalStyle } from 'styled-components'
import { Mood } from '../components'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`

const IndexPage = () => {
  return (
    <Layout>
      <GlobalStyle />
      <Layout.Main>
        <Relative minHeight="800px">
          <Mood />
        </Relative>
      </Layout.Main>
    </Layout>
  )
}

export default IndexPage
