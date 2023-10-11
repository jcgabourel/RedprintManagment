export default defineEventHandler((event) => {
    const data=  [
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
    return data[event.context.params.id - 1];
  })