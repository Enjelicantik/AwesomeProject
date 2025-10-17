import React, {useState} from "react";
import { View, Text, Button,} from 'react-native';
import Tourist from "./TouristDestination/tourisdestination"

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <Tourist />
  );
};

export default Counter;