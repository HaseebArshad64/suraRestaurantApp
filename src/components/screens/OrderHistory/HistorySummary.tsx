import * as React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {
  Container,
  Text,
  Section,
  Divider,
  Button,
} from '@src/components/elements';
import styles from '../Checkout/OrderSummary/styles';
import {CartItem} from '@src/context/cart-context';
import {formatCurrency} from '@src/utils/number-formatter';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import {removeFromCart} from '@src/components/store/actions/cartActions';

type OrderSummaryProps = {
  selectedOrder: CartItem[];
  orderHistoryProducts: CartItem[];
  totalPrice: number;
  shippingFee: number;
  setIsVisible: () => void;
};

const HistorySummary: React.FC<OrderSummaryProps> = ({
  selectedOrder,
  orderHistoryProducts,
  shippingFee,
  setIsVisible,
}) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = React.useState(true);
  const {
    colors: {primary: baseBackgroundColor},
  } = useTheme();

  const {
    id,
    orderPrice,
    name,
    adddate,
    customerAddress,
    phone,
    paymentMethod,
    vehicleType,
  } = selectedOrder;

  React.useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  const _onAddItemButtonPressed = (id) => {
    navigation.navigate('DishDetailsModal', {id});
  };

  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const date = new Date(adddate);
  const day = date.getDate();
  const monthName = month[date.getMonth()];
  const year = date.getFullYear();
  const utcHours = date.getUTCHours();
  const utcMinutes = date.getUTCMinutes();

  return (
    <>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="orange"
          style={{
            marginTop: 150,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}
        />
      ) : (
        <ScrollView style={{width: '90%'}}>
          <Section title="Order History Summary">
            <View style={{alignItems: 'center'}}>
              <Text>
                <Text style={{fontWeight: 'bold'}}>OrderId:</Text> {id}
              </Text>
              <Text>
                <Text style={{fontWeight: 'bold'}}>Name:</Text> {name}
              </Text>
              <Text>
                <Text style={{fontWeight: 'bold'}}>Date:</Text>{' '}
                {`${day} ${monthName} ${year}, ${utcHours}:${utcMinutes}`}
              </Text>
              <Text>
                <Text style={{fontWeight: 'bold'}}>Customer Address:</Text>{' '}
                {customerAddress}
              </Text>
              <Text>
                <Text style={{fontWeight: 'bold'}}>Contact Number:</Text>{' '}
                {phone}
              </Text>
              <Text>
                <Text style={{fontWeight: 'bold'}}>Payment Method:</Text>{' '}
                {paymentMethod}
              </Text>
              <Text>
                <Text style={{fontWeight: 'bold'}}>Vehicle Type:</Text>{' '}
                {vehicleType}
              </Text>
            </View>

            {orderHistoryProducts &&
              orderHistoryProducts.map((cartItem, cartItemIndex) => (
                <View style={styles.menuContainer}>
                  <View style={styles.menuInfo}>
                    <View key={cartItemIndex}>
                      <Text style={styles.mainDishText} isBold>
                        {`(${cartItem.quantity}) ${cartItem.productName}`}
                      </Text>
                    </View>
                  </View>
                  <Text isBold>{formatCurrency(cartItem.price)}</Text>
                </View>
              ))}
            <Divider />
            <View style={styles.priceContainer}>
              <View style={styles.subTotalContainer}>
                <Text>Subtotal</Text>
                <Text>{formatCurrency(orderPrice)}</Text>
              </View>
              <View style={styles.deliveryFee}>
                <Text>Delivery</Text>
                <Text>{formatCurrency(shippingFee)}</Text>
              </View>
            </View>
          </Section>
          <Button
            isFullWidth
            style={{marginTop: 20}}
            onPress={() => setIsVisible(false)}>
            <Text isBold style={{color: 'white'}}>
              Close
            </Text>
          </Button>
        </ScrollView>
      )}
    </>
  );
};

export default HistorySummary;
