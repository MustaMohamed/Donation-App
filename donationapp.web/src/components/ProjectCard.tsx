import React, { Component } from 'react';
import { Button, Card, Icon, Image, Progress, Statistic } from 'semantic-ui-react';
import { Project } from '../types';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { TranslationConstants } from '../constants';
import { hideUiLoaderAction, showUiLoaderAction } from '../redux-store/actions';
import { connect } from 'react-redux';

interface Props {
  project: Project;
  showUiLoader: typeof showUiLoaderAction;
  hideUiLoader: typeof hideUiLoaderAction;
}

class ProjectCard extends Component<Props> {
  render() {
    return (
      <Card>
        <Image src='https://placekitten.com/640/360' wrapped ui={false}/>
        <Card.Content>
          <Card.Header>{this.props.project.name}</Card.Header>
          <Card.Meta>
            <span className='date'>{this.props.project.country}</span>
            <Progress size='tiny'
                      className={'my-2'}
                      percent={Math.min(this.props.project.collectedDonation / this.props.project.cost * 100, 100)}
                      success={this.props.project.isCostCollectedDone}
                      warning={!this.props.project.isCostCollectedDone}/>
          </Card.Meta>
          <Card.Description>
            {this.props.project.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Statistic horizontal size={'small'}>
            <Statistic.Value><Icon name='dollar sign'/><FormattedNumber value={this.props.project.cost}/></Statistic.Value>
          </Statistic>
          <Button basic color='blue' floated={'right'} onClick={() => {
            this.props.showUiLoader();
            setTimeout(() => this.props.hideUiLoader(), 3000);

          }}>
            <FormattedMessage id={TranslationConstants.CardViewMore}/>
          </Button>
        </Card.Content>
      </Card>
    );
  }
}

export default connect(null, {
  showUiLoader: showUiLoaderAction,
  hideUiLoader: hideUiLoaderAction,
})(ProjectCard);