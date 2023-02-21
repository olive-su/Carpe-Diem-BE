export default {
    '/user/{userId}': {
        get: {
            tags: ['User'],
            summary: '회원 정보 가져오기',
            description: '회원 정보 (마이페이지)',
            produces: 'application/json',
            parameters: [
                {
                    name: 'userId',
                    in: 'path',
                    description: '사용자 아이디',
                    required: true,
                },
            ],
            responses: {
                200: {
                    description: '회원 정보 가져오기',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    result: {
                                        type: 'object',
                                        properties: {
                                            user_id: {
                                                type: 'string',
                                                description: '유저 아이디',
                                                example: '111026319355272059757',
                                            },
                                            email: {
                                                type: 'string',
                                                description: '유저 이메일',
                                                example: 'test@gmail.com',
                                            },
                                            nickname: {
                                                type: 'string',
                                                description: '유저 닉네임',
                                                example: '수개미',
                                            },
                                            created_at: {
                                                type: 'datetime',
                                                description: '유저정보 생성 날짜',
                                                example: '2022-02-08T00:00:00.000Z',
                                            },
                                            updated_at: {
                                                type: 'datetime',
                                                description: '유저정보 수정 날짜',
                                                example: '2022-02-08T00:00:00.000Z',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        put: {
            tags: ['User'],
            summary: '유저 정보 수정',
            description: '유저 정보 수정 (마이페이지)',
            produces: 'application/json',
            parameters: [
                {
                    name: 'userId',
                    in: 'path',
                    description: '사용자 아이디',
                    required: true,
                },
            ],
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            properties: {
                                email: {
                                    type: 'string',
                                    description: '유저 이메일',
                                    example: 'test@gmail.com',
                                },
                                nickname: {
                                    type: 'string',
                                    description: '유저 닉네임',
                                    example: '수개미',
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: '유저 정보 수정 완료',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'string',
                                example: 'UPDATE USER OK',
                                properties: 'UPDATE USER OK',
                            },
                        },
                    },
                },
            },
        },
    },
};
