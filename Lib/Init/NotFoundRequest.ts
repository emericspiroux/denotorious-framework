export default (ctx:any) => {
  ctx.response.status = 404;
  ctx.response.body = { 
    status: 404,
    description: "Route not Found" 
  };
};