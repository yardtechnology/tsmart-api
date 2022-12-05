export default (Io: any) => async (socket: any) => {
  socket.on("ENTER-SERVICE-ROOM", async (payload: { orderId: string }) => {
    console.log("ENTERED-SERVICE-ROOM", payload);
    socket.join(`SERVICE-ROOM-${payload?.orderId?.toString()}`);
  });
  socket.on(
    "SERVICE-ROOM-DATA-CHANGE",
    async (payload: { orderId: string }) => {
      console.log("SERVICE-ROOM-DATA-CHANGE", payload);
      Io.of("/service")
        .to(`SERVICE-ROOM-${payload?.orderId?.toString()}`)
        .emit("SERVICE-ROOM-DATA-CHANGE", payload);
    }
  );
};
