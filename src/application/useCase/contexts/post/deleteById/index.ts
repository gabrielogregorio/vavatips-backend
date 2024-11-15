import { AppError } from '@/application/errors/AppError';
import { DeletePostUseCaseInterface } from './DeletePostUseCaseInterface';
import { PostRepositoryInterface } from '@/domain/contexts/contexts/post/repository';

export class DeletePostUseCase implements DeletePostUseCaseInterface {
  constructor(private postRepository: PostRepositoryInterface) {}

  execute = async (idPost: string, userId: string): Promise<void> => {
    const post = await this.postRepository.findById(idPost);
    if (!post) {
      throw new AppError('POST_NOT_EXISTS', { idPost, userId });
    }

    const postIsNotYours = !post?.userId || !userId || post?.userId.getValue() !== userId;
    if (postIsNotYours) {
      throw new AppError('NO_CAN_DELETE_POST_ANOTHER_USER', {
        input: { userId, idPost },
        db: {
          postId: post?.id?.getValue() ? post.id?.getValue() : undefined,
          userId: post?.userId?.getValue() ? post.userId?.getValue() : undefined,
        },
      });
    }

    this.postRepository.deleteById(idPost);
  };
}
