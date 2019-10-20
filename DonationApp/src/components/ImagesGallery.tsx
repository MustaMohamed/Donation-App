/**
 * created by musta at 10/20/2019
 */

import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import ImageLayout from 'react-native-image-layout';

interface Image {
  uri: string;
  thumbnail: string;
  id: number;
  title?: string;
  description?: string;
}

interface Props {
  images: Image[],
  gallerySectionTitle: string;
  renderPageHeader: Function;
  renderPageFooter: Function;
}

interface State {
  isOpen: boolean;
  selectedImageIndex: number;
}

class ImagesGallery extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selectedImageIndex: 0,
    };
  }

  toggleCollapse = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  };

  onSelectImageIndex = (index: number) => {
    this.setState({ selectedImageIndex: index });
  };

  render() {
    const imageURLs = this.props.images.map(
      (img: Image, index: number) => ({
        uri: img.uri,
        /*thumbnail: img.thumbnail,
        id: String(img.id),
        title: img.title,
        description: img.description,*/
      }),
    );
    return (
      <List.Accordion onPress={this.toggleCollapse} title={this.props.gallerySectionTitle} expanded={this.state.isOpen}>
        <ImageLayout images={imageURLs}
                     renderPageHeader={this.props.renderPageHeader}
                     renderPageFooter={this.props.renderPageFooter}
        />
      </List.Accordion>
    );
  }
}

const styles = StyleSheet.create({});

export default ImagesGallery;
