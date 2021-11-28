import React from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";

const DemoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  margin-bottom: 110px;
`;

export const Demo: React.FC = () => {
  return (
    <>
      <DemoContainer>
        <ReactPlayer url="https://www.youtube.com/watch?v=Dunh20k7gYA" />
      </DemoContainer>
    </>
  );
};
