import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

export default function FavoriteScreen() {
  const favorites = useSelector(state => state.books.favorites);
  console.log(favorites);
  return (
    <View style={styles.container}>
      {favorites?.map((text, index) => {
        return <Text key={index}>{text.title}</Text>;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
