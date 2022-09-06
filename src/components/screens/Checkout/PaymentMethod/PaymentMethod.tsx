import * as React from 'react';
import {Section} from '@src/components/elements';
import {Picker} from '@react-native-picker/picker';

type Props = {
  selectedPaymentMethod: string;
  setPaymentMethod: (e: string) => void;
  vehicleType: string;
  setVehicleType: (e: string) => void;
};

const PaymentMethod = (props: Props): JSX.Element => {
  const {
    selectedPaymentMethod,
    setPaymentMethod,
    vehicleType,
    setVehicleType,
  } = props;
  return (
    <>
      <Section title="Payment Method">
        <Picker
          selectedValue={selectedPaymentMethod}
          onValueChange={(itemValue) => setPaymentMethod(itemValue)}>
          <Picker.Item label="Cash" value="cash" />
          <Picker.Item label="Card" value="card" />
        </Picker>
      </Section>
      <Section title="Vehicle Type">
        <Picker
          selectedValue={vehicleType}
          onValueChange={(itemValue) => setVehicleType(itemValue)}>
          <Picker.Item label="Bike" value="bike" />
          <Picker.Item label="Car" value="car" />
        </Picker>
      </Section>
    </>
  );
};

export default PaymentMethod;
