import React, { useContext, useState, useEffect } from "react";
import { Text, View } from "react-native";
import { Button, Card, Title, Paragraph } from "react-native-paper";
import styled from "styled-components/native";
import { useTheme } from "styled-components";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Search } from "../components/search.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { FlatGrid } from "react-native-super-grid";
import { NoteCard } from "../components/note-card.component";
const Container = styled.View`
  flex: 1;
`;
const SearchContainer = styled.View`
  z-index: 999;
  flex: 0.15;
  width: 100%;
`;

const data = {
  articles: [
    {
      title: "The Benefits of Drinking Coffee",
      content:
        "Coffee is a beverage that is enjoyed by people all around the world. It has been found to have many benefits, such as improving cognitive function, reducing the risk of certain diseases, and increasing alertness. Studies have also shown that drinking coffee can help to improve athletic performance and reduce muscle pain. Additionally, coffee is a rich source of antioxidants, which can help to protect the body against oxidative stress.",
    },
    {
      title: "The Impact of Social Media on Mental Health",
      content:
        "Social media has become an integral part of our lives, with millions of people using it on a daily basis. While it has many benefits, such as connecting people from all around the world and providing a platform for activism, it can also have negative effects on mental health. Studies have shown that social media use is associated with increased anxiety, depression, and stress. It can also lead to feelings of loneliness and isolation, as well as addiction and other negative behaviors.",
    },
    {
      title: "The Importance of Exercise for Maintaining Health",
      content:
        "Exercise is a critical component of a healthy lifestyle. It has been shown to have many benefits, such as reducing the risk of chronic diseases like heart disease and diabetes, improving mental health, and increasing longevity. Exercise can also help to maintain a healthy weight and improve physical function. It is recommended that adults engage in at least 150 minutes of moderate-intensity exercise per week, such as brisk walking or cycling.",
    },
    {
      title: "The Impact of Climate Change on Biodiversity",
      content:
        "Climate change is one of the most pressing issues facing our planet today. It is having a significant impact on biodiversity, with many species at risk of extinction due to changes in their habitats and the destruction of ecosystems. Rising temperatures are also affecting the timing of seasonal events, such as the blooming of flowers and the migration of birds. The loss of biodiversity can have far-reaching consequences for ecosystems, such as reducing the availability of food and increasing the risk of disease outbreaks.",
    },
    {
      title: "The Impact of Climate Change on Biodiversity",
      content:
        "Climate change is one of the most pressing issues facing our planet today. It is having a significant impact on biodiversity, with many species at risk of extinction due to changes in their habitats and the destruction of ecosystems. Rising temperatures are also affecting the timing of seasonal events, such as the blooming of flowers and the migration of birds. The loss of biodiversity can have far-reaching consequences for ecosystems, such as reducing the availability of food and increasing the risk of disease outbreaks.",
    },
    {
      title: "The Benefits of Drinking Coffee",
      content:
        "Coffee is a beverage that is enjoyed by people all around the world. It has been found to have many benefits, such as improving cognitive function, reducing the risk of certain diseases, and increasing alertness. Studies have also shown that drinking coffee can help to improve athletic performance and reduce muscle pain. Additionally, coffee is a rich source of antioxidants, which can help to protect the body against oxidative stress.",
    },
    {
      title: "The Impact of Social Media on Mental Health",
      content:
        "Social media has become an integral part of our lives, with millions of people using it on a daily basis. While it has many benefits, such as connecting people from all around the world and providing a platform for activism, it can also have negative effects on mental health. Studies have shown that social media use is associated with increased anxiety, depression, and stress. It can also lead to feelings of loneliness and isolation, as well as addiction and other negative behaviors.",
    },
    {
      title: "The Importance of Exercise for Maintaining Health",
      content:
        "Exercise is a critical component of a healthy lifestyle. It has been shown to have many benefits, such as reducing the risk of chronic diseases like heart disease and diabetes, improving mental health, and increasing longevity. Exercise can also help to maintain a healthy weight and improve physical function. It is recommended that adults engage in at least 150 minutes of moderate-intensity exercise per week, such as brisk walking or cycling.",
    },
    {
      title: "The Impact of Climate Change on Biodiversity",
      content:
        "Climate change is one of the most pressing issues facing our planet today. It is having a significant impact on biodiversity, with many species at risk of extinction due to changes in their habitats and the destruction of ecosystems. Rising temperatures are also affecting the timing of seasonal events, such as the blooming of flowers and the migration of birds. The loss of biodiversity can have far-reaching consequences for ecosystems, such as reducing the availability of food and increasing the risk of disease outbreaks.",
    },
    {
      title: "The Impact of Climate Change on Biodiversity",
      content:
        "Climate change is one of the most pressing issues facing our planet today. It is having a significant impact on biodiversity, with many species at risk of extinction due to changes in their habitats and the destruction of ecosystems. Rising temperatures are also affecting the timing of seasonal events, such as the blooming of flowers and the migration of birds. The loss of biodiversity can have far-reaching consequences for ecosystems, such as reducing the availability of food and increasing the risk of disease outbreaks.",
    },
  ],
};

export const NotesScreen = () => {
  const theme = useTheme();
  const text =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in nunc nec velit consectetur sagittis. Vivamus at dictum diam. Sed vitae elit eleifend, sollicitudin ligula sit amet, porta dui. Suspendisse tempor mi ut nibh sollicitudin, non ornare tortor cursus. Aenean non sapien nec sapien maximus tempor ac vitae justo. Integer commodo, lorem at aliquet dignissim, nisl elit dictum risus, sit amet luctus erat nisl id metus. Aenean id ante ut orci porttitor maximus. Nam eget maximus diam. Maecenas lacinia dictum massa, vel finibus est porttitor a. Nullam in consectetur libero, at pretium nisl.";
  return (
    <SafeArea>
      <SearchContainer>
        <Search />
      </SearchContainer>
      <Container>
        <Spacer position="top" size="large"></Spacer>
        <FlatGrid
          itemDimension={130}
          data={data.articles}
          renderItem={({ item }) => (
            <NoteCard title={item.title} paragraph={item.content} />
          )}
        />
      </Container>
    </SafeArea>
  );
};
