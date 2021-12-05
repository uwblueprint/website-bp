import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  a:-webkit-any-link {
  color: $C00;
  text-decoration: none;
}
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html {
  height: 100%;
}
body {
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 16px;
  line-height: 20.11px;
  font-weight: 400;
  overflow-x: hidden;
  background-color: '#ffffff';
  height: 100%;
}
h1 {
  font-family: 'Poppins', sans-serif;
  font-size: 58px;
  line-height: 87px;
  font-weight: 500;
}
h2 {
  font-family: 'Poppins', sans-serif;
  font-size: 44px;
  line-height: 66px;
  font-weight: 600;
}
h3 {
  font-family: 'Poppins', sans-serif;
  font-size: 30px;
  line-height: 45px;
  font-weight: 500;
}
h4 {
  font-family: 'Poppins', sans-serif;
  font-size: 22px;
  line-height: 33px;
  font-weight: 600;
}
h5 {
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  line-height: 27px;
  font-weight: 500;
}
h6 {
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  line-height: 27px;
  font-weight: 500;
}
span {
  color: "#0573e8";
}
`;
