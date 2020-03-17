import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {addFavorite, removeFavorite} from '../../store/ducks/books';
import {useSelector, useDispatch} from 'react-redux';
import Colors from '~/styles/colors';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

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
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View>
          <View style={styles.header}>
            <Ionicons
              name={'ios-heart'}
              color={isFavorite ? 'red' : Colors.inative}
              size={30}
              onPress={() => favoriteShuffle()}
            />
          </View>

          <Image
            style={styles.thumbnail}
            source={{uri: item.imageLinks?.thumbnail}}
            resizeMethod={'scale'}
          />
          <View style={styles.body}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.subtitle}</Text>
            <Text>{item.publisher}</Text>
            <Text>
              {item.authors?.map((name, index) => {
                if (index === item.authors.length - 1) {
                  return name;
                }
                return `${name}, `;
              })}
            </Text>
            <Text>{item.publishedDate}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: `${Colors.gray}`,
  },
  thumbnail: {
    margin: 10,
    marginHorizontal: 40,
    width: deviceWidth / 2.5,
    height: deviceHeight / 3,
    alignSelf: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    paddingBottom: 10,
  },
  body: {
    fontSize: 14,
    color: 'gray',
    padding: 10,
    paddingTop: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 15,
    paddingBottom: 0,
  },
  description: {
    paddingTop: 10,
  },
});
