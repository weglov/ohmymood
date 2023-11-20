import { Layout, Relative } from '@revolut/ui-kit'
import { createGlobalStyle } from 'styled-components'
import { Mood } from '../components'
import { MoodDataProvider } from '../components/context/moodData/context'

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
      {/* @ts-ignore */}
      <GlobalStyle />
      <Layout.Main>
        <Relative>
          <MoodDataProvider>
            <Mood />
          </MoodDataProvider>
        </Relative>
      </Layout.Main>
    </Layout>
  )
}

export default IndexPage
