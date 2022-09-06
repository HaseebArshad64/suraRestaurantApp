import * as React from 'react';
import {Alert, View} from 'react-native';
import {Container, Text, Button} from '@src/components/elements';
import SuccessOrderModal from './SuccessOrderModal';
import styles from './styles';
import {formatCurrency} from '@src/utils/number-formatter';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import {placeOrderAPI} from '@src/database/backendApi';
import {emptyCart} from '@src/components/store/actions/cartActions';

type PlaceOrderProps = {
  name: string;
  phoneNumber: number;
  address: string;
  paymentMethod: string;
  vehicleType: string;
  cart?: any;
  totalPrice: number;
  shippingFee: number;
};

const PlaceOrder: React.FC<PlaceOrderProps> = ({
  name,
  phoneNumber,
  address,
  cart,
  totalPrice,
  shippingFee,
  paymentMethod,
  vehicleType,
}) => {
  const [
    isSuccessOrderModalVisible,
    setIsSuccessOrderModalVisible,
  ] = React.useState(false);

  const {
    currentUser: {id: restaurantId},
  } = useSelector((data) => data.auth);

  const order = {
    name,
    phoneNumber,
    address,
    cart,
    restaurantId,
    totalPrice,
    paymentMethod,
    vehicleType,
  };

  const dispatch = useDispatch();

  const _onPlaceOrderButtonPressed = async () => {
    if (!_.isEmpty(address) && !_.isEmpty(phoneNumber)) {
      setIsSuccessOrderModalVisible(true);
      try {
        await placeOrderAPI(order);
      } catch (error) {
        Alert.alert('error', error);
      }
    } else if (_.isEmpty(address)) {
      Alert.alert('error', 'Please input address');
    } else if (_.isEmpty(phoneNumber)) {
      Alert.alert('error', 'Please input phone number');
    }
  };

  return (
    <Container style={styles.placeOrderContainer}>
      <View style={styles.totalPriceContainer}>
        <Text style={styles.totalPriceText}>Total</Text>
        <Text isBold style={styles.totalPriceText}>
          {formatCurrency(totalPrice + shippingFee)}
        </Text>
      </View>
      <Button isFullWidth onPress={_onPlaceOrderButtonPressed}>
        <Text isBold style={styles.placeOrderText}>
          Place Order
        </Text>
      </Button>
      <SuccessOrderModal
        address={address}
        phoneNumber={phoneNumber}
        cart={cart}
        totalPrice={totalPrice + shippingFee}
        isVisible={isSuccessOrderModalVisible}
        setIsVisble={setIsSuccessOrderModalVisible}
      />
    </Container>
  );
};

export default PlaceOrder;
