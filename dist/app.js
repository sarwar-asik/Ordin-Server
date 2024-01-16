"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_status_1 = __importDefault(require("http-status"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// import http from 'http';
// import { Socket, Server as SocketIoServer } from 'socket.io';
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
// app.use(cors())
// app.use(cors({ origin:[ 'http://localhost:3000','https://ordain-interior.vercel.app'], credentials: true }));
app.use((0, cors_1.default)({ origin: true, credentials: true, methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] }));
// app.use(cors({ 
//   origin: 'https://ordain-interior.vercel.app', 
//   credentials: true 
// }));
//! for cookies
app.use((0, cookie_parser_1.default)());
//parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// app.use('/', (req: Request, res: Response) => {
//   console.log(req?.body,"https//:localhost:5000/");
//   res.json({
//     status:httpStatus.OK,
//     message:'book-listing-server server is running on 5000'
//   });
// });
app.use('/api/v1', routes_1.default);
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
app.use(globalErrorHandler_1.default);
//handle not found
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
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
exports.default = app;
