<template>

<div class="admin-post-page container">


  <div class="update-form">

    <FormPost @submitPost="onSubmitted" :loadedPost="loadedPost"/>



  </div>
</div>

</template>



<script>
import FormPost from '@/components/admin/FormPost'
import axios from 'axios'
export default{

  components:{
    FormPost
  },

  middleware:['check-auth', 'auth'],

  asyncData(context){
    // return is necesssary
      return axios.get('https://nuxtblog-f28e2.firebaseio.com/posts/' + context.params.postId + '.json')
        .then(res => {

          return {
            loadedPost: res.data
          }
      }).catch(e => context.error(e))

  },
  data(){

    return{

    }
  },

  methods:{

    onSubmitted(editedPost){


      axios.put('https://nuxtblog-f28e2.firebaseio.com/posts/' + this.$route.params.postId + '.json?auth=' + this.$store.state.token, editedPost)
      .then(resp=>{
        this.$router.push('/admin')
        this.$store.commit('editPost', editedPost)
      })
    }
  }
}


</script>


<style>
.admin-post-page{


}

</style>
