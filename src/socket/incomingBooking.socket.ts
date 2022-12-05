export default (Io: any) => async (socket: any) => {
  socket.on("ENTER-NEW-JOB-ROOM", async (payload: { technicianId: string }) => {
    console.log("ENTER-NEW-JOB-ROOM", payload);
    socket.join(`NEW-JOB-${payload?.technicianId?.toString()}`);
  });
  socket.on("NEW-JOB-REQUEST", async (payload: { technicianId: string }) => {
    console.log("NEW-JOB-REQUEST", payload);
    Io.of("/incoming-job")
      .to(`NEW-JOB-${payload?.technicianId?.toString()}`)
      .emit("NEW-JOB-REQUEST", payload);
  });
};
