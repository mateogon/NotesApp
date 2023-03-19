import React, { useContext, useState, useEffect } from "react";
import { Text, View, TextInput, Keyboard } from "react-native";

import styled from "styled-components/native";
import { useTheme } from "styled-components";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { NotesContext } from "../../../services/notes/notes.context";
const Container = styled.View`
  flex: 1;
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
const data = {
  articles: [
    {
      id: "1",
      title: "The Benefits of Drinking Coffee",
      content:
        "Coffee is a beverage that is enjoyed by people all around the world. It has been found to have many benefits, such as improving cognitive function, reducing the risk of certain diseases, and increasing alertness. Studies have also shown that drinking coffee can help to improve athletic performance and reduce muscle pain. Additionally, coffee is a rich source of antioxidants, which can help to protect the body against oxidative stress.",
    },
  ],
};
export const EditNoteScreen = ({ route, navigation }) => {
  const theme = useTheme();
  const { noteId } = route.params;
  const [id, setId] = useState(noteId);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState(Date.now());
  const { notes, getNotes, getNote, updateNote, addNote, removeNote } =
    useContext(NotesContext);

  useEffect(() => {
    console.log("fetching note");
    console.log(id);

    // Fetch note data from local storage or database using the noteId
    const fetchNoteData = async () => {
      console.log("fetching note data ", id);
      const noteData = await getNote(id);
      if (noteData != null) {
        console.log("fetchNoteData data:", noteData);
        setTitle(noteData.title);
        setContent(noteData.content);
        setDate(noteData.date);
      } else {
        console.log("fetchNoteData null");
        addNote({ id: id, title: title, content: content, date: date });
      }
    };
    fetchNoteData();
  }, [id]);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        console.log({ id, title, content, date });
        updateNote({
          id,
          title,
          content,
          date,
        });
      }
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, [id, title, content, date, updateNote]);

  return (
    <SafeArea>
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
    </SafeArea>
  );
};
