export default (Io: any) => (socket: any) => {
  socket.on(
    "ENTER-POSITION-CHANGE-ROOM",
    (payload: { technicianId: string }) => {
      console.log("ENTERED-POSITION-CHANGE-ROOM", payload);
      socket.join(`POSITION-CHANGE-ROOM-${payload?.technicianId?.toString()}`);
    }
  );
  socket.on(
    "POSITION-CHANGE-ROOM-DATA-CHANGE",
    (payload: {
      technicianId: string;
      lat: number;
      lng: number;
      heading: number;
    }) => {
      console.log("POSITION-CHANGE-ROOM-DATA-CHANGE", payload);
      Io.of("/position")
        .to(`POSITION-CHANGE-ROOM-${payload?.technicianId?.toString()}`)
        .emit("POSITION-CHANGE-ROOM-DATA-CHANGE", payload);
    }
  );
};
