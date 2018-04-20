import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import Modal from 'react-native-modalbox';
import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import { connect } from 'react-redux';
import { 
  paginationGetPublications, 
  openAndCloseModal,
  setPublicationAndComments
 } from '../../redux/actions';
import { sanFranciscoWeights, iOSColors } from 'react-native-typography'
import InfiniteScroll from 'react-native-infinite-scroll'
import moment from 'moment';

class Contenido extends Component {
  constructor(props) {
    super(props)
  }

  componentWillReceiveProps = (nextState) => {

  }

  morePublications = async () => {
    this.props.paginationGetPublications(this.props.publications[this.props.publications.length - 1].id)
  }

  render() {
    return (
      <InfiniteScroll
        horizontal={false}
        onLoadMoreAsync={this.morePublications}
      >
        <FlatList
          style={{ paddingBottom: '20%' }}
          ListEmptyComponent={() => {
            return (
              <View style={styles.emptyContainer}>
                <Text style={styles.textEmpty}>
                  Aun nadie publica :(
            </Text>
              </View>
            )
          }}
          data={this.props.publications}
          keyExtractor={(item, index) => item.id}
          renderItem={(rowData) => {
            return (
              <TouchableOpacity style={styles.ComponentToucheables} onPress={() => {
                this.props.openAndCloseModal(true)
                this.props.setPublicationAndComments(rowData.item)
              }}>
                <View style={styles.viewContainerCard}>
                  <View style={styles.viewContainerP}>
                    <View style={styles.viewContainerImage}>
                      <View style={styles.viewImage}>
                        <Image style={styles.imageProfile} resizeMode={'cover'} source={{ uri: rowData.item.images.length > 0 ? rowData.item.images[0].url : 'https://picsum.photos/200/300/?random' }} />
                      </View>
                    </View>
                    <View style={styles.viewContainerText}>
                      <Text
                        style={[sanFranciscoWeights.bold, styles.textTitleCard]}>
                        {rowData.item.name}
                      </Text>
                      <Text
                        style={[sanFranciscoWeights.regular, styles.textInformation]}>
                        {rowData.item.information.length > 170
                          ? `${rowData.item.information.substr(0, 170)}...`
                          : rowData.item.information}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.footerOfCard}>
                    <View style={styles.itemsOfBottomCard}>
                      <Ionicons name="ios-heart-outline" size={18} color="gray" style={{ marginRight: '2%' }} />
                      <Text style={[sanFranciscoWeights.regular, styles.textInformation]}>
                        {rowData.item.likes.length}
                      </Text>
                    </View>
                    <View style={styles.itemsOfBottomCard}>
                      <Ionicons name="ios-text" size={20} color="gray" style={{ marginRight: '2%' }} />
                      <Text style={[sanFranciscoWeights.regular, styles.textInformation]}>
                        {rowData.item.comments.length}
                      </Text>
                    </View>
                    <View style={styles.itemsOfBottomCard}>
                      <Ionicons name="ios-calendar-outline" size={18} color="gray" style={{ marginRight: '2%' }} />
                      <Text style={[sanFranciscoWeights.regular, styles.timeOfPublication]}>
                        {moment(rowData.item.date).fromNow()}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )
          }} />
      </InfiniteScroll>
    )
  }
}

const mapStateToProps= ({publications}) => {
  return {
    publications
  }
}

const mapDispatchToProps = {
  paginationGetPublications,
  openAndCloseModal,
  setPublicationAndComments
}

const styles = StyleSheet.create({
  ComponentToucheables: {
    height: 180,
    marginTop: 30,
    paddingTop: 20,
    paddingBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 12,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { height: 7, width: 0 },
  },
  emptyContainer: {
    width: '100%',
    flex: 1,
    paddingTop: '75%',
    padding: '15%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textEmpty: {
    fontSize: 20,
    fontWeight: '700',
  },
  viewContainerCard: {
    paddingLeft: '5%',
    paddingRight: '5%',
    flex: 1,
    justifyContent: 'space-around'
  },
  viewContainerP: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  viewContainerImage: {
    width: '25%',
    height: '100%',
    // flexDirection: 'column',
    // justifyContent: 'flex-start',
    // alignItems: 'center'
  },
  viewImage: {
    width: '90%',
    height: '70%',
    paddingTop: '10%',
    borderRadius: 3,
    overflow: 'hidden'
  },
  imageProfile: {
    width: '100%',
    height: '100%',
    borderRadius: 3
  },
  viewContainerText: {
    width: '75%'
  },
  textTitleCard: {
    fontSize: 19,
    color: iOSColors.black,
    textAlign: 'left'
  },
  textInformation: {
    paddingTop: 5,
    fontSize: 16,
    color: iOSColors.gray,
    textAlign: 'left',
    lineHeight: 14,
  },
  footerOfCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: '3%',
    borderTopColor: '#e2e2e2',
    borderTopWidth: 1,
  },
  itemsOfBottomCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  timeOfPublication: {
    fontSize: 16,
    color: iOSColors.gray
  },
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(Contenido)