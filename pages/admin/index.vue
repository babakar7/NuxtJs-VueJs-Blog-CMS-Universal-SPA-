<template>

<div class="admin-page">

  <div class="new-section">


    <AppButton @click="$router.push('/admin/new-post')"> Create Post </AppButton>


    <h1>Existing Posts</h1>

    <div class="existing-posts">




          <PostPreview v-for= "post in loadedPosts" v-bind:key="post.id"   :id="post.id"
          :thumbnail = "post.thumbnail"
          :title="post.title"
          :previewText = "post.previewText"
          :isAdmin=true

          />
    </div>

  </div>
</div>

</template>


<script>
import PostPreview from '@/components/PostPreview'
import AppButton from '@/components/UI/AppButton'

export default{

  components:{
    PostPreview,
    AppButton
  },

  middleware:['check-auth', 'auth'],


  computed:{


    loadedPosts(){

      return this.$store.getters.loadedPosts
    }

  },
}

</script>



<style scoped>
.admin-page {
  padding: 20px;
}

.new-post {
  text-align: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
}

 h1 {
  text-align: center;

}

.existing-posts{
  display:flex;
  justify-content: center;
  align-items: center;
}


</style>
