import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Title, Paragraph } from "react-native-paper";
import { useTheme } from "styled-components";

export const NoteCard = ({ title, paragraph }) => {
  const theme = useTheme();
  return (
    <Card
      style={{
        backgroundColor: theme.colors.ui.primary,
      }}
    >
      <Card.Title
        titleStyle={{ color: theme.colors.text.primary }}
        title={title}
      />
      <Card.Content>
        <Paragraph
          numberOfLines={4}
          style={{ color: theme.colors.text.secondary }}
        >
          {paragraph}
        </Paragraph>
      </Card.Content>
    </Card>
  );
};
