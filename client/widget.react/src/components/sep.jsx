import React from 'react';
import sanitizeHtml from 'sanitize-html';
import tw, { css } from 'twin.macro';

export const Sep = ({ sep = '&gt;', styles: extra }) => {
  return (
    <span dangerouslySetInnerHTML={{ __html: sep }} css={[tw`mx-1`, extra]} />
  );
};
