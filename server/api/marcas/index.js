
   //await 
    

export default defineEventHandler((event) => {

    useStorage('test').setItem('foo', { hello: 'world' })

    return  [
        {
            id: "1",
            nombre: "HP"
        },
        {
            id: "2",
            nombre: "Adata"
        },
        {
            id: "3",
            nombre: "Epson"
        },
        {
            id: "4",
            nombre: "AMD"
        },
        {
            id: "5",
            nombre: "Intel"
        }
        
    ]
    
  })