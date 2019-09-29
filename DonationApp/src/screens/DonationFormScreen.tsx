/**
 * created by musta at 9/22/2019
 */

import React, { PureComponent } from 'react';
import { StyleSheet, Switch, Text, ToastAndroid, View } from 'react-native';
import { Button, Icon, Input, ListItem } from 'react-native-elements';
import { injectIntl, IntlShape } from 'react-intl';
import { NavigationStackProp } from 'react-navigation-stack';
import { NavigationParams, NavigationState } from 'react-navigation';
import { navigationConstants, translationConstants, validationConstants } from '../constants';
import { ValidationField } from '../types';
import PhoneInput from 'react-native-phone-input';
import { projectsService, validationService } from '../services';
import { connect } from 'react-redux';
import { hideUiLoaderAction, showUiLoaderAction } from '../redux-store/actions';

interface Props {
  intl: IntlShape,
  navigation: NavigationStackProp<NavigationState, NavigationParams>;
  showUiLoader: typeof showUiLoaderAction;
  hideUiLoader: typeof hideUiLoaderAction;
}

interface State {
  donorDetailsIsVisible: boolean;
  donationAmount: ValidationField;
  donorName: ValidationField;
  donorNumber: ValidationField;
  formError: boolean;

  [key: string]: any;
}

class DonationFormScreen extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      donorDetailsIsVisible: false,
      formError: false,
      donationAmount: {
        hasError: false,
        validationTypes: [validationConstants.NOT_EMPTY],
        value: '',
      },
      donorName: {
        hasError: false,
        validationTypes: [validationConstants.NOT_EMPTY],
        value: '',
      },
      donorNumber: {
        hasError: false,
        validationTypes: [validationConstants.NOT_EMPTY],
        value: '',
      },
    };
  }

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
      donorNumber: {
        hasError: false,
        validationTypes: [validationConstants.NOT_EMPTY],
        value: '',
      },
      donorName: {
        hasError: false,
        validationTypes: [validationConstants.NOT_EMPTY],
        value: '',
      },
    });

    if (!value) {
      this.setState({
        donorNumber: {
          hasError: false,
          validationTypes: [validationConstants.NOT_EMPTY],
          value: '',
        },
        donorName: {
          hasError: false,
          validationTypes: [validationConstants.NOT_EMPTY],
          value: '',
        },
      });
    }
  };


  onChangePhoneNumber = (value) => {
    this.setState(prevState => ({
      donorNumber: {
        ...prevState.donorNumber,
        value,
        hasError: !this.phone.isValidNumber(),
      },
    }));
  };


  onDonorNameChange = (value) => {
    this.setState(prevState => ({
      donorName: {
        ...prevState.donorName,
        value,
      },
    }));
  };


  onDonorAmountChange = (value) => {
    this.setState(prevState => ({
      donationAmount: {
        ...prevState.donationAmount,
        value,
      },
    }));

  };

  _formValidation = () => {
    let optionalFields = [];
    if (this.state.donorDetailsIsVisible) {
      optionalFields = ['donorName', 'donorNumber'];
    }
    let itemsToValidateKeys = ['donationAmount', ...optionalFields], validForm = true;
    for (let i = 0; i < itemsToValidateKeys.length; i++) {
      let key = itemsToValidateKeys[i], validKey = true;
      validKey = validationService.validateInput(this.state[key].validationTypes, this.state[key].value);
      this.setState({ [key]: Object.assign({}, this.state[key], { hasError: !validKey }) });
      if (!validKey)
        validForm = false;
    }
    this.setState({ formError: !validForm });
    return validForm;
  };

  submitDonation = async () => {
    if (this._formValidation()) {
      this.props.showUiLoader();
      const project = this.props.navigation.getParam(navigationConstants.SCREEN_PARAM_PROJECT);
      const message = await projectsService.donateForProject({
        project_id: project.id,
        amount: this.state.donationAmount.value,
        name: this.state.donorName.value,
        mobile: this.phone.getCountryCode() + this.state.donorNumber.value,
      });
      this.props.hideUiLoader();
      ToastAndroid.show(message, ToastAndroid.SHORT);
      this.props.navigation.goBack();
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.switchView}>
          <ListItem
            title={this.props.intl.formatMessage({ id: translationConstants.SWITCH_DONOR_PERSONAL_DETAILS })}
            rightElement={<Switch style={styles.switch}
                                  value={this.state.donorDetailsIsVisible}
                                  thumbColor={'#40A9FF'}
                                  trackColor={{ true: '#a0c1ff', false: 'gray' }}
                                  onValueChange={this._onDonorDetailsIsVisibleChange}/>}
          />

        </View>
        <View style={styles.actionsView}>

          {this.state.donorDetailsIsVisible && <View>
            <Input
              inputStyle={[styles.input]}
              errorMessage={this.state.formError && this.state.donorName.hasError && this.props.intl.formatMessage({ id: translationConstants.DONOR_NAME_INPUT_ERROR_MESSAGE })}
              placeholder={this.props.intl.formatMessage({ id: translationConstants.DONOR_NAME_PLACEHOLDER })}
              rightIcon={
                <Icon color={'gray'}
                      name={'account-card-details'}
                      type={'material-community'}
                      size={22}/>
              }
              value={this.state.donorName.value}
              onChangeText={this.onDonorNameChange}
            />
            <PhoneInput ref={ref => this.phone = ref}
                        initialCountry={'eg'}
                        flagStyle={styles.flagStyle}
                        onChangePhoneNumber={this.onChangePhoneNumber}
                        value={this.state.donorNumber.value}
                        textProps={{
                          placeholder: this.props.intl.formatMessage({ id: translationConstants.DONOR_PHONE_PLACEHOLDER }),
                          inputStyle: styles.input,
                        }}
                        keyboardType={'numeric'}
                        textComponent={Input}
            />
            {this.state.formError && this.state.donorNumber.hasError && <Text style={styles.errorText}>{
              this.props.intl.formatMessage({ id: translationConstants.DONOR_PHONE_INPUT_ERROR_MESSAGE })}</Text>}
          </View>}
          <Input
            inputStyle={styles.input}
            errorMessage={this.state.formError && this.state.donationAmount.hasError &&
            this.props.intl.formatMessage({ id: translationConstants.DONOR_MONEY_AMOUNT_INPUT_ERROR_MESSAGE })}
            placeholder={this.props.intl.formatMessage({ id: translationConstants.DONOR_MONEY_AMOUNT })}
            rightIcon={
              <Icon color={'gray'}
                    name={'money'}
                    type={'font-awesome'}
                    size={22}/>
            }
            keyboardType={'numeric'}
            value={this.state.donationAmount.value}
            onChangeText={this.onDonorAmountChange}
          />
          <Button buttonStyle={styles.donateBtn}
                  title={this.props.intl.formatMessage({ id: translationConstants.DONATE })}
                  onPress={this.submitDonation}
          />
        </View>
      </View>
    );
  }
}

export default connect(null, {
  showUiLoader: showUiLoaderAction,
  hideUiLoader: hideUiLoaderAction,
})(injectIntl(DonationFormScreen));

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
  flagStyle: {
    marginLeft: 10, borderWidth: 2, marginTop: 10, padding: 2, width: 50, height: 30, borderColor: '#bdc3c7',
  },
  errorText: {
    textAlign: 'left',
    color: '#ff190c',
    fontSize: 12,
    marginLeft: 85,
  },
});

