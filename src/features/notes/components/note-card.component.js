import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Title, Paragraph } from "react-native-paper";
import { useTheme } from "styled-components";
import { Spacer } from "../../../components/spacer/spacer.component";

export const NoteCard = ({ title, paragraph, date, onPress }) => {
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
        title={title}
      />
      <Card.Content>
        <Paragraph
          numberOfLines={4}
          style={{ fontSize: 14, color: theme.colors.text.secondary }}
        >
          {paragraph}
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
