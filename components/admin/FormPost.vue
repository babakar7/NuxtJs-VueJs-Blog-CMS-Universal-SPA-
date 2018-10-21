<template>

<form @submit.prevent="onSave">

  <AppInputControl v-model="editedPost.author">Author Name</AppInputControl>

 <AppInputControl v-model="editedPost.title">Title</AppInputControl>

 <AppInputControl v-model="editedPost.thumbnail">Thumbnail Link</AppInputControl>


  <AppInputControl
            control-type="textarea"
            v-model="editedPost.previewText">Preview Text</AppInputControl>


 <AppInputControl
           control-type="textarea"
           v-model="editedPost.content">Content</AppInputControl>

 <AppButton type="submit">Save</AppButton>

 <AppButton
           type="button"
           style="margin-left: 10px"
           btn-style="cancel"
           @click="onCancel">Cancel</AppButton>

</form>

</template>

<script>
import AppInputControl from '@/components/UI/AppInputControl'
import AppButton from '@/components/UI/AppButton'

export default{


props:{
  loadedPost:{
    type:Object,
    required:false
  }
},

components:{


  AppButton,
  AppInputControl
},


  data(){

    return{

      editedPost: this.loadedPost ? {...this.loadedPost} :

      {

        author:'',
        title:'',
        thumbnail:'',
        content:'',
        previewText:'',
      }
    }
  },

  methods:{

    onSave(){
      // save post

      this.$emit('submitPost', this.editedPost)
    },

    onCancel(){
      //naviguate back

      this.$router.push('/admin')
    }
  }

}

</script>
