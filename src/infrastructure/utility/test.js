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
      <NoteCard
        id={item.id}
        title={item.title}
        paragraph={item.content}
        date={formatDate(new Date(item.date))}
        onPress={() => {
          navigation.navigate("EditNote", { noteId: item.id });
        }}
        keyword={keyword}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No notes available
          </Text>
        }
      />
    </View>
  )}
/>;
