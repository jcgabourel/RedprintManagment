export default defineEventHandler((event) => {
    const data =  [
        {
            id: "1",
            nombre: "Producto 1",
            marca:"HP",
            categoria:"Memorias"
        },
        {
            id: "2",
            nombre: "Producto 2",
            marca:"HP",
            categoria:"Memorias"
        },
        {
            id: "3",
            nombre: "Producto 3",
            marca:"Intel",
            categoria:"Prcesadores"
        },
        {
            id: "4",
            nombre: "Producto 4",
            marca:"Epson",
            categoria:"Tarjetas"
        }

       
        
    ]
    return data[event.context.params.id - 1];
  })