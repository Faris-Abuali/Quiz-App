import styles, { createGlobalStyle } from 'styled-components';
// @ts-ignore
import bgImg from './images/Fares.jpg';

console.log(bgImg);

export const GlobalStyle = createGlobalStyle`
    html {
        100%
    }

    body {
        background-img: url(${bgImg});
        background-size: cover;
        margin: 0;
        padding: 0 20px;
        display: flex;
        justify-content: center;
    }

    * {
        box-sizing: border-box;
        font-family: Tahoma;
    }
     
`