
import React from "react";
import { StatusBar, Text} from "react-native";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/store/store";

import Routes from "./src/routes";

function App() {
  return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          {/* <StatusBar
            translucent
            backgroundColor="white"
            barStyle="light-content"
          /> */}
          <Routes />
        </PersistGate>
      </Provider>
  );
}

export default App;
