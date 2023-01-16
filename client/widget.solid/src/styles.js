import tw from 'twin.macro';

import * as TW_CUSTOM_COLORS from '../../../tw.colors';

export const SHARED_STYLES_METHOD_MAPPINGS = {
  linkStyle: css => css`
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
  `,
  buttonStyle: css => css`
    ${tw`
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
    `}
  `,
  input: css => css`
    ${tw`
      px-2 py-2 rounded
      border border-solid border-gray-300
      shadow-inner drop-shadow-2xl text-xl
    `}
  `,
};

export const createSharedStyles = ({ css, list = [] }) => {
  return list.reduce((acc, key) => {
    const f = SHARED_STYLES_METHOD_MAPPINGS[key];
    if (typeof f === 'function') {
      acc[key] = f(css);
    }
    return acc;
  }, {});
};

export const getExtraStyles = ({ cx, css, data: _data }) => {
  const data = JSON.parse(_data);
  const res = Object.keys(data).reduce((acc, key, i) => {
    const arr = data[key].map(([method, style]) => {
      return method === 'tw' ? css(tw`${style}`) : style;
    });
    acc[key] = cx(...arr);
    return acc;
  }, {});
  return res;
};
