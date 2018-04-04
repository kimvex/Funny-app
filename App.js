/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ListView,
  FlatList,
  Image,
  TextInput,
  AsyncStorage,
  ScrollView
} from 'react-native';
import axios from 'axios';
import InfiniteScroll from 'react-native-infinite-scroll'
import { webWeights, sanFranciscoWeights, iOSColors } from 'react-native-typography'
import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import moment from 'moment'
import 'moment/locale/es';
import Modal from 'react-native-modalbox';
import Tabbar from 'react-native-tabbar-bottom'
import uuid from 'uuid'

import { es } from './src/helpers/momentLanguaje'

moment.locale('es')

export class WritePost extends Component {
  render() {
    return (
      <View>
        <Text>
          Configurations :)
        </Text>
      </View>
    )
  }
}

export class VeiwPublication extends Component {
  state = {
    publication: [],
    likes: [],
    isOpen: false,
    message: '',
    images: [1,2,3,4,5,6,6]
  }

  componentWillMount = () => {
    this.setState({
      publication: this.props.publication.comments,
      likes: this.props.publication.likes
    })
  }

  carousel = () => {
    console.log(this.props.publication.images.length)
    if(this.props.publication.images.length > 0){
      return (
       <FlatList
        style={{
        }}
        horizontal={true}
        keyExtractor={(item, index) => uuid.v4()}
        data={this.props.publication.images}
        renderItem={(rowData) => {
          return <Image key={uuid.v4()} source={{ url: rowData.item.url }} style={{ width: 100, height: 100, margin: 10 }}/>
        }}/>
      )
    }
  }

  render() {
    return (
      <View style={styles.ContentPublication}>
        <TouchableOpacity
          onPress={() => this.props.estado.setState({ isOpen: false })}
          style={styles.positionClosePublication}>
          <Ionicons name="ios-close" size={60} color="#493FE9" />
        </TouchableOpacity>
        <InfiniteScroll
          style={styles.InfiniteScrollComments}
          horizontal={false}
        >
          <FlatList
            ListHeaderComponent={() => {
              return <View style={styles.ContainerPublicationViewCard}>
                  <Text style={[sanFranciscoWeights.bold, styles.titleCardPublication]}>{this.props.publication.name}</Text>
                  <Text style={[sanFranciscoWeights.regular, styles.contentInformationPublication]}>{this.props.publication.information}</Text>
                  {
                    this.carousel()
                  }
                  <View style={styles.optionsOfPublication}>
                    <TouchableOpacity style={styles.toucheable} onPress={() => {
                      console.log(this.props.publication)
                      const exist = this.state.likes.find(x => x.funnyId === this.props.publication.funnyId)
                      console.log(exist)
                      if (!exist) {
                        axios({
                          url: `http://localhost:3000/api/Likes`,
                          method: 'post',
                          data: {
                            publicationId: this.props.publication.id
                          },
                          headers: {
                            Authorization: 'SllNaPeEZHyS4G03ZReteAf1U45qd46ekCqWBGs7KCiwWc8pKahzBWJH61FP8OnH'
                          }
                        }).then(r => {
                          this.state.likes.push(r.data)
                          this.setState({ likes: this.state.likes })
                        })
                      } else {
                        axios({
                          url: `http://localhost:3000/api/Likes/${exist.id}`,
                          method: 'delete',
                          headers: {
                            Authorization: 'SllNaPeEZHyS4G03ZReteAf1U45qd46ekCqWBGs7KCiwWc8pKahzBWJH61FP8OnH'
                          }
                        }).then(r => {
                          const index = this.state.likes.indexOf(exist)
                          const newLikes = [].concat(this.state.likes)
                          console.log(newLikes.splice(index, 1))
                          this.setState({ likes: newLikes })
                        })
                      }
                    }}>
                      <Ionicons name="ios-heart-outline" size={30} color={"#493FE9"} style={{ marginRight: '4%' }} />
                      <Text style={[sanFranciscoWeights.thin, styles.TextOptions]}>
                        {this.state.likes.length}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.toucheable} onPress={() => this.setState({ isOpen: true })}>
                      <Ionicons name="ios-text-outline" size={30} color={"#493FE9"} style={{ marginRight: '4%' }} />
                      <Text style={[sanFranciscoWeights.thin, styles.TextOptions]}>
                        {this.props.publication.comments.length}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={[sanFranciscoWeights.semibold, styles.separationsOptions]}>Comentarios</Text>
                </View>
            }}
            ListEmptyComponent={() => {
              return (
                <View>
                  <Text style={[sanFranciscoWeights.regular, styles.separationsOptions]}>
                    Aun nadie comenta :(
                  </Text>
                </View>
              )
            }}
            data={this.state.publication}
            keyExtractor={(item, index) => item.id}
            renderItem={(rowData) => {
              return (
                <View style={styles.contentComment}>
                  <View style={styles.profileData}>
                    <Image style={styles.imageProfile} resizeMode={'cover'} source={{ uri: rowData.item.funny.imageProfile.url}}/>
                    <TouchableOpacity>
                      <Text style={[sanFranciscoWeights.bold]}>{rowData.item.funny.name}</Text>
                      <Text style={[sanFranciscoWeights.regular]}>{rowData.item.comment}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )
            }}

            ListFooterComponent={() => {
              return (
                <View style={{ marginBottom: 100, }}>
                </View>
              )
            }}
            />
          </InfiniteScroll>
        <Modal 
          style={styles.styleOfModal}
          isOpen={this.state.isOpen}
          position={"bottom"}
          backdropColor={null}
          onClosed={() => this.setState({ isOpen: false })}>
            <TextInput
              multiline={true}
              value={this.state.message}
              onChangeText={value => this.setState({ message: value })}
              style={[sanFranciscoWeights.regular, styles.textInputForComment]}/>
          <Ionicons 
            name="md-send" 
            size={45} 
            style={{ marginRight: '2%', color: '#493FE9' }} 
            onPress={() => {
              if (this.state.message.trim() !== '') {
                axios({
                  url: `http://localhost:3000/api/Comments`,
                  method: 'post',
                  data: {
                    comment: this.state.message,
                    publicationId: this.props.publication.id
                  },
                  headers: {
                    Authorization: 'SllNaPeEZHyS4G03ZReteAf1U45qd46ekCqWBGs7KCiwWc8pKahzBWJH61FP8OnH'
                  }
                }).then(r => {
                  this.setState({
                    message: ''
                  })
                  axios({
                    url: `http://localhost:3000/api/Publications/${this.props.publication.id}/comments`,
                    method: 'get',
                    params: {
                      filter: {
                        include: {
                          relation: 'funny',
                          scope: {
                            include: {
                              relation: 'imageProfile'
                            }
                          },
                        },
                        order: 'id DESC',
                        limit: 15
                      }
                    },
                    headers: {
                      Authorization: 'SllNaPeEZHyS4G03ZReteAf1U45qd46ekCqWBGs7KCiwWc8pKahzBWJH61FP8OnH'
                    }
                  }).then(result => {
                    console.log(result)
                    this.setState({ publication: result.data })
                  })
                })
              }
            }}
            />            
        </Modal>
      </View>
    )
  }
}

