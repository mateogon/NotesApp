import React, { useEffect } from "react";
import { EditNoteScreen } from "../../features/notes/screens/edit_note.screen";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { NotesScreen } from "../../features/notes/screens/notes.screen";

const NotesStack = createStackNavigator();

export const NotesNavigator = ({ route, navigation }) => {
  return (
    <NotesStack.Navigator
      screenOptions={{
        headerShown: true,
        headermode: "screen",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <NotesStack.Screen
        name="AllNotes"
        component={NotesScreen}
        options={{ header: () => null }}
      />
      <NotesStack.Screen
        name="EditNote"
        component={EditNoteScreen}
        options={{ header: () => null }}
      />
    </NotesStack.Navigator>
  );
};
