export default {
    '/album/{userId}/{albumId}': {
        get: {
            tags: ['Album'],
            summary: '단일 앨범 가져오기',
            description: '단일 앨범 가져오기(단일 앨범 안의 영상 Card list 가져오기)',
            produces: 'application/json',
            parameters: [
                {
                    name: 'albumId',
                    in: 'path',
                    description: '앨범 아이디',
                    required: true,
                },
            ],
            responses: {
                200: {
                    description: '단일 앨범 로드 완료',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    result: {
                                        type: 'object',
                                        properties: {
                                            albumId: {
                                                type: 'number',
                                                description: '앨범 아이디',
                                                example: 1,
                                            },
                                            userId: {
                                                type: 'string',
                                                description: '유저 아이디',
                                                example: 'test1234',
                                            },
                                            coverImgUrl: {
                                                type: 'string',
                                                description: '해당 앨범이 들어있는 S3 파일 경로(.jpg)',
                                                example: 'card-thumbnail/test/2023_02_14/14_41_35.jpg',
                                            },
                                            title: {
                                                type: 'string',
                                                description: '해당 앨범 제목',
                                                example: '취업에 합격해서 기뻤던 한 주',
                                            },
                                            cardId: {
                                                type: 'json',
                                                description: '해당 앨범에 들어있는 카드 아이디',
                                                example:
                                                    '{"card1": 1, "card2": 2, "card3": 3, "card4": 4, "card5": 5, "card6": 6, "card7": 7, "card8": 8, "card9": 9, "card10": 10}',
                                            },
                                            createdAt: {
                                                type: 'datetime',
                                                description: '영상 생성 날짜',
                                                example: '2022-02-08T00:00:00.000Z',
                                            },
                                            updatedAt: {
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
    },
};
