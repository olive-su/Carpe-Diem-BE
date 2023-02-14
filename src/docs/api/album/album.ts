export default {
    '/album/{userId}/{albumId}': {
        get: {
            tags: ['Album'],
            summary: '단일 앨범 가져오기',
            description: '단일 앨범 가져오기(단일 앨범 안의 영상 Card list 가져오기)',
            produces: 'application/json',
            parameters: [
                {
                    name: 'userId',
                    in: 'path',
                    description: '사용자 아이디',
                    required: true,
                },
                {
                    name: 'albumId',
                    in: 'path',
                    description: '앨범 아이디',
                    required: true,
                },
            ],
            responses: {
                200: {
                    description: '사용자 단일 앨범 로드 완료',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    result: {
                                        type: 'object',
                                        properties: {
                                            album_id: {
                                                type: 'number',
                                                description: '앨범 아이디',
                                                example: 1,
                                            },
                                            user_id: {
                                                type: 'string',
                                                description: '유저 아이디',
                                                example: 'test1234',
                                            },
                                            cover_img_url: {
                                                type: 'string',
                                                description: '해당 앨범이 들어있는 S3 파일 경로(.jpg)',
                                                example: 'card-thumbnail/test/2023_02_14/14_41_35.jpg',
                                            },
                                            title: {
                                                type: 'string',
                                                description: '해당 앨범 제목',
                                                example: '취업에 합격해서 기뻤던 한 주',
                                            },
                                            card_id: {
                                                type: 'json',
                                                description: '해당 앨범에 들어있는 카드 아이디',
                                                example:
                                                    '{"card1": 1, "card2": 2, "card3": 3, "card4": 4, "card5": 5, "card6": 6, "card7": 7, "card8": 8, "card9": 9, "card10": 10}',
                                            },
                                            created_at: {
                                                type: 'datetime',
                                                description: '영상 생성 날짜',
                                                example: '2022-02-08T00:00:00.000Z',
                                            },
                                            updated_at: {
                                                type: 'datetime',
                                                description: '영상 수정 날짜',
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
        delete: {
            tags: ['Album'],
            summary: '단일 앨범 삭제',
            description: '단일 앨범 삭제 (단일 앨범만 삭제, Card list는 삭제 안됨)',
            produces: 'application/json',
            parameters: [
                {
                    name: 'userId',
                    in: 'path',
                    description: '사용자 아이디',
                    required: true,
                },
                {
                    name: 'albumId',
                    in: 'path',
                    description: '앨범 아이디',
                    required: true,
                },
            ],
            responses: {
                200: {
                    description: '사용자 단일 앨범 삭제 완료',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'string',
                                example: 'DELETE ALBUM OK',
                                properties: 'DELETE ALBUM OK',
                            },
                        },
                    },
                },
            },
        },
        put: {
            tags: ['Album'],
            summary: '단일 앨범 수정',
            description: '단일 앨범 수정 완료',
            produces: 'application/json',
            parameters: [
                {
                    name: 'userID',
                    in: 'path',
                    description: '사용자 아이디',
                    required: true,
                },
                {
                    name: 'albumId',
                    in: 'path',
                    description: '앨범 아이디',
                    required: true,
                },
            ],
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            properties: {
                                card_id: {
                                    type: 'json',
                                    description: '해당 앨범에 들어있는 카드 아이디',
                                    example:
                                        '{"card1": 1, "card2": 2, "card3": 3, "card4": 4, "card5": 5, "card6": 6, "card7": 7, "card8": 8, "card9": 9, "card10": 10}',
                                },
                                title: {
                                    type: 'string',
                                    description: '타이틀',
                                    example: 'HSH의 즐거운 날',
                                },
                                cover_img_url: {
                                    type: 'string',
                                    description: '해당 앨범이 들어있는 S3 파일 경로(.jpg)',
                                    example: 'card-thumbnail/test/2023_02_14/14_41_35.jpg',
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: '사용자 단일 앨범 타이틀 수정 완료',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'string',
                                example: 'UPDATE ALBUM OK',
                                properties: 'UPDATE ALBUM OK',
                            },
                        },
                    },
                },
            },
        },
    },
};
