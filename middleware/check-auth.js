export default function(context){

  // if running async code, need to return a promise.
  // middleware runs either on server or client

  // careful with middlewaare. no access to locl storage when first running

  context.store.dispatch('initAuth', context.req)

}
