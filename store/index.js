import Vuex from 'vuex'
import axios from 'axios'
import Cookie from 'js-cookie'

const createStore = () =>  {

  return new Vuex.Store({

    state:{
        loadedPosts:[],
        token:null
    },

    mutations:{
      setPosts(state, posts){
        state.loadedPosts = posts
      },

      addPost(state, post){

        state.loadedPosts.push(post)

      },

      editPost(state, editedPost){

        console.log(editedPost)

        let postIndex = state.loadedPosts.findIndex(post =>  post.id === editedPost.id )

        state.loadedPosts[postIndex] = editedPost
      },

      setToken(state, token){

        state.token = token

      },

      clearToken(state){

        state.token = null
      }

    },



    actions:{


// called by middleware. checks cookies to prevent user from loggin in again
      initAuth(context, req){

        let token = null
        let expirationDate = null

        if(req){

            if(!req.headers.cookie){
              console.log('no cookie in header')
              return
            }

            let jwtCookie = req.headers.cookie.split(';').find(c =>  c.trim().startsWith('jwt='))
            if(!jwtCookie){
              return
            }

            // extract token
             token = jwtCookie.split('=')[1]

             expirationDate = req.headers.cookie.split(';').find(c =>  c.trim().startsWith('expirationDate='))
            .split('=')[1]


        } else{

           token =   localStorage.getItem('token')
           expirationDate =  localStorage.getItem('tokenExpiration')


          if(new Date().getTime() > expirationDate || !token ){

            console.log('should not run')
            return
          }
        }

        console.log('commit & dispatch coming')

         context.commit('setToken', token)
         context.dispatch('setLogoutTimer', +expirationDate - new Date().getTime())
      // }

      },

      // special nuxt action to initialize the store
      // second argument is same context in fetch and asyncData
      // use for data that is used a lot. mix up with async calls
      nuxtServerInit(vuexContext, context ){

        return axios.get('https://nuxtblog-f28e2.firebaseio.com/posts.json')
       .then(res => {

          let preData = Object.values(res.data)

          let keys = Object.keys(res.data)

          let  postArray = []

          for (let i=0; i< keys.length; i++){

              postArray[i] = {... preData[i], id:keys[i] }
          }

         vuexContext.commit('setPosts', postArray )

       }).catch(e => context.error(e))

     },

           authenticateUser(context, data){

             if(! data.isLogin){
              return axios.post(
               "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCAmN1Olgf6dYO6DniZDqgAnqiz02SeMY8",
               {
                 email: data.email ,
                 password: data.password ,
                 returnSecureToken:true
             })
               .then(res =>  {
                 console.log(res)

                 context.commit('setToken', res.data.idToken)
                 localStorage.setItem('token', res.data.idToken)

                 localStorage.setItem('tokenExpiration', new Date().getTime() + res.data.expiresIn *1000)

                 Cookie.set('jwt', res.data.idToken)
                 Cookie.set('expirationDate', new Date().getTime() + res.data.expiresIn *1000)
                 console.log('cookie just got set')

                 context.dispatch('setLogoutTimer', res.expiresIn *1000)
               } )
               .catch(err => console.log(err))
             } else{

              return axios.post("https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCAmN1Olgf6dYO6DniZDqgAnqiz02SeMY8",
               {
                 email: data.email ,
                 password: data.password ,
                 returnSecureToken:true
               }).then(res =>

            {
               context.commit('setToken', res.data.idToken)
               localStorage.setItem('token', res.data.idToken)

               localStorage.setItem('tokenExpiration', new Date().getTime() + res.data.expiresIn *1000)

               Cookie.set('jwt', res.data.idToken)
               Cookie.set('expirationDate', new Date().getTime() + res.data.expiresIn *1000)
               console.log('cookie just got set')

               context.dispatch('setLogoutTimer', res.expiresIn *1000)
             }


             )
               .catch(err => console.log(err))


             }


           },


           setLogoutTimer(context, duration){

             setTimeout(() => {

               context.commit('clearToken')

             }, duration)

           }


      },





    getters:{

      loadedPosts(state){
        return state.loadedPosts
      }

    }

  })
}

export default createStore
