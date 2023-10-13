export default defineEventHandler(async event => {
    const body = await readBody(event)
    // TODO: Handle body and add user

    let data =[]
    const ala =   useStorage('test').getItem('categorias')

    ala.then((f)=> {
      if(f!==null)
      data=f
      data.push(body)
      useStorage('test').setItem('categorias', data)
  } )  


   
   
   

    
  });
  