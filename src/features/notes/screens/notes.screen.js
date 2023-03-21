import React, { useContext, useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { Button, Card, Title, Paragraph, FAB } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { useTheme } from "styled-components";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Search } from "../components/search.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { FlatGrid } from "react-native-super-grid";
import MasonryList from "@react-native-seoul/masonry-list";
import { NoteCard } from "../components/note-card.component";
import { NotesContext } from "../../../services/notes/notes.context";
import { formatDate } from "../../../infrastructure/utility/formatDate";
import { Ionicons } from "@expo/vector-icons";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const Loading = styled.ActivityIndicator`
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
`;

const SearchContainer = styled.View`
  z-index: 999;
  flex: 0.15;
  width: 100%;
`;
const BottomBar = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.bg.primary};
  border-top-width: 1px;
  border-top-color: ${(props) => props.theme.colors.ui.secondary};
  padding-vertical: 8px;
`;

const TopBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.colors.bg.primary};
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.colors.ui.secondary};
  padding-vertical: 8px;
  padding-horizontal: 16px;
`;

export const NotesScreen = ({ navigation }) => {
  const theme = useTheme();
  const { notes, updateNote, addNote, removeNote, isLoading, keyword } =
    useContext(NotesContext);
  const [gridKey, setGridKey] = useState(0);

  // Add the useState hooks for selectionMode and selectedNotes
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [allNotesSelected, setAllNotesSelected] = useState(false);
  // Functions to handle selection mode and note selection
  const toggleSelectionMode = () => {
    setSelectionMode(!selectionMode);
    setSelectedNotes([]); // Clear selected notes when exiting selection mode
  };

  const toggleNoteSelection = (noteId) => {
    if (selectedNotes.includes(noteId)) {
      setSelectedNotes(selectedNotes.filter((id) => id !== noteId));
    } else {
      setSelectedNotes([...selectedNotes, noteId]);
    }
  };

  // Function to delete all selected notes
  const deleteSelectedNotes = () => {
    selectedNotes.forEach((noteId) => removeNote(noteId));
    toggleSelectionMode();
  };

  // Function to select all notes
  const selectAllNotes = () => {
    if (allNotesSelected) {
      setSelectedNotes([]);
    } else {
      setSelectedNotes(notes.map((note) => note.id));
    }
    setAllNotesSelected(!allNotesSelected);
  };

  useEffect(() => {
    setGridKey((prevKey) => prevKey + 1);
  }, [notes]);

  return (
    <SafeArea>
      {selectionMode && (
        <TopBar>
          <TouchableOpacity onPress={toggleSelectionMode}>
            <Ionicons
              name="close"
              size={24}
              color={theme.colors.text.primary}
            />
          </TouchableOpacity>
          <Text style={{ color: theme.colors.text.primary }}>
            {selectedNotes.length} selected
          </Text>
          <TouchableOpacity onPress={selectAllNotes}>
            <Ionicons
              name="checkmark-done"
              size={24}
              color={allNotesSelected ? "tomato" : theme.colors.text.primary}
            />
          </TouchableOpacity>
        </TopBar>
      )}

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
        {isLoading ? (
          <SafeArea>
            <Loading animating={true} color="tomato" size={100} />
          </SafeArea>
        ) : (
          <MasonryList
            contentContainerStyle={{
              paddingHorizontal: 10,
              alignSelf: "stretch",
            }}
            numColumns={2}
            data={notes}
            key={gridKey}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={{ padding: 4 }}>
                <TouchableOpacity
                  onLongPress={() => {
                    if (!selectionMode) {
                      toggleSelectionMode();
                    }
                    toggleNoteSelection(item.id);
                  }}
                  onPress={() => {
                    if (selectionMode) {
                      toggleNoteSelection(item.id);
                    } else {
                      navigation.navigate("EditNote", { noteId: item.id });
                    }
                  }}
                >
                  <View>
                    {selectionMode && (
                      <View style={styles.noteSelectedIcon}>
                        <Ionicons
                          name={
                            selectedNotes.includes(item.id)
                              ? "checkmark-circle"
                              : "ellipse"
                          }
                          size={24}
                          color={
                            selectedNotes.includes(item.id) ? "orange" : "grey"
                          }
                          style={{ marginRight: 8 }}
                        />
                      </View>
                    )}
                    <NoteCard
                      id={item.id}
                      title={item.title}
                      paragraph={item.content}
                      date={formatDate(new Date(item.date))}
                      onPress={() => {
                        if (!selectionMode) {
                          navigation.navigate("EditNote", { noteId: item.id });
                        }
                      }}
                      keyword={keyword}
                      selected={selectedNotes.includes(item.id)}
                      ListEmptyComponent={
                        <Text
                          style={{
                            textAlign: "center",
                            marginTop: 20,
                            color: theme.colors.text.primary,
                          }}
                        >
                          No notes available
                        </Text>
                      }
                    />
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        )}

        {selectionMode && (
          <BottomBar>
            <TouchableOpacity onPress={deleteSelectedNotes}>
              <Ionicons
                name="trash"
                size={24}
                color={theme.colors.text.secondary}
              />
            </TouchableOpacity>
          </BottomBar>
        )}
      </Container>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  gridView: {
    flex: 1,
  },
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "#fff",
  },
  sectionHeader: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    alignItems: "center",
    backgroundColor: "#636e72",
    color: "white",
    padding: 10,
  },
  noteSelectedIcon: {
    position: "absolute",
    bottom: 8,
    right: 8,
    zIndex: 999,
  },
});
