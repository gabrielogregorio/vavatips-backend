import { AppError } from '@/errors/index';
import { ErrorEnum } from '@/errors/types';
import { IPost } from '@/interfaces/post';
import { PostRepository } from '@/repositories/postRepository';

export class PostService {
  private postRepository: PostRepository;

  constructor(postRepository: PostRepository) {
    this.postRepository = postRepository;
  }

  create = async ({ title, description, user, tags, imgs }: IPost): Promise<IPost> =>
    this.postRepository.create({ title, description, user, tags, imgs });

  findByIdAndUpdate = async (id: string, { title, description, user, tags, imgs }: IPost): Promise<IPost> => {
    const post = await this.postRepository.findByIdAndUpdate(id, { title, description, user, tags, imgs });
    if (!post) {
      throw new AppError(ErrorEnum.RESOURCE_NOT_EXISTS, 404);
    }

    return post;
  };

  findById = async (id: string): Promise<IPost> => {
    const post = await this.postRepository.findById(id);
    if (!post) {
      throw new AppError(ErrorEnum.RESOURCE_NOT_EXISTS, 404);
    }

    return post;
  };

  findAvailableMaps = async (): Promise<string[]> => this.postRepository.findAvailableMaps();

  findAvailableAgents = async (map: string): Promise<string[]> => this.postRepository.findAvailableAgents(map);

  FindAll = async (): Promise<IPost[]> => this.postRepository.findAll();

  FindAllByMapAndAgent = async (agent: string, map: string): Promise<IPost[]> =>
    this.postRepository.findAllByMapAndAgent(agent, map);

  DeleteById = async (idPost: string): Promise<any> => this.postRepository.deleteById(idPost);
}
