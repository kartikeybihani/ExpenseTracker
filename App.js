import React from 'react';
import RootProviders from './src/Navigation';
import { Provider } from 'react-redux';
import store from './src/Redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <RootProviders />
    </Provider>
  );
};

export default App;
