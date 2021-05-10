import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset};

  * {
    box-sizing:border-box;
    margin:0;
    padding:0;
  }
  body{
    font-family: 'Noto Sans KR', sans-serif;
  }

  a {
    text-decoration:none;
    color:inherit; 
  }

  input {
    outline:none;
  }

`;

export default GlobalStyle;
