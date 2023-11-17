import React, { useEffect } from "react";
import { StatusBar, Text } from "react-native";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/store/store";

import { OneSignal } from "react-native-onesignal";

import Routes from "./src/routes";

function App() {
  useEffect(() => {
    OneSignal.initialize("49b0050a-99f4-4842-ba5b-db1b516fb6cb");
  }, []);

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
