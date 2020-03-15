import * as React from 'react';
import {View, StyleSheet, Text, Image, Dimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {addFavorite, removeFavorite} from '../../store/ducks/books';
import {useSelector, useDispatch} from 'react-redux';

const deviceWidth = Dimensions.get('window').width;

export default function DetailsScreen({route}) {
  const dispatch = useDispatch();
  const {item} = route.params;
  const favorites = useSelector(state => state.books.favorites);
  const isFavorite = favorites.filter(fav => fav === item).length;

  function favoriteShuffle() {
    if (isFavorite) {
      dispatch(removeFavorite(item));
    } else {
      dispatch(addFavorite(item));
    }
  }
  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Image
            style={styles.thumbnail}
            source={{uri: item.imageLinks?.thumbnail}}
            resizeMethod={'scale'}
          />
          <Ionicons
            name={'ios-heart'}
            color={isFavorite ? 'red' : 'gray'}
            size={26}
            onPress={() => favoriteShuffle()}
          />
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text>{item.subtitle}</Text>
        <Text style={styles.description}>{item.publisher}</Text>
        <Text style={styles.description}>
          {item.authors?.map((name, index) => {
            if (index === item.authors.length - 1) {
              return name;
            }
            return `${name}, `;
          })}
        </Text>
        <Text>{item.publishedDate}</Text>
        <Text>{item.description}</Text>
        <Text>{item.title}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    flexDirection: 'column',
  },
  thumbnail: {
    margin: 10,
    marginHorizontal: 40,
    width: deviceWidth / 3,
    height: deviceWidth / 2,
    alignSelf: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  description: {
    fontSize: 14,
    color: 'gray',
  },
});
