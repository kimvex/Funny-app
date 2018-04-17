import axios from 'axios'

module.exports = {
  get_publications(id) {
    let data = {
      url: 'http://funny.kimvex.com/api/Publications',
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
    }

    if (id) {
      data.where = {
        id
      }
    }

    return axios(data)
      .then(result => result.data)
      .catch(err => {
        return console.log(err)
      })
  }
}