import React, { useContext, useState, useEffect } from "react";
import { Text, View, TextInput, Keyboard } from "react-native";

import styled from "styled-components/native";
import { useTheme } from "styled-components";
import { Spacer } from "../../../components/spacer/spacer.component";
import { NotesContext } from "../../../services/notes/notes.context";
import { useIsFocused } from "@react-navigation/native";
import { SafeArea } from "../../../components/utility/safe-area.component";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;
const TitleContainer = styled.View`
  padding-horizontal: ${(props) => props.theme.space[4]};
  padding-vertical: ${(props) => props.theme.space[2]};
  margin-horizontal: ${(props) => props.theme.space[2]};
  background-color: ${(props) => props.theme.colors.ui.primary};
  border-radius: ${(props) => props.theme.sizes[1]};
`;
const NoteContainer = styled.View`
  flex: 1;
  padding-vertical: ${(props) => props.theme.space[2]};
  padding-horizontal: ${(props) => props.theme.space[4]};
  margin: ${(props) => props.theme.space[2]};
  background-color: ${(props) => props.theme.colors.ui.primary};
  border-radius: ${(props) => props.theme.sizes[1]};
`;

export const EditNoteScreen = ({ route, navigation }) => {
  const isFocused = useIsFocused();
  const theme = useTheme();
  const { noteId } = route.params;
  const [id, setId] = useState(noteId);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState(new Date(Date.now()));
  const [newNote, setNewNote] = useState(false);
  const { notes, getNotes, getNote, updateNote, addNote, removeNote } =
    useContext(NotesContext);

  // Fetch note data from local storage or database using the noteId
  const fetchNoteData = async () => {
    console.log("fetching note data ", id);
    const noteData = await getNote(id);
    if (noteData != null) {
      console.log("fetchNoteData data:", noteData);
      setTitle(noteData.title);
      setContent(noteData.content);
      console.log("date type: ", typeof new Date(Date.now()));
      setDate(new Date(noteData.date));

      setNewNote(false);
    } else {
      console.log("fetchNoteData null");
      setNewNote(true);
    }
  };
  handleFinishEdit = () => {
    if (title == "" && content == "") {
      console.log("removing note");
      if (!newNote) {
        removeNote(id);
      }
    } else {
      if (newNote) {
        addNote({ id, title, content, date: new Date(Date.now()) });
      } else {
        updateNote({
          id,
          title,
          content,
          date: new Date(Date.now()),
        });
      }
    }
  };
  useEffect(() => {
    fetchNoteData();
  }, [id]);

  useEffect(() => {
    if (!isFocused) {
      console.log("Navigated away from EditNoteScreen");
      handleFinishEdit();
    }
  }, [isFocused]);

  useEffect(() => {
    console.log(date.getMonth() + 1);
    //console.log(new Date(Date.now()).getMonth() + 1);
  }, [date]);
  return (
    <Container>
      <Spacer position="top" size="large"></Spacer>
      <TitleContainer>
        <TextInput
          placeholder="Title"
          multiline={true}
          value={title}
          onChangeText={(text) => setTitle(text)}
          style={{
            fontSize: 25,
            color: theme.colors.text.primary,
          }}
          placeholderTextColor={theme.colors.text.secondary}
        />
      </TitleContainer>
      <NoteContainer>
        <TextInput
          placeholder="Write something..."
          value={content}
          onChangeText={(text) => setContent(text)}
          multiline={true}
          style={{
            fontSize: 16,
            color: theme.colors.text.primary,
          }}
          placeholderTextColor={theme.colors.text.secondary}
        />
      </NoteContainer>
    </Container>
  );
};