export default {
    '/card/{userId}': {
        get: {
            tags: ['Card'],
            summary: '전체 영상 가져오기',
            description: '전체 영상 (영상 모아보기 페이지)',
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
                    description: '사용자 전체 영상 로드 완료',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    result: {
                                        type: 'object',
                                        properties: {
                                            cardId: {
                                                type: 'number',
                                                description: '카드 아이디',
                                                example: 1,
                                            },
                                            userId: {
                                                type: 'string',
                                                description: '유저 아이디',
                                                example: 'test1234',
                                            },
                                            albumId: {
                                                type: 'number',
                                                description: '해당 카드가 들어있는 앨범 아이디',
                                                example: 1,
                                            },
                                            expressionLabel: {
                                                type: 'string',
                                                description: '표정 라벨 데이터',
                                                example: 'happy',
                                            },
                                            comment: {
                                                type: 'string',
                                                description: '해당 영상에 남긴 코멘트',
                                                example: '즐거웠던 하루를 기록하다.',
                                            },
                                            thumbnailUrl: {
                                                type: 'string',
                                                description: '썸네일 이미지 S3 URL',
                                                example: 'https://s3.amazonaws.com/test.jpg',
                                            },
                                            videoUrl: {
                                                type: 'string',
                                                description: '비디오 S3 URL',
                                                example: 'https://s3.amazonaws.com/test.mp4',
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
