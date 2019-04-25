import React from 'react';
import styled, { keyframes } from 'styled-components';

import Message from '~/app/atoms/Message.tsx';

const scroll = keyframes` 
  0% { left: 100%; transform: translate(0); }
  100% { left: 0; transform: translate(-100%); }
`;

const Raw = styled.div`
  overflow: hidden;
  position: relative;
  &:after {
    content: '';
    white-space: nowrap;
    display: inline-block;
  }
  ${Message.selector} {
    position: absolute;
    top: 0;
    white-space: nowrap;
    color: #0f0;
    animation-name: ${scroll};
    animation-timing-function: linear;
    animation-duration: 10s;
    animation-iteration-count: infinite;
  }
`;

const Component: React.FC = ({ ...props }) => (
  <Raw>
    <Message {...props} />
  </Raw>
);
Component.displayName = 'MessageWrap';
export default Component;
