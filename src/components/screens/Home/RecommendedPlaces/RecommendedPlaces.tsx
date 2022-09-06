import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Carousel, Section, Card} from '@src/components/elements';
import {Dimensions} from 'react-native';
import {mockPlaces, Place} from '@src/data/mock-places';
import PlaceCardInfo from '@src/components/common/PlaceCardInfo';
import {useSelector} from 'react-redux';
import {serverUrl} from '@src/database/backendApi';
import _ from 'lodash';

type RecommendedPlacesProps = {};

const RecommendedPlaces: React.FC<RecommendedPlacesProps> = () => {
  const navigation = useNavigation();

  const _onButtonActionPressed = () => {
    navigation.navigate('PlaceListScreen', {title: 'Recommended'});
  };

  const _onPlaceItemPressed = (id: number) => {
    navigation.navigate('DishDetailsModal', {id});
  };

  const products = useSelector((data) => data.auth.products) || {};

  const newData = [];

  _.map(products, (item) => {
    const {recommended} = item;
    if (recommended) {
      newData.push(item);
    }
  });

  return (
    <>
      {!_.isEmpty(newData) && (
        <Section
          title="Recommended"
          actionButtonText="View more"
          onButtonActionPressed={_onButtonActionPressed}>
          <Carousel
            data={newData}
            itemWidth={Dimensions.get('window').width / 2 - 15}
            renderContent={(item, index, parallaxProps) => {
              const {image, productName, id, price} = item;
              return (
                <Card
                  coverImage={{uri: `${serverUrl}${image}`}}
                  isSmallCover
                  title={productName}
                  subTitle={`${price} AED`}
                  parallaxProps={parallaxProps}
                  onPress={() => _onPlaceItemPressed(id)}>
                  {/* <PlaceCardInfo data={item} /> */}
                </Card>
              );
            }}
          />
        </Section>
      )}
    </>
  );
};

export default RecommendedPlaces;
