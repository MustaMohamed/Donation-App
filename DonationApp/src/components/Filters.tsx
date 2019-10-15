/**
 * created by musta at 10/13/2019
 */

import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { colorConstants } from '../constants';
import ModalDropdown from 'react-native-modal-dropdown';
import { Icon } from 'react-native-elements';


interface Props {
  countriesData: { value: string; id: number; }[];
  costFilterData: {
    value: string;
    from: number;
    to: number;
    id: number;
  }[];
  onCountryValueChange: Function;
  onFilterRangeChange: Function;
  defaultRangeValue?: string;
  defaultCountryValue?: string;
}

interface State {

}

class Filters extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _onCountryMenuChange = (idx, value) => {
    this.props.onCountryValueChange(this.props.countriesData[idx]);
  };

  _onCostRangeMenuChange = (idx, value) => {
    this.props.onFilterRangeChange(this.props.costFilterData[idx]);
  };

  render() {
    return (
      <View>
        <View style={styles.filtersView}>
          <View style={styles.dropdownContainer}>
            <ModalDropdown options={this.props.countriesData.map(item => item.value)}
                           renderSeparator={() => {
                           }}
                           style={styles.dropdownInput}
                           dropdownStyle={[styles.dropdown, { height: Math.min(180, this.props.countriesData.length * 36) }]}
                           onSelect={this._onCountryMenuChange}
                           defaultValue={this.props.defaultCountryValue}
                           adjustFrame={(styles) => ({ ...styles, left: 5 })}
                           textStyle={styles.text}
                           dropdownTextStyle={styles.text}
            />
            <Icon name={'down'} type={'antdesign'} size={13}/>
          </View>
          <View style={styles.dropdownContainer}>
            <ModalDropdown options={this.props.costFilterData.map(item => item.value)}
                           renderSeparator={() => {
                           }}
                           style={styles.dropdownInput}
                           dropdownStyle={[styles.dropdown, { height: Math.min(180, this.props.costFilterData.length * 36) }]}
                           onSelect={this._onCostRangeMenuChange}
                           defaultValue={this.props.defaultRangeValue}
                           adjustFrame={(styles) => ({ ...styles, left: '50.5%' })}
                           textStyle={styles.text}
                           dropdownTextStyle={styles.text}
            />
            <Icon name={'down'} type={'antdesign'} size={13}/>
          </View>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  filtersView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 5,
  },
  text: {
    textAlign: 'left',
  },
  dropdownContainer: {
    backgroundColor: colorConstants.PRIMARY_WHITE,
    width: '49.5%',
    height: 40,
    borderRadius: 3,
    paddingVertical: 0,
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownInput: {
    width: '95%',
  },
  dropdown: {
    borderRadius: 5,
    width: '47%',
  },
});

export default Filters;
