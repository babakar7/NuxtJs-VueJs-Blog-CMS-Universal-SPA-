<template>


    <div class="posts-page">

      <PostPreview v-for= "post in loadedPosts" v-bind:key="post.id"   :id="post.id"
      :thumbnail = "post.thumbnail"
      :title="post.title"
      :previewText = "post.previewText"
      />


    </div>

</template>


<script>
import PostPreview from '@/components/PostPreview'


export default{

  components:{
    PostPreview
  },


  computed:{


    loadedPosts(){

      return this.$store.getters.loadedPosts
    }

  },

}



</script>
<style scoped>


.posts-page{

  display:flex;
  justify-content: center;
  align-items: center;
}
</style>
