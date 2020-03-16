import * as React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ItemList({navigation, item}) {
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
        <Ionicons name="ios-heart" color={'gray'} size={26} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
  },
  item: {
    flex: 1,
    backgroundColor: '#FAFAFA',
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
  thumbnail: {
    width: 60,
    height: 80,
  },
  favoriteIcon: {
    padding: 10,
  },
});
