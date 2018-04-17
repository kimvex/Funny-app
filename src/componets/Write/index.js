import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { sanFranciscoWeights, iOSColors } from 'react-native-typography'
import ImagePicker from 'react-native-image-picker'
import RNFetchBlob from 'react-native-fetch-blob'
import uuid from 'uuid'
import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import Axios from 'axios';
import { Icon } from 'react-native-elements';

import { pubicate, changeStateOfPublication } from '../../redux/actions'

class Write extends Component {
  state = {
    imagenes: [],
    carrousel: [],
    adding: true,
    text: 'Agregando imagen'
  }

  componentWillMount = () => {
    this.title = {
      value: ''
    };
    this.publication = {
      value: ''
    };
  }

  upload = (data) => {
    return RNFetchBlob.fetch('POST', 'http://funny.kimvex.com/api/uploadImages/upload', {
      Authorization: this.props.token,
      otherHeader: "foo",
      'Content-Type': 'multipart/form-data',
    }, data).then(e => {
      console.log(e)
      return e
    })
  }

  pick = (cb) => {
    let options = {
      title: 'Selecciona la imagen',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
        cb(source, response.data, response);
      }
    });
  }
  
  sendAPublication = () => {
    if (this.title.value && this.publication.value) {
      const title = this.title.value;
      const publicacion = this.publication.value;
  
      if (title.trim() !== '' && publicacion.trim() !== '') {
        this.props.pubicate(
          this.title.value,
          '5abf3c731532611ce70036cb',
          this.publication.value,
          'Global',
          this.state.imagenes,
          this.props.token
        )
      }
    }
  }

  changeState = () => {
    setTimeout(() => {
      this.props.changeStateOfPublication()
      this.title.clear()
      this.publication.clear()
      this.setState({
        imagenes: [],
        carrousel: [],
      })
    }, 1000);
  }

  render() {
    this.props.stateOfPublication ? this.changeState() : ''
    return (
      <View style={styles.ContainerInformation}>
        <View style={styles.sectionPublicate}>
          <TextInput 
            placeholder="Titulo"
            allowFontScaling={false}
            underlineColorAndroid="transparent"
            ref={el => this.title = el}
            value={this.title.value}      
            onChangeText={text => this.title.value = text }
            placeholderStyle={sanFranciscoWeights.bold}
            style={styles.textTitlePublication}/>
          
          <TextInput
            multiline={true}
            underlineColorAndroid="transparent"
            ref={el => this.publication = el}
            value={this.publication.value}
            onChangeText={text => this.publication.value = text}            
            placeholder="Escribe tu publicacion"
            style={styles.textBoxPublication}/>
        </View>
        <Icon
          reverse
          name='ios-create-outline'
          type='ionicon'
          color={this.state.adding ? '#493FE9' : 'gray'}
          containerStyle={styles.positionBotton}
          onPress={() => {
            if (this.state.adding) {
              this.sendAPublication()
            }
          }}
        />
        <View style={styles.sectionUploadImages}>
          <TouchableOpacity 
            style={styles.addMoreImage}
            onPress={() => {
            this.pick((source, data, response) => {
              console.log(response, response.fileSize)
              if (response.fileSize < 2500000) {
                this.setState({
                  carrousel: this.state.carrousel,
                  adding: false
                })
                this.state.carrousel.push(source)
                this.upload([
                  { name: 'avatar', filename: 'avatar.png', folder: 'publications', data: data}
                ]).then(res => {
                  console.log(res)
                  this.state.imagenes.push(JSON.parse(res.data).result)
                  this.setState({
                    imagenes: this.state.imagenes,
                    adding: true
                  })
                })
                .catch(err => { 
                  this.setState({
                    text: 'Error al subir la imagen'
                  })

                  const index = this.state.carrousel.indexOf(source);
                  this.state.carrousel.splice(index, 1);

                  setTimeout(() => {
                    this.setState({
                      adding: true,
                      text: 'Agregando imagen',
                      source: this.state.source
                    })
                  }, 2000);
                  return
                 })
              } else {
                this.setState({
                  text: 'La imagen es muy pesada',
                  adding: false
                })
                setTimeout(() => {
                  this.setState({
                    adding: true,
                    text: 'Agregando imagen'
                  })
                }, 2000);
              }
            });
          }}>
            <Text>
              <Ionicons name="ios-add-outline" size={60} color="#493FE9" />
            </Text>
          </TouchableOpacity>
          <FlatList
            style={{
              height: '75%',
            }}
            inverted={this.state.carrousel.length > 0 ? true : false}
            horizontal={true}
            ListEmptyComponent={() => {
              return (
                <View style={styles.containerEmpty}>
                  <Text style={[sanFranciscoWeights.regular, styles.textEmptyImages]}>
                    
                  </Text>
                </View>
              )
            }}
            keyExtractor={(item, index) => uuid.v4()}
            data={this.state.carrousel}
            renderItem={(rowData) => {
              return <Image key={uuid.v4()} source={rowData.item} style={{ width: 100, height: 100, margin: 10 }} />
            }} />
            {
              this.state.adding 
              ? <View></View>
              : <View style={styles.containerBlockUploadImage}><Text style={[sanFranciscoWeights.bold, styles.textUpload]}>{this.state.text}</Text></View>
            }
        </View>
        {
          this.props.stateOfPublication  
          ?  <View style={styles.actionPublicated}>
              <Icon
                name='ios-checkmark-circle-outline'
                color='#493FE9'
                type="ionicon"
                size={70}
                />
              <Text style={[sanFranciscoWeights.bold, styles.textPublicationDone]}>
                Publicacion realizada
              </Text>
            </View> : <Text></Text>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ContainerInformation: {
    flex: 9,
    position: 'relative',
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  sectionPublicate: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'center'
  },
  textTitlePublication: {
    marginTop: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#493FE9',
    fontSize: 20,
    padding: 10,
    marginLeft: '5%',
    marginRight: '5%',
    width: '90%',
    fontWeight: '700',
    fontStyle: 'italic'
  },
  sectionUploadImages: {
    height: '27%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textBoxPublication: {
    marginTop: 10,
    paddingTop: 15,
    width: '100%',
    paddingLeft: '5%',
    paddingRight: '5%',
    height: '70%',
  },
  addMoreImage: {
    width: '30%',
    height: '75%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textEmptyImages: {
    
  },
  containerEmpty: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerBlockUploadImage: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    width: '100%',
    height: '75%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textUpload: {
    fontSize: 20
  },
  positionBotton: {
    position: 'absolute',
    zIndex: 1001,
    bottom: '20%',
    right: 30
  },
  actionPublicated: {
    width: '100%',
    height: '95%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    position: 'absolute',
    top: 0,
    zIndex: 1003,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textPublicationDone: {
    fontSize: 30
  }
})

const mapStateToProps = ({ stateOfPublication, token }) => {
  return {
    stateOfPublication,
    token
  }
}

const mapDispatchToProps = {
  pubicate,
  changeStateOfPublication
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Write)