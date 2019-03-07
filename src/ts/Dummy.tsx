import React from 'react';
import styled from 'styled-components';

const DummyH1 = styled.h1`
  font-size: 1.6rem;
  color: #600;
`;

const Dummy = ({ ...props }) => <DummyH1 {...props} />;
export default Dummy;
