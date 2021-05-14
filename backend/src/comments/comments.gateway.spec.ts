import { Test, TestingModule } from '@nestjs/testing';
import { CommentsGateway } from './comments.gateway';

describe('CommentsController', () => {
  let controller: CommentsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsGateway],
    }).compile();

    controller = module.get<CommentsGateway>(CommentsGateway);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
