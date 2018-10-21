<template>

<div class="home-page">

<div class="intro">

  <h1> Get the latest VueJs News</h1>

</div>

  <div class="featured-posts">


    <PostPreview  v-show="loadedPosts" v-for= "post in loadedPosts" v-bind:key="post.id"   :id="post.id"
    :thumbnail = "post.thumbnail"
    :title="post.title"
    :previewText = "post.previewText"
    />

  </div>

</div>


</template>


<script>

import PostPreview from '@/components/PostPreview'
import axios from 'axios'
export default{




components:{
  PostPreview
},

//special nuxt js method. executes on the server.
// allows pre rendererd pages. only in pages.
// only returns an object
// runs before component is created so this keyword won't work
// async runs on the server only on first load/refresh
// then requests are made in the client

/*asyncData(context, callback){

    setTimeout( () =>  {
      callback(null, {loadedPosts:[{id:'1', title:'first post', previewText:'okidokes',
      thumbnail:'https://ichef.bbci.co.uk/images/ic/640x360/p02tfjmd.jpg'}]} )
    }, 1500)

},*/



computed:{


  loadedPosts(){

    if (this.$store.getters.loadedPosts){
      return this.$store.getters.loadedPosts

    }else{
      return []
    }
  }

},


data(){
    return{
      posts:[]
    }
  },


}
</script>

<style scoped>

.intro{
  height:300px;
  position:relative;
  padding:30px;
  background-position:center;
  background-size:cover;
  background-image:url('https://ichef.bbci.co.uk/images/ic/640x360/p02tfjmd.jpg')
}

.intro h1{
  color:black;
  background-color:white;
  width:auto;
}

.featured-posts {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

</style>
