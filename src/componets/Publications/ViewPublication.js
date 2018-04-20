import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import InfiniteScroll from 'react-native-infinite-scroll'
import { sanFranciscoWeights, iOSColors } from 'react-native-typography'
import Modal from 'react-native-modalbox';
import uuid from 'uuid';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button } from 'react-native-elements';

import { 
  openAndCloseModal, 
  setLike, 
  deleteLike, 
  setComment, 
  getComments,
  getPublication,
  changePage
} from '../../redux/actions';

export class VeiwPublication extends Component {
  state = {
    publication: [],
    likes: [],
    isOpen: false,
    message: '',
    images: [1,2,3,4,5,6,6]
  }

  componentWillMount = () => {
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
          const url = `${rowData.item.url.split('/upload/')[0]}/upload/q_70/${rowData.item.url.split('/upload/')[1]}`
          return <Image key={uuid.v4()} source={{ uri: url }} style={{ width: 100, height: 100, margin: 10 }}/>
        }}/>
      )
    }
  }

  render() {
    return (
      <View style={styles.ContentPublication}>
        <TouchableOpacity
          onPress={() => {
            this.props.getPublication()
            this.props.openAndCloseModal(false)
          }}
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
                      if (this.props.token) {
                        const exist = this.props.likes.find(x => x.funnyId === this.props.userId)
                        if (!exist) {
                          this.props.setLike(this.props.publication.id, this.props.token)
                        } else {
                          console.log('eliminando')
                          axios({
                            url: `https://funny.kimvex.com/api/Likes/${exist.id}`,
                            method: 'delete',
                            headers: {
                              Authorization: this.props.token
                            }
                          }).then(r => {
                            this.props.deleteLike(exist)
                          })
                        }
                      }
                    }}>
                      <Ionicons name="ios-heart-outline" size={30} color={"#493FE9"} style={{ marginRight: '4%' }} />
                      <Text style={[sanFranciscoWeights.thin, styles.TextOptions]}>
                        {this.props.likes.length}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.toucheable} onPress={() => this.setState({ isOpen: true })}>
                      <Ionicons name="ios-text-outline" size={30} color={"#493FE9"} style={{ marginRight: '4%' }} />
                      <Text style={[sanFranciscoWeights.thin, styles.TextOptions]}>
                        {this.props.comments.length}
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
            data={this.props.comments}
            keyExtractor={(item, index) => item.id}
            renderItem={(rowData) => {
              const url = `${rowData.item.funny.imageProfile.url.split('/upload/')[0]}/upload/c_thumb,g_face,h_200,w_200/${rowData.item.funny.imageProfile.url.split('/upload/')[1]}`;
              console.log(url)
              return (
                <View style={styles.contentComment}>
                  <View style={styles.profileData}>
                    <Image style={styles.imageProfile} resizeMode={'cover'} source={{ uri: url}}/>
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
          {
            this.props.token 
              ? <View style={styles.styleOfModal}>
                <TextInput
                  multiline={true}
                  ref='textMessage'
                  underlineColorAndroid="transparent"
                  value={this.state.message}
                  onChangeText={value => this.setState({ message: value })}
                  style={[sanFranciscoWeights.regular, styles.textInputForComment]} />
                <Ionicons
                  name="md-send"
                  size={45}
                  style={{ marginRight: '2%', color: '#493FE9' }}
                  onPress={() => {
                    if (this.refs.textMessage.props.value.trim() !== '') {
                      this.refs.textMessage.clear()
                      this.props.setComment(this.refs.textMessage.props.value, this.props.publication.id, this.props.token)
                      this.props.getComments(this.props.publication.id, this.props.token)
                    }
                  }}
                />
              </View>
              : <View style={styles.styleOfModal}>
                <Button
                  buttonStyle={{ width: '100%' }}
                  title="Iniciar session"
                  backgroundColor="#493FE9"
                  onPress={() => this.props.changePage('ProfileScreen')}
                  /> 
                </View>
          }
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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

const mapStateToProps = ({ publication, comments, likes, token, userId }) => {
  return {
    publication,
    comments,
    likes,
    token,
    userId
  }
}

const mapDispatchToProps = {
  openAndCloseModal,
  setLike,
  deleteLike,
  setComment,
  getComments,
  getPublication,
  changePage
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(VeiwPublication)

