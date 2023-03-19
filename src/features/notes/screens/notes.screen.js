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
function formatDate(date) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today.getTime() - 86400000); // Subtract 24 hours
  const thisWeek = new Date(today.getTime() - today.getDay() * 86400000); // Subtract days from this week
  const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const thisYear = new Date(today.getFullYear(), 0, 1);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  if (date >= today) {
    return `Today, ${formattedTime}`;
  } else if (date >= yesterday) {
    return `Yesterday, ${formattedTime}`;
  } else if (date >= thisWeek) {
    const dayName = days[date.getDay()];
    return `${dayName} ${date.getDate()} ${
      date.getMonth() + 1
    }, ${formattedTime}`;
  } else if (date >= thisMonth) {
    return `${date.getDate()} ${months[date.getMonth() + 1]}`;
  } else if (date >= thisYear) {
    return `${date.getDate()} ${months[date.getMonth() + 1]}`;
  } else {
    return `${date.getDate()} ${
      months[date.getMonth() + 1]
    } ${date.getFullYear()}`;
  }
}
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
        color="white"
        onPress={() => {
          navigation.navigate("EditNote", {
            noteId: Date.now() + Math.floor(Math.random() * 1000),
          });
        }}
        style={{
          zIndex: 999,
          position: "absolute",
          margin: 25,
          right: 0,
          bottom: 0,
          borderRadius: 1000,

          backgroundColor: "tomato",
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
              date={formatDate(new Date(item.date))}
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
