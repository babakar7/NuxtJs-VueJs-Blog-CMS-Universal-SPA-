export default function(context){

  // if running async code, need to return a promise.
  // middleware runs either on server or client


  if(!context.store.state.token){

    context.redirect('/admin/auth')
  }


}
