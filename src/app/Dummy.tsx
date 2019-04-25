import React from 'react';
import styled from 'styled-components';

const DummyH1 = styled.h1`
  font-size: 4.8rem;
  color: #30f;
`;

const Dummy = ({ ...props }) => <DummyH1 {...props} />;
export default Dummy;
