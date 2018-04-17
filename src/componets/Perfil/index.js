import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import { sanFranciscoWeights, iOSColors } from 'react-native-typography';
import { Button, Icon, Avatar } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import _ from 'lodash';

import { 
  changeVatarImage, 
  updateUrlImage, 
  changeDataProfile,
  getNewDataInformation,
  changePassword,
  cerrarSesion
} from '../../redux/actions';

class Perfil extends Component {
  state = {
    url: '',
    statusUrl: false,
    data: {},
    uploading: false,
    name: '',
    phone: '',
    email: '',
    password: '',
    password2: '',
    oldPassword: '',
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

  upload = () => {
    this.setState({ uploading: true })
    RNFetchBlob.fetch('POST', 'http://funny.kimvex.com/api/uploadImages/upload', {
      Authorization: this.props.token,
      otherHeader: "foo",
      'Content-Type': 'multipart/form-data',
    }, this.state.data).then(e => {
      this.setState({
        statusUrl: false,
        uploading: false
      })
      console.log(e)

      this.props.changeVatarImage(this.props.id_imagen_profile, JSON.parse(e.data).result.secure_url, this.props.token);
      setTimeout(() => {
        this.props.updateUrlImage(JSON.parse(e.data).result.secure_url)
      }, 1000);
      return e
    })
  }

  render() {
    return (
      <ScrollView style={styles.containerProfile}>
        <View style={styles.containerForImage}>
          <Avatar
            xlarge
            rounded
            title="Profile"
            source={{ 
              uri: this.state.statusUrl 
              ? this.state.url.uri 
              : this.props.avatar 
            }}
            onPress={() => {
              this.pick((source, data, response) => {
                if (response.fileSize < 2500000) {
                  this.setState({
                    url: source,
                    statusUrl: true,
                    data: [{ name: 'avatar', filename: 'avatar.png', folder: 'profile', data: data }]
                  })
                }
              })
            }}
            activeOpacity={0.7}
          />
          <Text style={[sanFranciscoWeights.bold, styles.nameOfProfile]}>
            {
              this.props.name
            }
          </Text>
        </View>
        <View style={styles.containerInformationOfUser}>
          <TextInput
            style={styles.inputForData}
            placeholder="Nombre"
            underlineColorAndroid="transparent"
            onChangeText={t => this.state.name = t }
            value={this.props.name}
            />
          <TextInput
            style={styles.inputForData}
            placeholder="Email"
            underlineColorAndroid="transparent"
            onChangeText={t => this.state.email = t}
            value={this.props.email}
            />
          <TextInput
            style={styles.inputForData}
            underlineColorAndroid="transparent"
            onChangeText={t => this.state.phone = t}            
            placeholder="Numero de telefono"
            keyboardType="numeric"
            value={this.props.phone.toString()}
            />
          <Button
            backgroundColor="#493FE9"
            title="Cambiar information"
            onPress={() => {
              console.log(this.state.name, '---' , this.props.name)
              if(
                (this.state.name !== this.props.name 
                  && this.state.name.trim() !== '') 
                ||
                (this.state.email !== this.props.email
                  && this.state.email.trim() !== '') 
                ||
                (this.state.phone !== this.props.phone
                 && this.state.phone.trim() !== '') 
                 && _.isInteger(Number(this.state.phone))
              ){
                if (this.state.name.trim() !== this.props.name
                  && this.state.name !== '' 
                ) {
                  data.name = this.state.name;
                }

                if (
                  this.state.email !== this.props.email
                  && this.state.email.trim() !== ''
                ) {
                  data.email = this.state.email;
                }

                if (
                  this.state.phone !== this.props.phone
                  && this.state.phone.trim() !== ''
                ) {
                  data.number = Number(this.state.phone)
                }

                this.props.changeDataProfile(this.props.userId, data, this.props.token)
                setTimeout(() => {
                  this.props.getNewDataInformation(this.props.userId, this.props.token)
                }, 1000);
              }
            }}/>
        </View>
        <View style={styles.sectionChangePassword}>
          <TextInput
            style={styles.inputForData}
            placeholder="Contraseña"
            underlineColorAndroid="transparent"
            value={this.state.password}
            onChangeText={ t => this.setState({ password: t })}
            secureTextEntry
          />
          <TextInput
            style={styles.inputForData}
            placeholder="Repetir contraseña"
            underlineColorAndroid="transparent"
            onChangeText={t => this.setState({ password2: t })}            
            value={this.state.password2}
            secureTextEntry
          />
          <TextInput
            style={styles.inputForData}
            onChangeText={t => this.setState({ oldPassword: t })}            
            placeholder="Contraseña actual"
            underlineColorAndroid="transparent"
            value={this.state.oldPassword}
            secureTextEntry
          />
        <Button
          backgroundColor="#493FE9"
          title="Cambiar contraseña"
          onPress={() => {
            if (this.state.password === this.state.password2 && !_.isEmpty(this.state.password) && !_.isEmpty(this.state.password2)) {
              console.log('si dio click')
              this.props.changePassword(this.state.oldPassword, this.state.password, this.props.token);
              this.setState({
                password: '',
                password2: '',
                oldPassword: ''
              });
            } else {
              Alert.alert('Las contraseñas son no coinciden')
            }
          }}/>
        </View>
        <View style={styles.cerrarSecion}>
          <Button
            backgroundColor="#493FE9"
            onPress={() => {
              this.props.cerrarSesion()
            }}
            title="CERRAR SESION" />
        </View>
        {
          this.state.statusUrl
          ? <View style={styles.containerForAcceptOCancelImage}>
            <Button
              backgroundColor="#493FE9"
              title="Aceptar"
              onPress={this.upload}/>
            <Button
              backgroundColor="orange"
              title="Cancelar"
                onPress={() => this.setState({ statusUrl: false })}
              />
          </View>
          : <Text></Text>
        }

        {
          this.state.uploading
          ? <View style={styles.containerForAwait}>
            <Text style={[sanFranciscoWeights.bold, styles.textAwait]}>Subiendo imagen</Text>
          </View>
          : <Text></Text>
        }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  containerProfile: {
    width: '100%',
    height: '93%',
  },
  containerForImage: {
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    marginTop: 30
  },
  nameOfProfile: {
    fontSize: 20,
    marginTop: 20
  },
  containerInformationOfUser: {
    width: '100%',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 10,
    marginTop: 30
  },
  inputForData: {
    width: '100%',
    height: 40,
    fontSize: 17,
    padding: 5,
    marginBottom: 5
  },
  sectionChangePassword: {
    backgroundColor: 'white',
    padding: 10,
    marginTop: 20
  },
  cerrarSecion: {
    marginTop: 20,
    marginBottom: 60,
    width: '100%',
    backgroundColor: 'white',
    padding: 10
  },
  containerForAcceptOCancelImage: {
    width: '100%',
    position: 'absolute',
    top: 230,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerForAwait: {
    width: '100%',
    height: '93%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
  textAwait: {
    fontSize: 40
  }
})

const mapStateToProps = ({ 
  avatar, 
  id_imagen_profile,
  name,
  phone,
  email,
  userId,
  token
}) => {
  return {
    avatar,
    id_imagen_profile,
    name,
    phone,
    email,
    userId,
    token
  }
}

const mapDispatchToProps = {
  changeVatarImage,
  updateUrlImage,
  changeDataProfile,
  getNewDataInformation,
  changePassword,
  cerrarSesion
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Perfil);