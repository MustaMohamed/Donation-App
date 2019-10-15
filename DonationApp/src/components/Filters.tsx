/**
 * created by musta at 10/13/2019
 */

import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { colorConstants } from '../constants';
import ModalDropdown from 'react-native-modal-dropdown';
import { Icon } from 'react-native-elements';


interface Props {
  categoriesData: {
    value: string;
    id: number
  }[];
  costFilterData: {
    value: string;
    from: number;
    to: number;
    id: number;
  }[];
  onCategoryValueChange: Function;
  onFilterRangeChange: Function;
}

interface State {

}

class Filters extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _onCategoryMenuChange = (idx, value) => {
    this.props.onCategoryValueChange(this.props.categoriesData[idx]);
  };

  _onCostRangeMenuChange = (idx, value) => {
    this.props.onFilterRangeChange(this.props.costFilterData[idx]);
  };

  render() {
    return (
      <View>
        <View style={styles.filtersView}>
          <View style={styles.dropdownContainer}>
            <ModalDropdown options={this.props.categoriesData.map(item => item.value)}
                           renderSeparator={() => {
                           }}
                           style={styles.dropdownInput}
                           dropdownStyle={[styles.dropdown, { height: Math.min(180, this.props.categoriesData.length * 36) }]}
                           onSelect={this._onCategoryMenuChange}
                           defaultValue={'All Countries'}
                           adjustFrame={(styles) => ({ ...styles, left: 5 })}
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
                           defaultValue={'$100 - 500'}
                           adjustFrame={(styles) => ({ ...styles, left: '50.5%' })}
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
