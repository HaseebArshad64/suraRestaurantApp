import * as React from 'react';
import {Image, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Container, Text, Touchable} from '@src/components/elements';
import {Place} from '@src/data/mock-places';
import styles from './styles';
import PlaceCardInfo from '../PlaceCardInfo';
import {serverUrl} from '@src/database/backendApi';

type PlaceListItemProps = {
  data: Place;
};

const PlaceListItem: React.FC<PlaceListItemProps> = ({data}) => {
  const {image, productName, price, id} = data;
  const navigation = useNavigation();

  const _onPlaceItemPressed = (id) => {
    navigation.navigate('DishDetailsModal', {id});
  };

  return (
    <Touchable onPress={() => _onPlaceItemPressed(id)}>
      <Container style={styles.container}>
        <Image style={styles.image} source={{uri: `${serverUrl}${image}`}} />
        <View style={styles.placeInfoContainer}>
          <View style={styles.placeInfo}>
            <Text style={styles.placeTitle}>{productName}</Text>
            <Text style={styles.placeSubTitle}>{`${price} AED`}</Text>
          </View>
          {/* <PlaceCardInfo data={data} /> */}
        </View>
      </Container>
    </Touchable>
  );
};

export default PlaceListItem;
