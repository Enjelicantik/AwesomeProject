import React, { useState } from "react";
import { View, Text, Button } from "react-native";

const Counter = () => {
  const [count, setCount] = useState(0); // state pakai hooks

  const increaseCount = () => {
    setCount(prevCount => prevCount + 1);
  };

  return (
    <View>
      <Text>Count: {count}</Text>
      <Button title="Increase" onPress={increaseCount} />
    </View>
  );
};

export default Counter;
