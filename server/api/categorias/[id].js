export default defineEventHandler((event) => {
  const data = [
    {
      id: "1",
      nombre: "Discos Duros",
    },
    {
      id: "2",
      nombre: "Memorias",
    },
    {
      id: "3",
      nombre: "Tarjetas",
    },
    {
      id: "4",
      nombre: "Prcesadores",
    },
    {
      id: "5",
      nombre: "Gabinetes",
    },
  ];

  return data[event.context.params.id - 1];
});
