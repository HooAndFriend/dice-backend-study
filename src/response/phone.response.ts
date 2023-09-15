import {
  createErrorResponse,
  createMessageResponse,
  createSuccessResponse,
} from './common';

export const PhoneResponse = {
  savePhone: {
    200: createMessageResponse({
      message: '전화번호를 생성합니다.',
      statusCode: 200,
    }),
    400: createErrorResponse({
      statusCode: 400,
      message: '이미 존재하는 번호 입니다.',
      error: 'BAD REQUEST',
    }),
  },
  findAll: {
    200: createSuccessResponse({
      data: {
        data: [
          {
            createdAt: '2023-09-10T15:56:12.203Z',
            id: 1,
            name: '김주만',
            number: '01057027017',
          },
        ],
        count: 1,
      },
      statusCode: 200,
      message: '전화번호를 전체 조회합니다.',
    }),
  },
  findPhone: {
    200: createSuccessResponse({
      data: {
        data: {
          createdAt: '2023-09-10T15:56:12.203Z',
          id: 1,
          name: '김주만',
          number: '01057027017',
        },
      },
      statusCode: 200,
      message: '전화번호를 조회합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: '전화번호를 찾을 수 없습니다.',
      error: 'NOT FOUND',
    }),
  },
  updatePhone: {
    200: createMessageResponse({
      statusCode: 200,
      message: '전화번호를 조회합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: '전화번호를 찾을 수 없습니다.',
      error: 'NOT FOUND',
    }),
  },
  deletePhone: {
    200: createMessageResponse({
      statusCode: 200,
      message: '전화번호를 조회합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: '전화번호를 찾을 수 없습니다.',
      error: 'NOT FOUND',
    }),
  },
};
