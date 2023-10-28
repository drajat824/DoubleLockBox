import { AsyncStorage } from "@react-native-async-storage/async-storage";
import init from "react_native_mqtt";

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  sync: {},
});

const RECONNECT_INTERVAL = 5000;

const options = {
  host: "395d0f154c95495889ba0205f5623f66.s1.eu.hivemq.cloud",
  port: 8084,
  path: "/request-mobile",
  id: "mobile_" + parseInt(Math.random() * 100000),
};

const clientMQTT = new Paho.MQTT.Client(
  "ws://395d0f154c95495889ba0205f5623f66.s1.eu.hivemq.cloud:8884/mqtt",
  options.id
);

const onConnect = () => {
  console.log("MQTT CONNECTED!");
  clientMQTT.subscribe("response-mobile");
};

const onFailure = () => {
  console.log("FAILED MQTT - Trying to reconnect...");
  setTimeout(() => {
    ConnectMQTT();
  }, RECONNECT_INTERVAL);
};

const ConnectMQTT = () => {
  clientMQTT.connect({
    onSuccess: onConnect,
    userName: "test2",
    password: "Test123@",
    timeout: 10,
    useSSL: true,
    onFailure: onFailure,
  });
};

export { ConnectMQTT, clientMQTT };
