import * as React from 'react';
import {ActivityIndicator, Modal, View} from 'react-native';
import styles from './styles';
import {List, Button, Text} from '@src/components/elements';
import {ListRowItemProps} from '@src/components/elements/List/ListRowItem';
import {
  getOrdersHistoryAPI,
  getOrdersHistoryProductsAPI,
} from '@src/database/backendApi';
import {useSelector} from 'react-redux';
import _ from 'lodash';
import HistorySummary from './HistorySummary';

type OrderHistoryProps = {};

const OrderHistory: React.FC<OrderHistoryProps> = () => {
  const [ordersHistory, setOrdersHistory] = React.useState([]);
  const [selectedOrder, setSelectedOrder] = React.useState([]);
  const [orderHistoryProducts, setOrderHistoryProducts] = React.useState([]);
  const [isVisible, setIsVisible] = React.useState(false);

  const {
    currentUser: {id: restaurantId},
  } = useSelector((data) => data.auth);

  const updateOrdersHistory = async () => {
    const orders = await getOrdersHistoryAPI(restaurantId);
    setOrdersHistory(orders);
  };

  React.useEffect(() => {
    updateOrdersHistory();
  }, []);

  const onViewDetailsPress = async (item: any) => {
    const {id} = item;
    setIsVisible(true);
    const orderProducts = await getOrdersHistoryProductsAPI(id);
    setOrderHistoryProducts(orderProducts);
    setSelectedOrder(item);
  };

  const data: ListRowItemProps[] = ordersHistory.map((item) => {
    const {id, adddate, name, status, orderPrice} = item;
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
    const utcSeconds = date.getUTCSeconds();
    return {
      id,
      title: name,
      subTitle: `${
        status === '0' ? 'In Progress' : 'Delivered'
      } | ${orderPrice} AED`,
      note: `${day} ${monthName} ${year} | ${utcHours}:${utcMinutes}:${utcSeconds}`,
      rightContainerStyle: styles.rightItemContainerStyle,
      rightIcon: (
        <Button isTransparent onPress={() => onViewDetailsPress(item)}>
          <Text isBold isPrimary>
            View Details
          </Text>
        </Button>
      ),
    };
  });
  return (
    <View style={styles.root}>
      {_.isEmpty(ordersHistory) ? (
        <ActivityIndicator size="large" color="orange" />
      ) : (
        <>
          <List data={data} />
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <Modal
              visible={isVisible}
              animationType="slide"
              style={{
                width: '100%',
              }}
              transparent={true}
              onRequestClose={() => {
                setIsVisible(!isVisible);
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  marginBottom: 60,
                }}>
                <View
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 20,
                    width: '100%',
                    height: 500,
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,
                  }}>
                  {/* <Text>{JSON.stringify(orderHistoryProducts)}</Text> */}
                  <HistorySummary
                    selectedOrder={selectedOrder}
                    orderHistoryProducts={orderHistoryProducts}
                    setIsVisible={setIsVisible}
                    totalPrice={100}
                    shippingFee={5}
                  />
                </View>
              </View>
            </Modal>
          </View>
        </>
      )}
    </View>
  );
};

export default OrderHistory;
