import React from "react";
import styled from "styled-components";

//Need to provide type for tsx component properties specifically
interface ButtonProps {
    onClick?: () => void;
    className?: string;
    children: string;
    type: string;
    to?: string;
}

const _Button = styled.a`
    font-family: Poppins;
    font-size: 14px;

    font-size: 16px;
    line-height: 20.11px;
    font-weight: 600;
    padding: 10px 25px 10px 25px;

    border-radius: 20px;
    border: 2px solid;
    transition: transform 0.3s ease;
    cursor: pointer;

    border-color: ${(p) => p.theme.button[p.type ?? "primaryDark"].outline};
    background-color: ${(p) => p.theme.button[p.type ?? "primaryDark"].fill};
    color: ${(p) => p.theme.button[p.type ?? "primaryDark"].text};

    a {
        color: ${(p) => p.theme.button[p.type ?? "primaryDark"].text};
    }

    //Button hover movement animation
    :hover {
        transform: translateY(-1px);
        opacity: 80%;
    }

    :focus {
        outline: none;
        box-shadow: none;
    }
`;

export default function Button({
    onClick,
    children,
    type,
    to,
}: ButtonProps): JSX.Element {
    return (
        <_Button onClick={onClick} type={type} href={to}>
            {children}
        </_Button>
    );
}
