import * as React from 'react';
import {Container} from '@src/components/elements';
import {FeaturedTab, NewestTab, TrendingTab} from './Tabs';
import {TabView} from '@src/components/elements';
import styles from './styles';
import {TabViewData} from '@src/components/elements/TabView/TabView';
import _ from 'lodash';

type RemarkablePlacesProps = {};

const tabData: TabViewData = [
  {key: '0', title: 'Featured', content: FeaturedTab},
  {
    key: '1',
    title: 'Newest',
    content: NewestTab,
  },
];

const RemarkablePlaces: React.FC<RemarkablePlacesProps> = () => {
  return (
    <>
      {!_.isEmpty(tabData[0].content()) && !_.isEmpty(tabData[1].content()) && (
        <Container style={styles.container}>
          <TabView
            tabData={tabData}
            tabBarStyle={styles.tabBarStyle}
            isTabBarFullWidth
          />
        </Container>
      )}
    </>
  );
};

export default RemarkablePlaces;
