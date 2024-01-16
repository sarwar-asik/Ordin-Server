import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

import cookieParser from 'cookie-parser';
// import http from 'http';
// import { Socket, Server as SocketIoServer } from 'socket.io';
import router from './app/routes';

const app: Application = express();

// app.use(cors())
// app.use(cors({ origin:[ 'http://localhost:3000','https://ordain-interior.vercel.app'], credentials: true }));

app.use(cors({ origin:true,credentials: true,methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']}));


// app.use(cors({ 
//   origin: 'https://ordain-interior.vercel.app', 
//   credentials: true 
// }));



//! for cookies
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/', (req: Request, res: Response) => {
//   console.log(req?.body,"https//:localhost:5000/");
//   res.json({
//     status:httpStatus.OK,
//     message:'book-listing-server server is running on 5000'
//   });
// });

app.use('/api/v1', router);


// const server = http.createServer(app)
// const io: SocketIoServer = new SocketIoServer(server, {
//   cors: {
//     origin: '*',
//     methods: ['GET', 'POST'],
//   },
//   // transports: ['websocket', 'polling'],
// })

// io.on('connection', (socket: Socket) => {
//   console.log('socket user connected')

//   const userString = socket.handshake.query.user as any
//   const user = JSON.parse(userString)

//   // Now, you can use the 'user' object as needed
//   console.log('User:', user)

//   socket.on('send-message', data => {
//     console.log(data)
//     // chatService.chat_message(data)
//   })

//   socket.on('disconnect', () => {
//     console.log('user disconnected')
//   })
// })


//global error handler
app.use(globalErrorHandler);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;
