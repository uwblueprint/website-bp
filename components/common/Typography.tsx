import React from "react";
import styled from "styled-components";

export const H1 = styled.h1`
  font-family: "Poppins";
  font-style: normal;

  font-size: 36 px;
  line-height: 54 px;
  font-weight: 500;

  ${(p) => p.theme.mediaQueries.desktop} {
    font-size: 58px;
    line-height: 87 px;
    font-weight: 500;
  }
`;

export const H2 = styled.h2`
  font-family: Poppins;
  font-style: normal;

  font-size: 28 px;
  line-height: 42 px;
  font-weight: 600;
  ${(p) => p.theme.mediaQueries.desktop} {
    font-size: 44px;
    line-height: 66 px;
    font-weight: 600;
  }
`;

export const H5 = styled.h5`
  font-family: Poppins;
  font-style: normal;

  font-size: 16 px;
  line-height: 24 px;
  font-weight: 500;
  ${(p) => p.theme.mediaQueries.desktop} {
    font-size: 18 px;
    line-height: 27 px;
    font-weight: 500;
  }
`;
export const Body = styled.p`
  font-family: "Source Sans Pro", sans-serif;
  font-style: normal;
  font-weight: normal;

  font-size: 16 px;
  line-height: 20.11 px;
  font-weight: 400;

  ${(p) => p.theme.mediaQueries.desktop} {
    font-size: 16 px;
    line-height: 20.11 px;
    font-weight: 400;
  }
`;

export const SectionTitle = styled.h2`
  color: ${(props) => props.theme.colors.B10};
`;