export class Contenido extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      dataSource: this.props.publications,
      publication: {}
    }
  }

  componentWillReceiveProps = (nextState) => {
    this.setState({
      dataSource: nextState.publications
    })
  }

  morePublications = async () => {
   const newPublications = await axios({
      url: 'http://localhost:3000/api/Publications',
      method: 'get',
      params: {
        filter: {
          include: ['likes', {
            relation: 'comments',
            scope: {
              include: {
                relation: 'funny',
                scope: {
                  include: {
                    relation: 'imageProfile'
                  }
                }
              },
              order: 'id DESC',
              limit: 15
            }
          }, 'images'],
          where: {
            id: this.state.dataSource[this.state.dataSource.length - 1].id
          },
          order: 'id DESC',
          limit: 30
        }
      }
    }).then(publications => publications.data)

    let principalList = this.state.dataSource.concat(newPublications)
    if (this.state.dataSource[this.state.dataSource.length - 1].id !== newPublications[newPublications.length - 1].id) {
      this.setState({
        dataSource: principalList
      })
    }
  }

  render() {
    return (
      <InfiniteScroll
        horizontal={false}
        onLoadMoreAsync={this.morePublications}
        >
        <FlatList
          ListEmptyComponent={() => {
          return(
          <View style={styles.emptyContainer}>
            <Text style={styles.textEmpty}>
              Aun nadie publica :(
            </Text>
          </View>
          )
        }}
          data={this.state.dataSource}
          keyExtractor={(item, index) => item.id}
          renderItem={(rowData) => {
            console.log(rowData.item.information.length)
          return (
            <TouchableOpacity style={styles.ComponentToucheables} onPress={() => {
              this.props.estado.setState({ isOpen: true, publication: rowData.item})
              }}>
              <View style={styles.viewContainerCard}>
                <View style={styles.viewContainerP}>
                  <View style={styles.viewContainerImage}>
                    <View style={styles.viewImage}>
                      <Image style={styles.imageProfile} resizeMode={'cover'} source={{ uri: rowData.item.images.length > 0 ? rowData.item.images[0].url : 'https://picsum.photos/200/300/?random'}}/>
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
                        : rowData.item.information }
                </Text>
                </View>
                </View>
                <View style={styles.footerOfCard}>
                  <View style={styles.itemsOfBottomCard}>
                    <Ionicons name="ios-heart-outline" size={18} color="gray" style={{ marginRight: '2%' }}/>
                    <Text style={[sanFranciscoWeights.regular, styles.textInformation]}>
                      {rowData.item.likes.length}
                    </Text>
                  </View>
                  <View style={styles.itemsOfBottomCard}>
                    <Ionicons name="ios-text" size={20} color="gray" style={{ marginRight: '2%' }}/>
                    <Text style={[sanFranciscoWeights.regular, styles.textInformation]}>
                      {rowData.item.comments.length}
                    </Text>
                  </View>
                  <View style={styles.itemsOfBottomCard}>
                    <Ionicons name="ios-calendar-outline" size={18} color="gray" style={{ marginRight: '2%' }}/>
                    <Text style={[sanFranciscoWeights.regular, styles.timeOfPublication]}>
                      {moment(rowData.item.date).fromNow()}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )
        }}/>
      </InfiniteScroll>
    )
  }
}

