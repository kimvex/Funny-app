import {
  Alert,
  AsyncStorage
} from 'react-native';

module.exports = (state, action) => {
  switch (action.type) {
    case 'GET_PUBLICATIONS_SUCCESS':
        const newProps = action.payload.data
        return { ...state,
          publications: newProps
        }
      break;
    case 'PUBLICATIONS_GET_PUBLICATIONS_SUCCESS':
        let newPublications = action.payload.data;
        let principalList = state.publications.concat(newPublications)
        if (state.publications[state.publications.length - 1].id !== newPublications[newPublications.length - 1].id) {
          return {
            ...state,
            publications: principalList
          }
        }
        return {
          ...state
        }
      break;
    case 'OPEN_AND_CLOSE_MODAL':
        const isOpen = action.payload.isOpen
        return {
          ...state,
          isOpen: isOpen
        }
      break;
    case 'PUBLICATION':
        const publication = action.payload.publication;
        return {
          ...state,
          publication,
          comments: publication.comments,
          likes: publication.likes
        }
      break;
    case 'SET_LIKE_SUCCESS':
        const likes = state.likes.concat(action.payload.data)
        return {
          ...state,
          likes
        }
      break;
    case 'DELETE_LIKE':
        const index = state.likes.indexOf(action.payload.exist)
        state.likes.splice(index, 1)
        const newLikes = [].concat(state.likes)
        return {
          ...state,
          likes: newLikes
        }
      break;
    case 'SET_COMMENT_COMMENT_SUCCESS':
        return {
          ...state
        }
      break;
    case 'GET_COMMENTS_SUCCESS':
        const comments = action.payload.data;

        return {
          ...state,
          comments
        }
      break;
    case 'SET_A_PUBLICATION':
        return {
          ...state,
          stateOfPublication: true
        }
      break;
    case 'CHANGE_STATE_OF_PUBLICATION':
        return {
          ...state,
          stateOfPublication: action.payload.state
        }
      break;
    case 'CHANGE_AVATAR_PROFILE_URL_SUCCESS':
        return {
          ...state,
        }
      break;
    case 'SET_A_NEW_IMAGE_OF_PROFILE':
        return {
          ...state,
          avatar: action.payload.url
        }
      break;
    case 'GET_INFORMATION_OF_USER_SUCCESS':
        return {
          ...state,
          name: action.payload.data.name,
          phone: action.payload.data.number.toString(),
          email: action.payload.data.email
        }
      break;
    case 'CHANGE_PASSWORD_SUCCESS':
        Alert.alert('La contraseña ha sido cambiada correctamente')
        return {
          ...state
        }
      break;
    case 'CHANGE_PASSWORD_FAIL':
        Alert.alert('La contraseña es incorrecta')
     break;
    case 'LOGIN_SUCCESS':
        AsyncStorage.setItem('token', action.payload.data.id)
        return {
          ...state,
          token: action.payload.data.id,
          userId: action.payload.data.userId,
          changeStatusLogin: true
        }
      break;
    case 'LOGIN_FAIL':
        Alert.alert('Correo o contraseña incorrectos')
        return {
          ...state
        }
      break;
    case 'REGISTER_SUCCESS':
        Alert.alert('Te has registrado!!')
        return {
          ...state
        }
      break;
    case 'REGISTER_FAIL':
        Alert.alert('Fallo el registro')
        return {
          ...state
        }
      break;
    case 'SET_TOKEN':
        return {
          ...state,
          token: action.payload.token,
          name: action.payload.name,
          email: action.payload.email,
          phone: action.payload.phone,
          id_imagen_profile: action.payload.id_imagen_profile,
          avatar: action.payload.avatar,
          userId: action.payload.userId
        }
      break;
    case 'GET_PROFILE_SUCCESS':
        let { id, email, name, number, imageProfile } = action.payload.data;
        let data = {
          id_imagen_profile: imageProfile.id,
          avatar: imageProfile.url,
          name,
          phone: number,
          email,
          userId: id 
        }
        AsyncStorage.setItem('profile', JSON.stringify(data))
        return {
          ...state,
          id_imagen_profile: imageProfile.id,
          avatar: imageProfile.url,
          name,
          phone: number,
          email,
          changeStatusLogin: false
        }
      break;
    case 'CERRAR_SESION':
        AsyncStorage.multiRemove(['token', 'profile'])
        return {
          ...state,
          id_imagen_profile: '',
          avatar: '',
          name: '',
          phone: '',
          email: '',
          token: ''
        }
      break;
    case 'CHANGE_PAGE':
        return {
          ...state,
          page: action.payload.page
        }
    default:
      return state
  }
}