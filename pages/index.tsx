import { BottomNav, Layout, Relative } from '@revolut/ui-kit'
import * as Icons from '@revolut/icons'
import { createGlobalStyle } from 'styled-components'
import { Mood, Navigation } from '../components'
import { MoodFormProvider } from '../providers'

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
          <MoodFormProvider>
            <Mood />
            {/* <Navigation /> */}
          </MoodFormProvider>
        </Relative>
      </Layout.Main>
    </Layout>
  )
}

export default IndexPage
