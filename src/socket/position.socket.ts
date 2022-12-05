export default (Io: any) => async (socket: any) => {
  socket.on(
    "ENTER-POSITION-CHANGE-ROOM",
    async (payload: { technicianId: string }) => {
      console.log("ENTERED-POSITION-CHANGE-ROOM", payload);
      socket.join(`POSITION-CHANGE-ROOM-${payload?.technicianId?.toString()}`);
    }
  );
  socket.on(
    "POSITION-CHANGE-ROOM-DATA-CHANGE",
    async (payload: { technicianId: string }) => {
      console.log("POSITION-CHANGE-ROOM-DATA-CHANGE", payload);
      socket.join(
        `POSITION-CHANGE-ROOM-${payload?.technicianId?.toString()}-DATA-CHANGE`
      );
    }
  );
};
