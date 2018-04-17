import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { Button } from 'react-native-elements';
import { sanFranciscoWeights, iOSColors } from 'react-native-typography'
import _ from 'lodash';

import { login, register, getProfile } from '../../redux/actions';

class LoginAndRegister extends Component {
  state = {
    section: 'LOGIN',
    email: '',
    password: '',
    password2: '',
    phone: '',
    name: ''
  }

  login = () => {
    return (
      <View style={styles.containerLogin}>
        <FormLabel
          labelStyle={sanFranciscoWeights.bold}>Email</FormLabel>
        <FormInput
          onChangeText={t => {
            this.setState({
              email: t
            })
          }}
          value={this.state.email}
          />
        <FormLabel
          labelStyle={sanFranciscoWeights.bold}>Contraseña</FormLabel>
        <FormInput 
          onChangeText={t => {
            this.setState({
              password: t
            })
          }}
          value={this.state.password}
          secureTextEntry={true}
          containerStyle={styles.spaceInput} />

        <Button
          title="Iniciar sesion"
          onPress={() => {
            if (!_.isEmpty(this.state.email) && !_.isEmpty(this.state.password)) {
              this.props.login(this.state.email, this.state.password)
            }
          }}
          backgroundColor="#493FE9" />
        <Button
          title="Registrarte"
          onPress={() => {
            this.setState({
              section: 'REGISTER'
            })
          }}
          color="#493FE9"
          backgroundColor="transparent" />
      </View>
    )
  }

  register = () => {
    return(
      <View style={[styles.containerLogin, styles.topSection]}>
        <FormLabel
          labelStyle={sanFranciscoWeights.bold}>Nombre</FormLabel>
        <FormInput 
          onChangeText={t => {
            this.setState({
              name: t
            })
          }}
          value={this.state.name}
        />
        <FormLabel
          labelStyle={sanFranciscoWeights.bold}>Email</FormLabel>
        <FormInput 
          onChangeText={t => {
            this.setState({
              email: t
            })
          }}
          value={this.state.email}
          />
        <FormLabel
          labelStyle={sanFranciscoWeights.bold}>Telefono</FormLabel>
        <FormInput
          onChangeText={t => {
            this.setState({
              phone: t
            })
          }}
          value={this.state.phone}
          containerStyle={styles.spaceInput} />
        <FormLabel
          labelStyle={sanFranciscoWeights.bold}>Contraseña</FormLabel>
        <FormInput 
          onChangeText={t => {
            this.setState({
              password: t
            })
          }}
          value={this.state.password}
          secureTextEntry={true}
          containerStyle={styles.spaceInput} />
        <FormLabel
          labelStyle={sanFranciscoWeights.bold}>Repetir contraseña</FormLabel>
        <FormInput 
          onChangeText={t => {
            this.setState({
              password2: t
            })
          }}
          value={this.state.password2}
          secureTextEntry={true}
          containerStyle={styles.spaceInput} />

        <Button
          title="Registrar"
          onPress={() => {
            if (
              !_.isEmpty(this.state.name) &&
              !_.isEmpty(this.state.email) &&
              !_.isEmpty(this.state.password) &&
              !_.isEmpty(this.state.password2) &&
              !_.isEmpty(this.state.phone) &&
              _.isInteger(Number(this.state.phone))
            ) {
              this.props.register(
                this.state.name,
                this.state.email,
                this.state.password,
                this.state.password2,
                Number(this.state.phone)
              )
            }
          }}
          backgroundColor="#493FE9" />
        <Button
          title="Login"
          onPress={() => {
            this.setState({
              section: 'LOGIN'
            })
          }}
          color="#493FE9"
          backgroundColor="transparent" />

      </View>
    )
  }

  render() {
    return (
      <View style={styles.containerLoginAndRegister}>
        <View style={[styles.alineaContent, this.state.section === "REGISTER" ? styles.positionSection : styles.positionNormal]}>
          <Text style={[sanFranciscoWeights.bold, styles.textFloting]}>
            Funny
          </Text>
        </View>
        {
          this.state.section === 'LOGIN' ? this.login() : this.register()
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containerLoginAndRegister: {
    width: '100%',
    height: '93%',
    justifyContent: 'space-around',
    backgroundColor: 'white'
  },
  containerLogin: {
  },
  spaceInput: {
    marginBottom: 20
  },
  textFloting: {
    fontSize: 80,
    textAlign: 'center',
    color: iOSColors.purple
  },
  alineaContent: {
    position: 'absolute',
    width: '100%',
  },
  topSection: {
    marginTop: 110
  },
  positionSection: {
    marginTop: 20
  },
  positionNormal: {
    top: 100
  }
})

const mapStateToProps = ({ changeStatusLogin, userId }) => {
  return {
    changeStatusLogin,
    userId
  }
}

const mapDispatchToProps = {
  login,
  register,
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(LoginAndRegister);