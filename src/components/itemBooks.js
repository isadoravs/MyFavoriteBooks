import * as React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {addFavorite, removeFavorite} from '../store/ducks/books';
import Colors from '~/styles/colors';

export default function ItemList({navigation, item}) {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.books.favorites);
  const isFavorite = favorites.find(fav => fav === item);

  function favoriteShuffle() {
    if (isFavorite) {
      dispatch(removeFavorite(item));
    } else {
      dispatch(addFavorite(item));
    }
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('Details', {item: item})}>
        <Image
          style={styles.thumbnail}
          source={{uri: item.imageLinks?.smallThumbnail}}
        />
        <View style={styles.info}>
          <Text numberOfLines={2} style={styles.title}>
            {item.title}
          </Text>
          <Text numberOfLines={1} style={styles.authors}>
            {item.publisher}
          </Text>
          <Text numberOfLines={1} style={styles.authors}>
            {item.authors?.map((name, index) => {
              if (index === item.authors.length - 1) {
                return name;
              }
              return `${name}, `;
            })}
          </Text>
        </View>
      </TouchableOpacity>
      <Ionicons
        name="ios-heart"
        style={styles.favoriteIcon}
        size={26}
        color={isFavorite ? 'red' : Colors.inative}
        onPress={() => favoriteShuffle()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
    padding: 10,
    marginVertical: 1,
    marginHorizontal: 1,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
  },
  info: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
  },
  authors: {
    fontSize: 14,
    marginLeft: 10,
    color: 'gray',
    flexShrink: 2,
  },
  thumbnail: {
    width: 60,
    height: 80,
  },
  favoriteIcon: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
});
