import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Modal from 'react-native-modalbox';
import { connect } from 'react-redux';

import { getPublication } from '../../redux/actions'
import Contenido from './Contenido'
import VeiwPublication from './ViewPublication'

class PublicationsViewComponent extends Component {
  state = {
    publications: [],
    publication: {},
    isOpen: false,
    swipeToClose: false,
  }

  componentDidMount() {
    this.props.getPublication()
  }

  render() {
    return (
      <View style={styles.ContainerInformation} >
        <Contenido/>
        <Modal
          isOpen={this.props.isOpen}
          style={styles.ContentPublication}
          swipeToClose={false}>
          <VeiwPublication/>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  ContainerInformation: {
    flex: 9,
    position: 'relative'
  },
  ContentPublication: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.97)',
  },
})

const mapStateToProps = ({ isOpen, swipeToClose}) => {
  return {
    isOpen,
    swipeToClose
  }
}

const mapDispatchToProps = {
  getPublication
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(PublicationsViewComponent)