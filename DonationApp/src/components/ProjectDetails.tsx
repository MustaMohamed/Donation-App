/**
 * created by musta at 10/3/2019
 */

import React, { Fragment, PureComponent } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { colorConstants, translationConstants } from '../constants';
import { FormattedMessage, FormattedNumber, injectIntl, IntlShape } from 'react-intl';
import { NavigationStackProp } from 'react-navigation-stack';
import { NavigationParams, NavigationState } from 'react-navigation';
import { Project } from '../types';
import { Progress } from './ProgressBar';
import AppText from './AppText';


interface Props {
  navigation?: NavigationStackProp<NavigationState, NavigationParams>;
  intl?: IntlShape;
  project: Project
}


class ProjectDetails extends PureComponent<Props> {
  render() {
    return (
      <Fragment>
        {this.props.project.cost &&
        <View style={{ marginHorizontal: 10, flex: 1, flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
          <AppText style={styles.fundText}><FormattedMessage id={translationConstants.COLLECTED_DONATION}/></AppText>
          <AppText bold style={styles.collectedDonationText}>$ <FormattedNumber value={this.props.project.collectedDonation}/></AppText>
          <Progress isRTL
                    style={styles.progress}
                    color={colorConstants.PRIMARY_BLUE}
                    lineWidth={12}
                    percent={Math.min(this.props.project.collectedDonation / this.props.project.cost * 100, 100)}
                    showInfo={false}
                    type={'line'}/>
        </View>}
        <ListItem
          title={<AppText bold text={this.props.intl.formatMessage({ id: translationConstants.COUNTRY })}/>}
          titleStyle={[styles.text, styles.listItemTitle]}
          titleProps={{ style: [styles.text, styles.listItemTitle] }}
          subtitleStyle={styles.text}
          containerStyle={styles.listItemStyle}
          rightSubtitle={this.props.project.country || 'Egypt'}
          rightSubtitleStyle={styles.text}
          bottomDivider
        />
        <ListItem
          title={<AppText bold text={this.props.intl.formatMessage({ id: translationConstants.VILLAGE })}/>}
          titleStyle={[styles.text, styles.listItemTitle]}
          titleProps={{ style: [styles.text, styles.listItemTitle] }}
          containerStyle={styles.listItemStyle}
          rightSubtitle={this.props.project.village.name || 'Egypt'}
          rightSubtitleStyle={styles.text}
          subtitleStyle={styles.text}
          bottomDivider
        />
        <ListItem
          title={<AppText bold text={this.props.intl.formatMessage({ id: translationConstants.DESCRIPTION })}/>}
          titleStyle={[styles.text, styles.listItemTitle]}
          titleProps={{ style: [styles.text, styles.listItemTitle] }}
          containerStyle={styles.listItemStyle}
          subtitle={this.props.project.description}
          subtitleStyle={styles.text}
          bottomDivider
        />
        <ListItem
          title={<AppText bold text={this.props.intl.formatMessage({ id: translationConstants.REASON })}/>}
          titleStyle={[styles.text, styles.listItemTitle]}
          titleProps={{ style: [styles.text, styles.listItemTitle] }}
          containerStyle={styles.listItemStyle}
          subtitle={this.props.project.cause}
          subtitleStyle={styles.text}
          bottomDivider
        />
        {this.props.project.isCostCollectedDone && < ListItem
          title={<AppText bold text={this.props.intl.formatMessage({ id: translationConstants.EXECUTION_DURATION })}/>}
          titleStyle={[styles.text, styles.listItemTitle]}
          titleProps={{ style: [styles.text, styles.listItemTitle] }}
          containerStyle={styles.listItemStyle}
          rightSubtitle={this.props.project.executionDuration}
          rightSubtitleStyle={styles.text}
          subtitleStyle={styles.text}
          bottomDivider
        />}
        {this.props.project.isExecutionDone && this.props.project.result && <ListItem
          title={<AppText bold text={this.props.intl.formatMessage({ id: translationConstants.RESULT })}/>}
          titleStyle={[styles.text, styles.listItemTitle]}
          titleProps={{ style: [styles.text, styles.listItemTitle] }}
          containerStyle={styles.listItemStyle}
          subtitle={this.props.project.result}
          subtitleStyle={styles.text}
          bottomDivider
        />}
        {this.props.project.isCostCollectedDone && <ListItem
          title={<AppText bold text={this.props.intl.formatMessage({ id: translationConstants.START_AT })}/>}
          titleStyle={[styles.text, styles.listItemTitle]}
          titleProps={{ style: [styles.text, styles.listItemTitle] }}
          containerStyle={styles.listItemStyle}
          rightSubtitle={this.props.intl.formatDate(this.props.project.startAt ? this.props.project.startAt : new Date(), {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          })}
          rightSubtitleStyle={styles.text}
          subtitleStyle={styles.text}
          bottomDivider
        />}
        {this.props.project.isCostCollectedDone && <ListItem
          title={<AppText bold text={this.props.intl.formatMessage({ id: translationConstants.EXPECTED_END_AT })}/>}
          titleStyle={[styles.text, styles.listItemTitle]}
          titleProps={{ style: [styles.text, styles.listItemTitle] }}
          containerStyle={styles.listItemStyle}
          rightSubtitle={this.props.intl.formatDate(this.props.project.expectedEndAt ? this.props.project.expectedEndAt : new Date(), {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          })}
          rightSubtitleStyle={styles.text}
          subtitleStyle={styles.text}
          bottomDivider
        />}
        {this.props.project.isExecutionDone && <ListItem
          title={<AppText bold text={this.props.intl.formatMessage({ id: translationConstants.END_AT })}/>}
          titleStyle={[styles.text, styles.listItemTitle]}
          titleProps={{ style: [styles.text, styles.listItemTitle] }}
          containerStyle={styles.listItemStyle}
          rightSubtitle={this.props.intl.formatDate(this.props.project.endAt ? this.props.project.endAt : new Date(), {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          })}
          rightSubtitleStyle={styles.text}
          subtitleStyle={styles.text}
          bottomDivider
        />}
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  listItemStyle: {
    // backgroundColor: colorConstants.PRIMARY_WHITE,
  },
  image: {
    height: Dimensions.get('window').height / 3,
    borderRadius: 10,
  },
  actionsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  actionBtn: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: colorConstants.PRIMARY_BLUE,
    borderRadius: 20,
  },
  donateBtn: {
    backgroundColor: colorConstants.PRIMARY_BLUE,
    borderRadius: 20,
  },
  donateView: {
    paddingVertical: 10,
    padding: 10,
  },
  actionBtnText: {
    fontSize: 14,
    color: colorConstants.PRIMARY_WHITE,
  },
  text: {
    textAlign: 'left',
    fontFamily: 'Tajawal-Regular',
  },
  listItemTitle: {
    fontSize: 16,
    color: colorConstants.PRIMARY_BLACK,
  },
  progress: {
    marginVertical: 10,
    width: '50%',
  },
  fundText: {
    fontSize: 12,
    color: colorConstants.PRIMARY_GRAY,
    textAlign: 'center',
  },
  collectedDonationText: {
    fontSize: 28,
    color: colorConstants.PRIMARY_BLACK,
    textAlign: 'center',
  },
  costText: {
    textAlign: 'right',
    marginBottom: 10,
  },
});

export default injectIntl(ProjectDetails);
