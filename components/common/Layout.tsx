import React from "react";
import styled from "styled-components";

const _VStack = styled.div`
    display: flex;
    flex-direction: column;
`;

const _HStack = styled.div`
    display: flex;
    flex-direction: row;
`;

const _Centered = styled.div`
    align-items: center;
    justify-content: center;
`;

export const VStack = ({ className, children }: any): JSX.Element => {
    return <_VStack className={className}>{children}</_VStack>;
};

export const HStack = ({ className, children }: any): JSX.Element => {
    return <_HStack className={className}>{children}</_HStack>;
};

export const Centered = ({ className, children }: any): JSX.Element => {
    return <_Centered className={className}>{children}</_Centered>;
};

const _CenteredVStack = styled(_VStack)`
    align-items: center;
    justify-content: center;
`;

const _CenteredHStack = styled(_HStack)`
    align-items: center;
    justify-content: center;
`;

export const CenteredVStack = ({ className, children }: any): JSX.Element => {
    return <_CenteredVStack className={className}>{children}</_CenteredVStack>;
};

export const CenteredHStack = ({ className, children }: any): JSX.Element => {
    return <_CenteredHStack className={className}>{children}</_CenteredHStack>;
};
