require('dotenv').config()

exports.DATABASE_URL = (
  process.env.DATABASE_URL ||
  global.DATABASE_URL ||
  'mongodb://hayden321:46869269a@ds119380.mlab.com:19380/bread-pcb-tool'
);

exports.PORT = process.env.PORT || 3002;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
exports.IS_AUTH_ACTIVE = true;
// {username: "Byun78zdM", _id: "5a94d3b02d081b278d693d39"}
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVhOTRkNTZmM2ZiZjY3MmVlMDBlZjMxYyIsInVzZXJuYW1lIjoibHVsYTEiLCJwYXNzd29yZCI6IiQyYSQxMCRNNThKaEF6aXdDa01PTU5wNXAwRnllTkhQaE5CdXFQcTNtU0VWZXNJVmdIOHIyd2h5RW9PRyIsIl9fdiI6MH0sImlhdCI6MTUxOTcwMzg1MCwiZXhwIjoxNTE5NzAzODUxLCJzdWIiOiJsdWxhMSJ9.k2hSYSUV0qnISgEN5X0hK2cXyfPtk_b65g61jRs-Xy0
// 5a94d56f3fbf672ee00ef31c
