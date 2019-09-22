/**
 * created by musta at 9/22/2019
 */

import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import { injectIntl, IntlShape } from 'react-intl';
import { NavigationStackProp } from 'react-navigation-stack';
import { NavigationParams, NavigationState } from 'react-navigation';
import { navigationConstants, translationConstants } from '../constants';

interface Props {
  intl: IntlShape,
  navigation: NavigationStackProp<NavigationState, NavigationParams>;
}

class DonationFormScreen extends PureComponent<Props> {
  static navigationOptions = ({ screenProps, navigation }) => {
    const project = navigation.getParam(navigationConstants.SCREEN_PARAM_PROJECT);
    const title: string = screenProps.intl.formatMessage({ id: translationConstants.DONATE });
    return {
      title: `${title} ${project.name}`,
    };
  };

  render() {
    return (
      <View>
        <Input
          inputStyle={styles.input}
          placeholder={this.props.intl.formatMessage({ id: translationConstants.DONOR_NAME_PLACEHOLDER })}
          rightIcon={
            <Icon color={'gray'}
                  name={'account-card-details'}
                  type={'material-community'}
                  size={22}/>
          }
        />
        <Input
          inputStyle={styles.input}
          placeholder={this.props.intl.formatMessage({ id: translationConstants.DONOR_PHONE_PLACEHOLDER })}
          rightIcon={
            <Icon color={'gray'}
                  name={'whatsapp'}
                  type={'material-community'}
                  size={22}/>
          }
        />

        <Input
          inputStyle={styles.input}
          placeholder={this.props.intl.formatMessage({ id: translationConstants.DONOR_MONEY_AMOUNT })}
          rightIcon={
            <Icon color={'gray'}
                  name={'money'}
                  type={'font-awesome'}
                  size={22}/>
          }
        />
        <Button buttonStyle={styles.donateBtn} title={this.props.intl.formatMessage({ id: translationConstants.DONATE })}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  donateBtn: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  input: {
    marginHorizontal: 10,
  },
});

export default injectIntl(DonationFormScreen);
