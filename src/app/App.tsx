import React from 'react';

import Dummy from './Dummy';

const component: React.FC = () => <Dummy>Hi, my name is...</Dummy>;
component.displayName = 'App';

export default component;
