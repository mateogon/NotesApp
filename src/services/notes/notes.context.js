import React, { createContext, useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const NotesContext = createContext();

export const NotesContextProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submittedKeyword, setSubmittedKeyword] = useState("");

  const onSearch = useCallback((searchKeyword) => {
    setIsLoading(true);
    setKeyword(searchKeyword);
    setSubmittedKeyword(searchKeyword);
  }, []);

  useEffect(() => {
    getNotes();
  }, [getNotes, submittedKeyword]);

  const getNotes = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const notes = await AsyncStorage.multiGet(keys);
      let parsedNotes = notes.map((note) => JSON.parse(note[1]));

      if (submittedKeyword) {
        parsedNotes = parsedNotes.filter(
          (note) =>
            note.title.toLowerCase().includes(submittedKeyword.toLowerCase()) ||
            note.content.toLowerCase().includes(submittedKeyword.toLowerCase())
        );
      }

      // Sort the notes by date recency
      parsedNotes.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
      });

      setNotes(parsedNotes);
      console.log("returning getNotes", parsedNotes);
      setIsLoading(false);
      return parsedNotes;
    } catch (e) {
      console.log("error retrieving all notes", e);
      setIsLoading(false);
    }
  };

  const getNote = async (id) => {
    setIsLoading(true);
    try {
      const noteData = await AsyncStorage.getItem(`@note-${id}`);
      console.log("note data retrieved");
      setIsLoading(false);
      return JSON.parse(noteData);
    } catch (error) {
      console.log("error retrieving note data", error);
      setIsLoading(false);
      return null;
    }
  };

  const addNote = async (note) => {
    const newNotes = [...notes, note];
    setNotes(newNotes);
    try {
      await AsyncStorage.setItem(`@note-${note.id}`, JSON.stringify(note));
      console.log("note added");
    } catch (e) {
      console.log("error adding note", e);
    }
  };

  const removeNote = async (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    try {
      await AsyncStorage.removeItem(`@note-${id}`);
    } catch (e) {
      console.log("error removing note", e);
    }
  };
  const updateNote = async (note) => {
    console.log("new note data:", note);
    const noteIndex = notes.findIndex((n) => n.id === note.id);
    if (noteIndex !== -1) {
      const updatedNotes = [...notes];
      updatedNotes[noteIndex] = note;
      setNotes(updatedNotes);
      console.log("note updated", notes);

      await AsyncStorage.setItem(`@note-${note.id}`, JSON.stringify(note));
      console.log("note updated");
    }
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        getNotes: getNotes,
        getNote: getNote,
        addNote: addNote,
        removeNote: (id) => removeNote(id),
        updateNote: (note) => updateNote(note),
        search: onSearch,
        keyword,
        isLoading,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
