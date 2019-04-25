import React from 'react';
import styled from 'styled-components';

const Raw = styled.div`
  font-size: 6rem;
  font-weight: 900;
`;

const Component: React.FC = ({ ...props }) => <Raw {...props} />;
Component.displayName = 'Message';
export default Component;
