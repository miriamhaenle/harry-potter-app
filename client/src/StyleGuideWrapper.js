import GlobalStyle from './GlobalStyle'

const StyleGuideWrapper = function ({ children }) {
  return (
    <>
      <GlobalStyle />
      {children}
    </>
  )
}

export default StyleGuideWrapper
