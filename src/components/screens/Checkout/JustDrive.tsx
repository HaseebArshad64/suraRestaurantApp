import * as React from 'react';
import {ScrollView, TextInput, View} from 'react-native';
import DeliveryInformation from './DeliveryInformation';
import OrderSummary from './OrderSummary';
import PaymentMethod from './PaymentMethod';
import styles from './styles';
import PlaceOrder from './PlaceOrder';
import DishesAlsoOrdered from './DishesAlsoOrdered';
import CartContext from '@src/context/cart-context';
import {useSelector} from 'react-redux';
import _ from 'lodash';
import {Text} from '@src/components/elements';

type BasketProps = {};

const shippingFee = 5;

const JustDrive: React.FC<BasketProps> = () => {
  const [name, setName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [paymentMethod, setPaymentMethod] = React.useState('cash');
  const [vehicleType, setVehicleType] = React.useState('bike');
  const {cart} = useSelector((data) => data.cart) || {};
  const [totalPrice, setTotalPrice] = React.useState(0);

  let price = 0;
  for (let i = 0; i < cart.length; i++) {
    if (cart.length > 0) {
      price = price + cart[i].totalPrice;
    }
  }

  return (
    <View style={styles.rootContainer}>
      <>
        <ScrollView
          contentInset={{
            bottom: 25,
          }}>
          <DeliveryInformation
            address={address}
            setAddress={setAddress}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            name={name}
            setName={setName}
            isJustHire={true}
            totalPrice={totalPrice}
            setTotalPrice={setTotalPrice}
          />
          {/* <OrderSummary
            cartItems={cart}
            totalPrice={price}
            shippingFee={shippingFee}
          /> */}
          {/* <DishesAlsoOrdered /> */}
          <PaymentMethod
            selectedPaymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            vehicleType={vehicleType}
            setVehicleType={setVehicleType}
          />
        </ScrollView>
        <PlaceOrder
          name={name}
          phoneNumber={phoneNumber}
          address={address}
          totalPrice={totalPrice}
          paymentMethod={paymentMethod}
          vehicleType={vehicleType}
        />
      </>
    </View>
  );
};

export default JustDrive;
