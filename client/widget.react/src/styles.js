import tw, { css } from 'twin.macro';

import * as TW_CUSTOM_COLORS from '../../../tw.colors';
export { TW_CUSTOM_COLORS };

export const genericContentWrapper = css`
  width: 96%;
  @media (min-width: 768px) {
    width: 85%;
    max-width: 1024px;
  }
`;

export const linkStyle = css`
  display: block;
  &,
  &:link,
  &:visited {
    text-decoration: underline;
    color: ${TW_CUSTOM_COLORS['tomato-dark']};
  }
  &:hover,
  &:active {
    text-decoration: underline;
    color: ${TW_CUSTOM_COLORS['tomato-light']};
  }
`;

export const whiteLinkStyle = css`
  ${linkStyle}
  ${tw`
    text-white
    link:text-white
    hover:text-white
    visited:text-white
  `}
`;

export const titleStyle = tw`font-bold text-3xl`;

export const buttonStyle = tw`
  block px-5 py-2
  flex flex-col justify-center items-center
  rounded-lg
  cursor-pointer
  border-0
  drop-shadow-2xl
  text-center
  font-bold
  text-lg
  text-gray-900
  link:text-gray-900
  hover:text-gray-900
  visited:text-gray-900
  focus:outline-none
  focus:shadow
  bg-gray-200
`;

export const inputStyle = tw`
  px-2 py-2
  rounded
  border
  border-solid
  border-gray-300
  shadow-inner
  drop-shadow-2xl
  focus:outline-none
  focus:shadow
`;
