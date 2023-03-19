import React, { useEffect } from "react";

import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

const SettingStack = createStackNavigator();

const FavouritesScreen = () => {
  return null;
};
const SettingsScreen = () => {
  return null;
};
export const SettingsNavigator = ({ route, navigation }) => {
  return (
    <SettingStack.Navigator
      screenOptions={{
        headerShown: true,
        headermode: "screen",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <SettingStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ header: () => null }}
      />
      <SettingStack.Screen
        name="Favourites"
        component={FavouritesScreen}
        options={{ header: () => null }}
      />
    </SettingStack.Navigator>
  );
};
