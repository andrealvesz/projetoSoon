import React from 'react';

import { LocationProvider } from './useLocation';

type Props = {
  children: React.ReactNode;
};

const AppProvider = ({ children }: Props): JSX.Element => (
  <LocationProvider>{children}</LocationProvider>
);

export default AppProvider;
