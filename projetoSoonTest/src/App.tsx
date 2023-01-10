import React from 'react';
import Main from '~/screens/Main';
import AppProvider from './hooks';

const App = () => {
  return (
    <AppProvider>
      <Main />
    </AppProvider>
  );
};

export default App;
