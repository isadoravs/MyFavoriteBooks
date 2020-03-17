import * as React from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {getPage} from '~/store/ducks/books';
import ItemList from '~/components/itemBooks';
import Colors from '~/styles/colors';

function EmptyContainer({message}) {
  return (
    <View style={styles.empty}>
      <Ionicons name={'ios-search'} size={40} color={Colors.black} />
      <Text style={styles.message}>{message}</Text>
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
    dispatch(getPage(value));
  }
  function nextPage() {
    if (books.length < totalItems) {
      index++;
      dispatch(getPage(value, index * 10));
    }
  }
  let books = useSelector(state => state.books.books);
  let loading = useSelector(state => state.books.loading);
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
        {totalItems ? (
          <FlatList
            data={books}
            renderItem={({item}) => (
              <ItemList item={item?.volumeInfo} navigation={navigation} />
            )}
            keyExtractor={item => item.etag}
            onEndReached={() => nextPage()}
            disableVirtualization={true}
            contentContainerStyle={styles.containerStyle}
            ListEmptyComponent={() => (
              <EmptyContainer message={'Faça uma busca'} />
            )}
            ListFooterComponent={() => <FooterComponent loading={loading} />}
          />
        ) : (
          <EmptyContainer message={'A busca não retornou resultados'} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchSection: {
    flexDirection: 'row',
    backgroundColor: Colors.darkgray,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    backgroundColor: Colors.darkgray,
    color: Colors.black,
  },
  item: {
    flex: 1,
    backgroundColor: Colors.darkgray,
    padding: 10,
    marginVertical: 1,
    marginHorizontal: 1,
    flexDirection: 'row',
  },
  loading: {
    flex: 1,
    padding: 10,
  },
  favoriteIcon: {
    padding: 10,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  message: {
    fontSize: 16,
  },
  containerStyle: {
    flexGrow: 1,
  },
});
