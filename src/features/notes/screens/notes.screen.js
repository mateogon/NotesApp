import React, { useContext, useState, useEffect } from "react";
import { Text, View } from "react-native";
import { Button, Card, Title, Paragraph, FAB } from "react-native-paper";
import styled from "styled-components/native";
import { useTheme } from "styled-components";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Search } from "../components/search.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { FlatGrid } from "react-native-super-grid";
import { NoteCard } from "../components/note-card.component";
import { NotesContext } from "../../../services/notes/notes.context";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const Container = styled.View`
  flex: 1;
`;

const SearchContainer = styled.View`
  z-index: 999;
  flex: 0.15;
  width: 100%;
`;

export const NotesScreen = ({ navigation }) => {
  const theme = useTheme();
  const { notes, getNotes, updateNote, addNote, removeNote } =
    useContext(NotesContext);
  const [gridKey, setGridKey] = useState(0);

  useEffect(() => {
    getNotes();
  }, []);

  useEffect(() => {
    setGridKey((prevKey) => prevKey + 1);
    console.log(notes);
  }, [notes]);

  return (
    <SafeArea>
      <FAB
        small
        icon="plus"
        onPress={() => {
          navigation.navigate("EditNote", {
            noteId: Date.now() + Math.floor(Math.random() * 1000),
          });
        }}
        style={{
          zIndex: 999,
          position: "absolute",
          margin: 16,
          right: 0,
          bottom: 0,
          borderRadius: 50,
        }}
      />
      <SearchContainer>
        <Search />
      </SearchContainer>
      <Container>
        <Spacer position="top" size="large"></Spacer>
        <FlatGrid
          key={gridKey}
          itemDimension={130}
          data={notes}
          renderItem={({ item }) => (
            <NoteCard
              id={item.id}
              title={item.title}
              paragraph={item.content}
              onPress={() => {
                navigation.navigate("EditNote", { noteId: item.id });
                console.log("on press note id: ", item.id);
              }}
            />
          )}
        />
      </Container>
    </SafeArea>
  );
};
