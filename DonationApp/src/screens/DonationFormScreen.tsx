/**
 * created by musta at 9/22/2019
 */

import React, { PureComponent } from 'react';
import { StyleSheet, Switch, View } from 'react-native';
import { Button, Icon, Input, ListItem } from 'react-native-elements';
import { injectIntl, IntlShape } from 'react-intl';
import { NavigationStackProp } from 'react-navigation-stack';
import { NavigationParams, NavigationState } from 'react-navigation';
import { navigationConstants, translationConstants } from '../constants';

interface Props {
  intl: IntlShape,
  navigation: NavigationStackProp<NavigationState, NavigationParams>;
}

interface State {
  donorDetailsIsVisible: boolean;
}

class DonationFormScreen extends PureComponent<Props> {
  state = {
    donorDetailsIsVisible: false,
  };

  static navigationOptions = ({ screenProps, navigation }) => {
    const project = navigation.getParam(navigationConstants.SCREEN_PARAM_PROJECT);
    const title: string = screenProps.intl.formatMessage({ id: translationConstants.DONATE });
    return {
      title: `${title} ${project.name}`,
    };
  };


  _onDonorDetailsIsVisibleChange = (value) => {
    this.setState({
      donorDetailsIsVisible: value,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.switchView}>
          <ListItem
            title={this.props.intl.formatMessage({ id: translationConstants.SWITCH_DONOR_PERSONAL_DETAILS })}
            rightElement={<Switch style={styles.switch}
                                  value={this.state.donorDetailsIsVisible} thumbColor={'#40A9FF'}
                                  trackColor={{ true: '#a0c1ff', false: 'gray' }}
                                  onValueChange={this._onDonorDetailsIsVisibleChange}/>}
          />

        </View>
        <View style={styles.actionsView}>
          {this.state.donorDetailsIsVisible && <View>
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
          </View>}
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
      </View>
    );
  }
}

export default injectIntl(DonationFormScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  donateBtn: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  text: {
    textAlign: 'left',
  },
  input: {
    marginHorizontal: 10,
  },
  actionsView: {
    marginTop: 20,
    flexDirection: 'column',
  },
  switchView: {
    justifyContent: 'space-between',
  },
  switch: {},
});

