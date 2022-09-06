import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Carousel, Section, Card} from '@src/components/elements';
import {Dimensions} from 'react-native';
import {mockPlaces, Place} from '@src/data/mock-places';
import PlaceCardInfo from '@src/components/common/PlaceCardInfo';
import {useSelector} from 'react-redux';
import _ from 'lodash';
import {serverUrl} from '@src/database/backendApi';

type HotDealsProps = {};

const HotDeals: React.FC<HotDealsProps> = () => {
  const navigation = useNavigation();

  const _onPlaceItemPressed = (id) => {
    navigation.navigate('DishDetailsModal', {id});
  };

  const products = useSelector((data) => data.auth.products) || {};

  const newData = [];

  _.map(products, (item) => {
    const {hotDeal} = item;
    if (hotDeal) {
      newData.push(item);
    }
  });

  return (
    <>
      {!_.isEmpty(newData) && (
        <Section title="Hot Deals Around You" actionButtonText="View more">
          <Carousel
            data={newData}
            itemWidth={Dimensions.get('window').width / 2 - 15}
            renderContent={(item: Place, index, parallaxProps) => {
              const {productName, image, price, id} = item;
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

export default HotDeals;
