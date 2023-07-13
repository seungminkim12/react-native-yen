import * as config from "./config/key";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

export default function App() {
  const [curCurrency, setCurCurrency] = React.useState();
  const [userCurrency, onChangeCurrency] = React.useState();
  const [callNoti, setCallNoti] = React.useState(false);

  /**
   * 엔화 비교 로직
   */
  const completeCurrency = () => {
    if (curCurrency >= userCurrency) {
      console.log("sell");
    } else {
      console.log("keep");
    }
  };

  /**
   * 서버 통신 로직
   */
  const fetchTest = async () => {
    try {
      console.log("config.currencyURL", config.currencyURL);
      const res = await fetch(config.currencyURL);
      const json = await res.json();
      setCurCurrency(json);
      completeCurrency();
    } catch (err) {
      console.log("err", err);
    }
  };

  React.useEffect(() => {
    fetchTest();
  }, []);

  return (
    <View style={styles.container}>
      <Text>{curCurrency}</Text>
      <StatusBar style="auto" />
      <TextInput
        style={styles.input}
        onChangeText={onChangeCurrency}
        value={userCurrency}
        placeholder="910"
        onEndEditing={() => console.log("onEndEdit")}
        onSubmitEditing={fetchTest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
