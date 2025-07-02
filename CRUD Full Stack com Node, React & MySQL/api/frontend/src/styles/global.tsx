// src/styles/GlobalStyle.ts
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
  }

  body {
    width: 100vh;
    heigth: 100vh;
    displey: flex;
    justify-content: center;
    backgroud-color: #f2f2f2
  }
`;

export default GlobalStyle;
