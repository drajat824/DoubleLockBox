import { AsyncStorage } from "@react-native-async-storage/async-storage";
import init from "react_native_mqtt";

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  cleanSession: true,
  timeout: 10
});

const options = {
  host: "cbaf6706df604b55adafeef2e822ffa6.s1.eu.hivemq.cloud",
  port: 8084,
  path: "/request-mobile",
  id: "mobile_" + parseInt(Math.random() * 100000),
};

let clientMQTT = new Paho.MQTT.Client("ws://cbaf6706df604b55adafeef2e822ffa6.s1.eu.hivemq.cloud:8884/mqtt", options.id);

const onConnect = async (idMobile) => {
  return new Promise((resolve, reject) => {
    if (clientMQTT.isConnected()) {
      clientMQTT.subscribe("response-mobile-" + idMobile, {
        onSuccess: () => {
          console.log("response-mobile-" + idMobile);
          console.log("Berhasil konek mqtt!");
          resolve(true);
        },
        onFailure: (error) => {
          console.log("Gagal subscribe: " + error.errorMessage);
          resolve(false);
        }
      });
    } else {
      resolve(false);
    }
  });
};

const onFailure = (idMobile) => {
  console.log("ga berhasil konek mqtt");
  ConnectMQTT(idMobile)
};

const ConnectMQTT = (idMobile) => {
  if (!clientMQTT.isConnected()) {
    console.log("Mencoba untuk konek mqtt");
    return new Promise((resolve, reject) => {
      clientMQTT.connect({
        onSuccess: () => onConnect(idMobile).then((result) => resolve(result)),
        onFailure: () => onFailure(idMobile),
        userName: "Mobile1",
        password: "Mobile123@",
        useSSL: true,
        cleanSession: false,
        timeout: 10,
        keepAliveInterval: 5
      });
    });
  } else {
    return Promise.resolve(true);
  }
};
const DisconnectMQTT = () => {
  if (clientMQTT.isConnected()) {
    console.log('diskonke mqtt')
    clientMQTT.disconnect();
  }
};

export { ConnectMQTT, clientMQTT, DisconnectMQTT };
