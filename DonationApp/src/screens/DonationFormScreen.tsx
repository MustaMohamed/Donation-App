/**
 * created by musta at 9/22/2019
 */

import React, { PureComponent } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, Switch, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { Button, Icon, Image, Input, ListItem } from 'react-native-elements';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { NavigationStackProp } from 'react-navigation-stack';
import { NavigationParams, NavigationState } from 'react-navigation';
import { colorConstants, navigationConstants, translationConstants, validationConstants } from '../constants';
import { PaymentMethod, ValidationField } from '../types';
import PhoneInput from 'react-native-phone-input';
import { projectsService, validationService } from '../services';
import { connect } from 'react-redux';
import { hideUiLoaderAction, showUiLoaderAction } from '../redux-store/actions';
import { TextInputMask } from 'react-native-masked-text';

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
  moneyValue: string;
  activePaymentMethodIndex: number;

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
      moneyValue: '',
      activePaymentMethodIndex: 0,
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

  onMoneyTextChange = (text) => {
    this.onDonorAmountChange(text.slice(1));
    this.setState({
      moneyValue: text,
    });
  };

  onPaymentMethodItemPress = (index) => {
    this.setState({ activePaymentMethodIndex: index });
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
        name: this.state.donorDetailsIsVisible ? this.state.donorName.value : 'a',
        mobile: this.state.donorDetailsIsVisible ? this.phone.getCountryCode() + this.state.donorNumber.value : 'a',
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
            titleStyle={{ color: colorConstants.PRIMARY_GRAY }}
            containerStyle={styles.listItem}
            rightElement={<Switch style={styles.switch}
                                  value={this.state.donorDetailsIsVisible}
                                  thumbColor={colorConstants.PRIMARY_BLUE}
                                  trackColor={{ true: colorConstants.PRIMARY_GRAY, false: 'gray' }}
                                  onValueChange={this._onDonorDetailsIsVisibleChange}/>}
          />

        </View>
        <ScrollView contentContainerStyle={styles.actionsView}>

          {this.state.donorDetailsIsVisible && <View>
            <Input
              inputStyle={[styles.input]}
              errorMessage={this.state.formError && this.state.donorName.hasError && this.props.intl.formatMessage({ id: translationConstants.DONOR_NAME_INPUT_ERROR_MESSAGE })}
              placeholder={this.props.intl.formatMessage({ id: translationConstants.DONOR_NAME_PLACEHOLDER })}
              rightIcon={
                <Icon color={colorConstants.PRIMARY_GRAY}
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
          <Text style={styles.donationText}><FormattedMessage id={translationConstants.YOUR_DONATION}/></Text>
          <KeyboardAvoidingView>
            <TextInputMask
              type={'money'}
              options={{
                precision: 0,
                delimiter: ',',
                unit: '$',
                suffixUnit: '',
              }}
              customTextInput={Input}
              customTextInputProps={{
                inputStyle: [styles.input, styles.moneyInput],
                errorMessage: this.state.formError && this.state.donationAmount.hasError &&
                  this.props.intl.formatMessage({ id: translationConstants.DONOR_MONEY_AMOUNT_INPUT_ERROR_MESSAGE }),
                placeholder: this.props.intl.formatMessage({ id: translationConstants.DONOR_MONEY_AMOUNT }),
                rightIcon:
                  <Icon color={colorConstants.PRIMARY_GRAY}
                        name={'money'}
                        type={'font-awesome'}
                        size={22}/>,
                keyboardType: 'numeric',
                value: this.state.donationAmount.value,
                onChangeText: this.onDonorAmountChange,
              }}
              value={this.state.moneyValue}
              onChangeText={this.onMoneyTextChange}
              style={styles.input}
            />
          </KeyboardAvoidingView>
          <View style={styles.paymentMethods}>
            <TouchableOpacity style={[styles.imageContainer, this.state.activePaymentMethodIndex == PaymentMethod.CreditCard && styles.imageContainerActive]}
                              onPress={() => this.onPaymentMethodItemPress(PaymentMethod.CreditCard)}>
              <Image
                source={require('../assets/images/ic-visa.png')}
                style={styles.paymentMethodItem}
              />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.imageContainer, this.state.activePaymentMethodIndex == PaymentMethod.Fawry && styles.imageContainerActive]}
                              onPress={() => this.onPaymentMethodItemPress(PaymentMethod.Fawry)}>
              <Image
                source={require('../assets/images/ic-fawry.png')}
                style={[styles.paymentMethodItem, styles.fawry]}
              />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.imageContainer, this.state.activePaymentMethodIndex == PaymentMethod.Paypal && styles.imageContainerActive]}
                              onPress={() => this.onPaymentMethodItemPress(PaymentMethod.Paypal)}>
              <Image
                source={require('../assets/images/ic-paypal.png')}
                style={styles.paymentMethodItem}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Button buttonStyle={styles.donateBtn}
                    title={this.props.intl.formatMessage({ id: translationConstants.DONATE })}
                    onPress={this.submitDonation}
            />
          </View>
        </ScrollView>
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
    backgroundColor: colorConstants.PRIMARY_WHITE,
  },
  listItem: {
    backgroundColor: colorConstants.PRIMARY_WHITE,
  },
  donateBtn: {
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: colorConstants.PRIMARY_BLUE,
    borderRadius: 20,
    marginTop: 100,
  },
  text: {
    textAlign: 'left',
  },
  input: {
    marginHorizontal: 10,
  },
  donationText: {
    color: colorConstants.PRIMARY_GRAY,
    textAlign: 'center',
    marginVertical: 20,
  },
  moneyInput: {
    fontSize: 32,
    width: '60%',
    textAlign: 'center',
  },
  actionsView: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  switchView: {
    justifyContent: 'space-between',
  },
  switch: {},
  flagStyle: {
    marginLeft: 10,
    borderWidth: 2,
    marginTop: 10,
    padding: 2,
    width: 50,
    height: 30,
    borderColor: colorConstants.PRIMARY_GRAY,
  },
  errorText: {
    textAlign: 'left',
    color: colorConstants.PRIMARY_RED,
    fontSize: 12,
    marginLeft: 85,
  },
  paymentMethods: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    marginVertical: 20,
  },
  paymentMethodItem: {
    width: 80,
    height: 80,
    resizeMode: 'center',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: colorConstants.PRIMARY_GRAY,
  },
  imageContainerActive: {
    borderWidth: 2,
    borderColor: colorConstants.PRIMARY_BLUE,
  },
  fawry: {
    width: 90,
  },

});

