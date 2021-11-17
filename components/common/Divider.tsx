import React from "react";
import styled from "styled-components";

const _Divider = styled.span`
    width: 80px;
    height: 1px;
    background: ${({ color }) => (color ? color : "black")};
    margin: 1.5rem;
`;

const Divider = ({ className, color }: any): JSX.Element => {
    return <_Divider className={className} color={color} />;
};

export default Divider;
