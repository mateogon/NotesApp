import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";
import { useTheme } from "styled-components";
import { NotesContext } from "../../../services/notes/notes.context";

const SearchContainer = styled.View`
  padding-vertical: ${(props) => props.theme.space[3]};
  padding-horizontal: ${(props) => props.theme.space[3]};

  z-index: 999;

  width: 100%;
`;

export const Search = () => {
  const { keyword, search } = useContext(NotesContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  const theme = useTheme();

  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);

  return (
    <SearchContainer>
      <Searchbar
        placeholder="Search notes"
        style={{
          backgroundColor: theme.colors.ui.primary,
          height: 48,
          borderRadius: 20,
        }}
        inputStyle={{
          paddingBottom: 8,
          color: theme.colors.text.primary,

          textAlignVertical: "center",
        }}
        placeholderTextColor={theme.colors.text.disabled}
        cursorColor={theme.colors.text.primary}
        value={searchKeyword}
        onSubmitEditing={() => {
          search(searchKeyword);
        }}
        onChangeText={(text) => {
          setSearchKeyword(text);
        }}
      />
    </SearchContainer>
  );
};
