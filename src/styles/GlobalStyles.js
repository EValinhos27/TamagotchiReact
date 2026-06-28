import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    box-sizing: border-box;
  }

  html, body {
    font-family: 'Poppins', Arial, Helvetica, sans-serif;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
    padding: 0;
  }
`