export class PublicationsView extends Component {
  state = {
    publications: [],
    publication: {},
    isOpen: false,
    swipeToClose: false,
  }

  componentDidMount() {
    axios({
      url: 'http://localhost:3000/api/Publications',
      method: 'get',
      params: {
        filter: {
          include: ['likes', {
            relation: 'comments',
            scope: {
              include: {
                relation: 'funny',
                scope: {
                  include: {
                    relation: 'imageProfile'
                  }
                }
              },
              order: 'id DESC',
              limit: 15
            }
          }, 'images'],
          order: 'id DESC',
          limit: 30
        }
      }
    })
      .then(result => {
        this.setState({ publications: result.data })
      })
      .catch(err => {
        return console.log(err)
      })
  }

  render () {
    return (
      <View style = { styles.ContainerInformation } >
        <Contenido publications={this.state.publications} estado={this} />
        <Modal
          isOpen={this.state.isOpen}
          style={styles.ContentPublication}
          swipeToClose={this.state.swipeToClose}>
          <VeiwPublication estado={this} publication={this.state.publication}/>
        </Modal>
      </View>
    )
  }
}

export default class App extends Component {
  state = {
    page: "HomeScreen",
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.page === 'HomeScreen' && <PublicationsView/>}
        <Tabbar
          tabbarBgColor="#fcfeff"
          selectedIconColor="#493FE9"
          labelSize={18}
          stateFunc={(tab) => {
            this.setState({ page: tab.page })
            //this.props.navigation.setParams({tabTitle: tab.title})
          }}
          activePage={this.state.page}
          tabs={[
            {
              page: "HomeScreen",
              icon: "home",
            },
            {
              page: "Write",
              icon: "ios-create-outline",
            },
            {
              page: "ProfileScreen",
              icon: "person",
            },
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    backgroundColor: iOSColors.customGray,
  },
  ContainerInformation: {
    flex: 9,
    position:'relative'
  },
  NavBar: {
    flex: 1,
    backgroundColor: '#fcfeff',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { height: 0, width: 0 },
  },
  ItemOfNavBar: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  BarSelected: {
    borderTopWidth: 3,
    borderTopColor: '#493FE9'
  },
  TextItemsNavBar: {
    fontWeight: 'bold',
    color: '#493FE9'
  },
  // Diseño para la lista,
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
  viewContainerP:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  viewContainerImage:{
    width: '25%',
    height: '100%',
    // flexDirection: 'column',
    // justifyContent: 'flex-start',
    // alignItems: 'center'
  },
  viewImage:{
    width: '90%',
    height: '70%',
    paddingTop: '10%',
    borderRadius: 3,
    overflow: 'hidden'
  },
  imageProfile:{
    width: '100%',
    height: '100%',
    borderRadius: 3
  },
  viewContainerText:{
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
  // Content publication
  ContentPublication: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.97)',
  },
  positionClosePublication: {
    paddingRight: '5%',
    alignItems: 'flex-end',
    flex: 0
  },
  ContainerPublicationViewCard: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: '5%'
  },
  titleCardPublication: {
    textAlign: 'center',
    fontSize: 25,
  },
  contentInformationPublication: {
    textAlign: 'justify',
    fontSize: 18,
    paddingTop: '7%',
    paddingLeft: '7%',
    paddingRight: '7%',
  },
  optionsOfPublication: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center'
  },
  toucheable: {
    width: '25%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    paddingTop: '3%'
  },
  TextOptions: {
    fontSize: 25,
    color: '#493FE9'
  },
  InfiniteScrollComments: {
    flex: 3
  },
  separationsOptions: { 
    textAlign: 'center', 
    paddingBottom: '3%' 
  },
  contentComment: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '5%',
    borderBottomColor: '#e2e2e2',
    borderBottomWidth: 1.5,
  },
  profileData: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center'
  },
  imageProfile: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  styleOfModal: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    height: 110,
    marginRight: 5,
  },
  textInputForComment: {
    width: '82%',
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 12,
    height: 45,
    paddingTop: 15,
    paddingLeft: 15,
    borderBottomColor: '#493FE9',
    borderBottomWidth: 1,
    borderLeftColor: '#493FE9',
    borderLeftWidth: 1,
    borderRightColor: '#493FE9',
    borderRightWidth: 1,
    borderTopColor: '#493FE9',
    borderTopWidth: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  }
});
