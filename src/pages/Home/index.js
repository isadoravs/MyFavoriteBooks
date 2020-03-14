import * as React from 'react';
import {TextInput, View, StyleSheet, Text, FlatList} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {getBooks} from '../../store/ducks/books';

function Item({title}) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

function EmptyContainer() {
  return (
    <View>
      <Text>Faça uma busca</Text>
    </View>
  );
}

var index = 0;

export default function HomeScreen() {
  const dispatch = useDispatch();

  function searchBooks() {
    dispatch(getBooks(value, index));
    index++;
  }
  let books = useSelector(state => state.books.books);
  let loading = useSelector(state => state.books.loading);
  //let state = useSelector(st => st);

  console.log(books);

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
            data={books.items}
            renderItem={({item}) => <Item title={item.volumeInfo?.title} />}
            keyExtractor={item => item.id}
            onEndReached={() => searchBooks()}
            onEndReachedThreshold={0.5}
            initialNumToRender={10}
            disableVirtualization={true}
            ListEmptyComponent={() => <EmptyContainer />}
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
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
