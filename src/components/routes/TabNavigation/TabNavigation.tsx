import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import HomeStack from '../Stacks/HomeStack';
import AccountStack from '../Stacks/AccountStack';
import NotificationStack from '../Stacks/NotificationStack';
import CheckoutStack from '../Stacks/CheckoutStack';
import Documentation from '@src/components/screens/Documentation';
import ActivityHistoryStack from '../Stacks/ActivityHistoryStack';
import JustDriveStack from '../Stacks/JustDriveStack';

type TabNavigationProps = {};
type TabBarIconProps = {
  focused: boolean;
  color: string;
  size: number;
};
const Tab = createBottomTabNavigator();
const {Navigator} = Tab;

const renderTabBarIcon = (routeName: string) => {
  return (props: TabBarIconProps) => {
    const {color} = props;
    let iconName = 'home';
    switch (routeName) {
      case 'Explore':
        iconName = 'compass';
        break;
      case 'Just Hire':
        iconName = 'motorcycle';
        break;
      case 'Checkout':
        iconName = 'shopping-cart';
        break;
      case 'Account':
        iconName = 'user';
        break;
      // case 'Documentation':
      //   iconName = 'book';
      //   break;
      default:
        break;
    }
    return <Icon name={iconName} solid size={24} color={color} />;
  };
};

const TabNavigation: React.FC<TabNavigationProps> = () => {
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={(props) => {
        const {
          route: {name: routeName},
        } = props;
        return {
          tabBarIcon: renderTabBarIcon(routeName),
        };
      }}>
      <Tab.Screen name="Explore" component={HomeStack} />
      <Tab.Screen name="Just Hire" component={JustDriveStack} />
      <Tab.Screen name="Checkout" component={CheckoutStack} />
      <Tab.Screen name="Account" component={AccountStack} />
      {/* <Tab.Screen name="Documentation" component={Documentation} /> */}
    </Navigator>
  );
};

export default TabNavigation;
