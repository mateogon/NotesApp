import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Title, Paragraph } from "react-native-paper";
import { useTheme } from "styled-components";
import { Spacer } from "../../../components/spacer/spacer.component";
import styled from "styled-components/native";

const Highlight = styled.Text`
  color: tomato;
`;

const highlightKeyword = (text, keyword) => {
  if (!keyword) return text;

  const regex = new RegExp(`(${keyword})`, "gi");
  const parts = text.split(regex);
  const highlightedText = parts.map((part, index) => {
    if (part.toLowerCase() === keyword.toLowerCase()) {
      return <Highlight key={index}>{part}</Highlight>;
    }
    return part;
  });

  return highlightedText;
};

export const NoteCard = ({ title, paragraph, date, onPress, keyword }) => {
  const theme = useTheme();
  return (
    <Card
      style={{
        backgroundColor: theme.colors.ui.primary,
      }}
      onPress={onPress}
    >
      <Card.Title
        titleStyle={{
          fontSize: 18,
          color: theme.colors.text.primary,
        }}
        title={highlightKeyword(title, keyword)}
      />
      <Card.Content>
        <Paragraph
          numberOfLines={4}
          style={{ fontSize: 14, color: theme.colors.text.secondary }}
        >
          {highlightKeyword(paragraph, keyword)}
        </Paragraph>
        <Spacer position="top" size="large" />
        <Paragraph
          numberOfLines={1}
          style={{ fontSize: 14, color: theme.colors.text.disabled }}
        >
          {date}
        </Paragraph>
      </Card.Content>
    </Card>
  );
};
