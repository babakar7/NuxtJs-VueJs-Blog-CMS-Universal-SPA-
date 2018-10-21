<template>
  <div class="admin-post-page">

    <div class="new-post-form">



      <FormPost @submitPost="onSubmitted"/>


    </div>

  </div>
</template>


<style scoped>


.new-post-form{

  width:65%;
  margin:auto;
}
</style>

<script>
import FormPost from '@/components/admin/FormPost'
import axios from 'axios'

export default{


components:{

  FormPost,

},

middleware:['check-auth', 'auth'],


methods:{

  onSubmitted(postData){

    axios.post('https://nuxtblog-f28e2.firebaseio.com/posts.json?auth=' + this.$store.state.token,{...postData, updatedDate:new Date()} )
    .then(result => {
      this.$store.commit('addPost', {id: result.data.name, ...postData})
      this.$router.push('/admin')
    })
    .catch(e =>  console.log(e))
  }
}


}

</script>
