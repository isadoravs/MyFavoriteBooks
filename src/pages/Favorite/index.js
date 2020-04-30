/*
 * Tela que mostra os livros marcados como favoritos.
 * mostra os livros em forma de lista
 */

import * as React from 'react';
import {useSelector} from 'react-redux';
import {View, StyleSheet, FlatList, Text, SafeAreaView} from 'react-native';
import ItemList from '~/components/itemBooks';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '~/styles/colors';

export default function FavoriteScreen({navigation}) {
  const favorites = useSelector(state => state.books.favorites);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <FlatList
          data={favorites}
          renderItem={({item}) => (
            <ItemList item={item} navigation={navigation} />
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.containerStyle}
          ListEmptyComponent={() => <EmptyContainer />}
          disableVirtualization={true}
        />
      </View>
    </SafeAreaView>
  );
}

function EmptyContainer() {
  return (
    <View style={styles.empty}>
      <Ionicons name={'ios-heart'} size={40} color={Colors.black} />
      <Text style={styles.message}>Não há favoritos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    alignSelf: 'center',
  },
  message: {
    fontSize: 16,
  },
  containerStyle: {
    flexGrow: 1,
  },
});
