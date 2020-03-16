import * as React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import ItemList from '~/components/itemBooks';

export default function FavoriteScreen({navigation}) {
  const favorites = useSelector(state => state.books.favorites);
  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={({item}) => (
          <ItemList item={item} navigation={navigation} />
        )}
        keyExtractor={item => item.etag}
        ListEmptyComponent={() => <EmptyContainer />}
        disableVirtualization={true}
      />
    </View>
  );
}

function EmptyContainer() {
  return (
    <View style={styles.container}>
      <Text>Nenhum livro favorito</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
