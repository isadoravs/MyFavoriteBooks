import * as React from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {getBooks, getPage} from '../../store/ducks/books';

function Item({item, navigation}) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Details', {item: item})}>
      <View style={styles.item}>
        <Image
          style={styles.thumbnail}
          source={{uri: item.imageLinks?.smallThumbnail}}
        />
        <View flexDirection="column">
          <Text numberOfLines={2} style={styles.title}>
            {item.title}
          </Text>
          <Text style={styles.authors}>{item.publisher}</Text>
          <Text style={styles.authors}>
            {item.authors?.map((name, index) => {
              if (index === item.authors.length - 1) {
                return name;
              }
              return `${name}, `;
            })}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function EmptyContainer() {
  return (
    <View>
      <Text>Faça uma busca</Text>
    </View>
  );
}

function FooterComponent({loading}) {
  if (!loading) {
    return null;
  }
  return (
    <View style={styles.loading}>
      <ActivityIndicator animating size="large" />
    </View>
  );
}

var index = 0;

export default function HomeScreen({navigation}) {
  const dispatch = useDispatch();

  function searchBooks() {
    dispatch(getBooks(value));
  }
  function nextPage() {
    if (books.length < totalItems) {
      index++;
      dispatch(getPage(value, index * 10));
    }
  }
  let books = useSelector(state => state.books.books);
  let loading = useSelector(state => state.books.loading);
  let loadingPage = useSelector(state => state.books.loadingPage);
  let totalItems = useSelector(state => state.books.totalItems);

  const [value, onChangeText] = React.useState('');
  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <Ionicons
          style={styles.searchIcon}
          name="ios-search"
          size={20}
          color="#000"
        />
        <TextInput
          style={styles.input}
          placeholder="Pesquisar"
          onChangeText={text => {
            onChangeText(text);
            index = 0;
          }}
          onEndEditing={() => {
            searchBooks();
          }}
          underlineColorAndroid="transparent"
          value={value}
        />
        <Ionicons
          style={styles.searchIcon}
          name="ios-close"
          size={26}
          color="#000"
          onPress={() => onChangeText('')}
        />
      </View>
      <View style={styles.container}>
        {loading ? (
          <Text>Carregando...</Text>
        ) : (
          <FlatList
            data={books}
            renderItem={({item}) => (
              <Item item={item?.volumeInfo} navigation={navigation} />
            )}
            keyExtractor={item => item.etag}
            onEndReached={() => nextPage()}
            disableVirtualization={true}
            ListEmptyComponent={() => <EmptyContainer />}
            ListFooterComponent={() => (
              <FooterComponent loading={loadingPage} />
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
  },
  searchSection: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
    color: '#424242',
  },
  item: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 1,
    marginHorizontal: 1,
    flexDirection: 'row',
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
  loading: {
    flex: 1,
    padding: 10,
  },
  thumbnail: {
    width: 60,
    height: 80,
  },
  favoriteIcon: {
    padding: 10,
  },
});
