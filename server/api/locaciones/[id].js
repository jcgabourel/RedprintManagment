export default defineEventHandler((event) => {
    const data =     [
        {
            id: "1",
            nombre: "Casa Hector"
        },
        {
            id: "2",
            nombre: "Gabo"
        },
        {
            id: "3",
            nombre: "Norberto"
        },
        {
            id: "4",
            nombre: "Noe"
        },
        {
            id: "5",
            nombre: "resguardo CT"
        }
        
    ]
    return data[event.context.params.id - 1];
  })