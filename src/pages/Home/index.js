/*
 * Tela para pesquisa de livros, mostra o resultado da requisição na API Google Books em forma de lista 
 * onde os itens podem ser pressionados para navegar até a tela de detalhes
 */

import React, {useState} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {getPage, getBooks} from '~/store/ducks/books';
import ItemList from '~/components/itemBooks';
import Colors from '~/styles/colors';
import Snackbar from 'react-native-snackbar';

//método que renderiza quando a busca não retorna resultados ou quando a lista de livros está vazia
function EmptyContainer({message}) {
  return (
    <View style={styles.empty}>
      <Ionicons name={'ios-search'} size={40} color={Colors.black} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

//método para renderizar um loading enquanto a store está realizando uma requisição
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

export default function HomeScreen({navigation}) {
  const [index, setIndex] = useState(1);
  
  const dispatch = useDispatch();
  
  //livros que vieram do resultado da requisicao na API
  const books = useSelector(state => state.books.books);
  //loading que indica quando a requisição termina
  const loading = useSelector(state => state.books.loading);
  //total de livros que correspondem à busca
  const totalItems = useSelector(state => state.books.totalItems);
  //erro na requisição
  const error = useSelector(state => state.books.error);

  if (error) {
    Snackbar.show({
      text: error,
      duration: Snackbar.LENGTH_SHORT,
    });
  }

  function searchBooks() {
    dispatch(getBooks(value));
    setIndex(1);
  }
  function nextPage() {
    if (books.length < totalItems) {
      dispatch(getPage(value, index * 10));
      setIndex(index + 1);
    }
  }

  const [value, onChangeText] = React.useState('');
  return (
    <SafeAreaView style={styles.container}>
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
              keyExtractor={item => item.id}
              onEndReached={() => nextPage()}
              onEndReachedThreshold={0.5}
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
    </SafeAreaView>
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
