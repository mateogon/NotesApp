import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NotesNavigator } from "./notes.navigator";
import { SettingsNavigator } from "./settings.navigator";
import { NotesContextProvider } from "../../services/notes/notes.context";
const Tab = createBottomTabNavigator();
const TAB_ICONS = {
  Notes: [Ionicons, "list"],
  Settings: [Ionicons, "settings"],
};
const TAB_ICONS_COLORS = {
  Active: "tomato",
  Inactive: "#A5A5A5",
};

const createScreenOptions = ({ route }) => {
  const [IconComponent, iconName] = TAB_ICONS[route.name];
  return {
    headerShown: false,
    tabBarIcon: ({ focused, size }) => {
      const Color = focused
        ? TAB_ICONS_COLORS["Active"]
        : TAB_ICONS_COLORS["Inactive"];
      return <IconComponent name={iconName} size={size} color={Color} />;
    },
    tabBarActiveTintColor: TAB_ICONS_COLORS["Active"],
    tabBarInactiveTintColor: TAB_ICONS_COLORS["Inactive"],
    tabBarStyle: {
      backgroundColor: "black",
      borderTopWidth: 0,
    },
  };
};

export const AppNavigator = () => {
  return (
    <NotesContextProvider>
      <Tab.Navigator
        initialRouteName="Notes"
        screenOptions={createScreenOptions}
      >
        <Tab.Screen name="Notes" component={NotesNavigator} />
        <Tab.Screen name="Settings" component={SettingsNavigator} />
      </Tab.Navigator>
    </NotesContextProvider>
  );
};
