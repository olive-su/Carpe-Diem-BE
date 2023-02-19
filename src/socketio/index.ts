import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';

const app = express();

const httpServer = http.createServer(app);

const wsServer = new Server(httpServer, {
    cors: {
        origin: ['https://admin.socket.io'], // admin 데모 설정
        credentials: true,
    },
});

instrument(wsServer, {
    auth: false, // 비밀번호 같은 보안 설정 가능
});

wsServer.on('connection', (socket) => {
    console.log(wsServer.sockets.adapter);
    socket.on('join_room', (roomName, done) => {
        socket.join(roomName);
        socket.to(roomName).emit('welcome');
    });

    socket.on('offer', (offer, roomName) => {
        socket.to(roomName).emit('offer', offer);
    });

    socket.on('answer', (answer, roomName) => {
        socket.to(roomName).emit('answer', answer);
    });
    socket.on('ice', (ice, roomName) => {
        // ice 이벤트를 받는 동시에 보내기도 해야함
        socket.to(roomName).emit('ice', ice);
    });
});

export default app;
