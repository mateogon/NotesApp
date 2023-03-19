import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const NotesContext = createContext();

export const NotesContextProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const notes = await AsyncStorage.multiGet(keys);
      const parsedNotes = notes.map((note) => JSON.parse(note[1]));
      setNotes(parsedNotes);
      return parsedNotes;
    } catch (e) {
      console.log("error retrieving all notes", e);
    }
  };

  const getNote = async (id) => {
    try {
      const noteData = await AsyncStorage.getItem(`@note-${id}`);
      console.log("note data retrieved");
      return JSON.parse(noteData);
    } catch (error) {
      console.log("error retrieving note data", error);
      return null;
    }
  };

  const add = async (note) => {
    const newNotes = [...notes, note];
    setNotes(newNotes);
    try {
      await AsyncStorage.setItem(`@note-${note.id}`, JSON.stringify(note));
      console.log("note added");
    } catch (e) {
      console.log("error adding note", e);
    }
  };

  const remove = async (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    try {
      await AsyncStorage.removeItem(`@note-${id}`);
    } catch (e) {
      console.log("error removing note", e);
    }
  };
  const update = async (note) => {
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

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <NotesContext.Provider
      value={{
        notes,
        getNotes: getNotes,
        getNote: getNote,
        addNote: add,
        removeNote: (id) => remove(id),
        updateNote: (note) => update(note),
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
