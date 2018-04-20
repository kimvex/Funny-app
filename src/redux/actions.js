import {
  AsyncStorage
} from 'react-native';

export const getPublication = () => ({
  type: 'GET_PUBLICATIONS',
  payload: {
    request: {
      client: 'default',
      url: '/Publications',
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
      },
      method: 'get'
    }
  }
})

export const paginationGetPublications = (id) => ({
  type: 'PUBLICATIONS_GET_PUBLICATIONS',
  payload: {
    request: {
      client: 'default',
      url: '/Publications',
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
            id: id
          },
          order: 'id DESC',
          limit: 30
        }
      },
      method: 'get'
    }
  }
})

export const openAndCloseModal = (isOpen) => {
  return {
    type: 'OPEN_AND_CLOSE_MODAL',
    payload: {
      isOpen,
    }
  }
}

export const setPublicationAndComments = (publication) => {
  return {
    type: 'PUBLICATION',
    payload: {
      publication
    }
  }
}

export const setLike = (publicationId, token) => ({
  type: 'SET_LIKE',
  payload: {
    request: {
      client: 'default',
      url: `/Likes`,
      method: 'post',
      data: {
        publicationId: publicationId
      },
      headers: {
        Authorization: token
      }
    },
  }
})

export const deleteLike = (exist) => {
  return {
    type: 'DELETE_LIKE',
    payload: {
      exist
    }
  }
}

export const setComment = (comment, publicationId, token) => ({
  type: 'SET_COMMENT',
  payload: {
    request: {
      client: 'default',
      url: '/Comments',
      method: 'post',
      data: {
        comment,
        publicationId
      },
      headers: {
        Authorization: token
      }
    }
  }
})

export const getComments = (publicationId, token) => ({
  type: 'GET_COMMENTS',
  payload: {
    request: {
      client: 'default',
      url: `/Publications/${publicationId}/comments`,
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
        Authorization: token
      }
    }
  }
})

export const setImagesToCarrousel = (img) => {
  return {
    type: 'PUSH_IMAGE_TO_ARRAY',
    payload: {
      img
    }
  }
}

export const pubicate = (name, userId, information, category, img, token) => {
  return {
    type: 'SET_A_PUBLICATION',
    payload: {
      request: {
        client: 'default',
        url: '/Publications/publish',
        method: 'post',
        data: {
          name,
          userId,
          information,
          category,
          img
        },
        headers: {
          Authorization: token
        }
      }
    }
  }
}

export const changeStateOfPublication = () => ({
  type: 'CHANGE_STATE_OF_PUBLICATION',
  payload: {
    state: false
  }
})

export const changeVatarImage = (id, url, token) => ({
  type: 'CHANGE_AVATAR_PROFILE',
  payload:{
    request: {
      client: 'default',
      url: `/ImageProfiles/updateImage`,
      method: 'put',
      data: {
        url,
        imageId: id
      },
      headers: {
        Authorization: token
      }
    }
  }
})

export const updateUrlImage = (url) => {
  return {
    type: 'SET_A_NEW_IMAGE_OF_PROFILE',
    payload: {
      url
    }
  }
}

export const changeDataProfile = (id, data, token) => {
  console.log(data)
  return ({
    type: 'UPDATE_INFORMATION_OF_USER',
    payload: {
      request: {
        client: 'deafult',
        url: `/Funnys/update?where={"id":"${id}"}`,
        method: 'post',
        data,
        headers: {
          Authorization: token
        }
      }
    }
  })
}

export const getNewDataInformation = (id, token) => ({
  type: 'GET_INFORMATION_OF_USER',
  payload: {
    request: {
      client: 'default',
      url: `/Funnys/${id}`,
      method: 'get',
      headers: {
        Authorization: token
      }
    }
  }
})

export const changePassword = (oldPassword, newPassword, token) => ({
  type: 'CHANGE_PASSWORD',
  payload: {
    request: {
      client: 'default',
      url: '/Funnys/change-password',
      method: 'POST',
      data: {
        oldPassword,
        newPassword
      },
      headers: {
        Authorization: token
      }
    }
  }
})

export const login = (email, password) => ({
  type: 'LOGIN',
  payload: {
    request: {
      client: 'default',
      url: '/Funnys/login',
      method: 'post',
      data: {
        email,
        password
      }
    }
  }
})

export const register = (name, email, password, password2, phone) => ({
  type: 'REGISTER',
  payload: {
    request: {
      client: 'default',
      url: '/Funnys/register',
      method: 'post',
      data: {
        name,
        email,
        password,
        password2,
        phone
      }
    }
  }
})

export const getProfile = (token, id) => ({
  type: 'GET_PROFILE',
  payload: {
    request: {
      client: 'default',
      url: `/Funnys/${id}`,
      method: 'get',
      params: {
        filter: {
          include: {
            relation: 'imageProfile'
          }
        }
      }
    }
  }
})

export const setToProfile = (token, { name, email, phone, id_imagen_profile, avatar, userId }) => {
  return {
    type: 'SET_TOKEN',
    payload: {
      token,
      name,
      email,
      phone,
      id_imagen_profile,
      avatar,
      userId
    }
  }
}

export const cerrarSesion = () => ({
  type: 'CERRAR_SESION',
  payload: {

  }
})

export const changePage = (page) => ({
  type: 'CHANGE_PAGE',
  payload: {
    page
  }
})
