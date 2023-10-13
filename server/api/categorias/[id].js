export default defineEventHandler((event) => {
  

  const ala =   useStorage('test').getItem('categorias')
    return  ala.then((f)=> {
        if(f===null)
        return  {}
        return f[event.context.params.id - 1]
    }   
    ) 
});
