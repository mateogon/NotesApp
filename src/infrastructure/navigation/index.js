import React, { useContext } from "react";

import { NavigationContainer } from "@react-navigation/native";

import { AppNavigator } from "./app.navigator";

export const Navigation = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};
