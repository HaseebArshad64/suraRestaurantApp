import * as React from 'react';
import {View, Image, Platform, TextInput} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {AndroidEvent} from '@react-native-community/datetimepicker';
import {
  Container,
  Text,
  Button,
  Section,
  Divider,
  DateTimePicker,
} from '@src/components/elements';
import styles from './styles';

type DeliveryInformationProps = {
  address: string;
  setAddress: (e) => void;
  phoneNumber: string;
  setPhoneNumber: (e) => void;
  name: string;
  setName: (e) => void;
  isJustHire: boolean;
};

const DeliveryInformation: React.FC<DeliveryInformationProps> = ({
  address,
  setAddress,
  phoneNumber,
  setPhoneNumber,
  name,
  setName,
  totalPrice,
  setTotalPrice,
  isJustHire,
}) => {
  const {
    colors: {primary: baseBackgroundColor},
  } = useTheme();
  const navigation = useNavigation();
  const [date, setDate] = React.useState(new Date(1598051730000));
  const [showDateTimePicker, setShowDateTimePicker] = React.useState(false);

  const onChangeAddressButtonPressed = () => {
    navigation.navigate('ChangeAddressScreen');
  };

  const onChange = (event: AndroidEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDateTimePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const _onChangeTimeButtonPressed = () => {
    setShowDateTimePicker(!showDateTimePicker);
  };

  return (
    <Section
      title="Deliver to"
      // actionButtonText="Change address"
      // onButtonActionPressed={onChangeAddressButtonPressed}
    >
      <Container>
        <View style={styles.deliveryContainer}>
          <View style={styles.locationContainer}>
            <Image
              source={require('@src/assets/checkout/map.png')}
              style={styles.locationImage}
            />
          </View>
          <View>
            <TextInput
              placeholder="Name"
              value={name}
              placeholderTextColor={baseBackgroundColor}
              style={{color: baseBackgroundColor}}
              onChangeText={(e) => setName(e)}
            />
            <TextInput
              placeholder="Phone Number"
              value={phoneNumber}
              keyboardType="number-pad"
              placeholderTextColor={baseBackgroundColor}
              style={{color: baseBackgroundColor}}
              onChangeText={(e) => setPhoneNumber(e)}
            />
            <TextInput
              placeholder="Delivery Address"
              value={address}
              placeholderTextColor={baseBackgroundColor}
              style={{color: baseBackgroundColor}}
              onChangeText={(e) => setAddress(e)}
            />
            {isJustHire && (
              <TextInput
                placeholder="Price"
                value={totalPrice}
                placeholderTextColor={baseBackgroundColor}
                style={{color: baseBackgroundColor}}
                onChangeText={(e) => setTotalPrice(e)}
              />
            )}
          </View>
        </View>
      </Container>
    </Section>
  );
};

export default DeliveryInformation;
