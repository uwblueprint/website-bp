import React from "react";
import Image from "next/image";
import styled from "styled-components";

const landingWave = "/home/home-landing-wave.svg";

const MissionContainer = styled.div`
  height: 270px;
  position: relative;
  display: flex;
  justify-content: center;
  & > div.landingWaveWrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    z-index: -1;
  }
`;

const MissionDescription = styled.h3`
  color: ${(props) => props.theme.colors.B10};
  text-align: center;
  width: 75%;
`;

export const Mission: React.FC = () => {
  return (
    <>
      <MissionContainer>
        <div className="landingWaveWrapper">
          <Image src={landingWave} layout="fill" objectFit="cover" />
        </div>
        <MissionDescription>
          Blueprint strives to make technology accessible and useful for those
          who create communities and promote social good.
        </MissionDescription>
      </MissionContainer>
    </>
  );
};
