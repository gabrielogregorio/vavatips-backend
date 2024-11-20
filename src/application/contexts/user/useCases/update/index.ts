import { AppError } from '@/application/errors/AppError';
import { UpdateUserUseCaseDto, UpdateUserUseCaseInterface } from './UpdateUserUseCaseInterface';
import { UserRepositoryInterface } from '@/domain/contexts/contexts/user/repository';
import { PasswordHasherInterface } from '@/domain/contexts/services/PasswordHasherInterface';

export class UpdateUserUseCase implements UpdateUserUseCaseInterface {
  constructor(
    private userRepository: UserRepositoryInterface,
    private passwordHasher: PasswordHasherInterface,
  ) {}

  execute = async (id: string, { username, password, image }: UpdateUserUseCaseDto): Promise<void> => {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new AppError('USER_ID_NOT_FOUND', { id });
    }

    if (username) {
      const userFound = await this.userRepository.findOneByUsername(username);
      if (userFound !== null && userFound.id?.toString() !== id) {
        throw new AppError('USERNAME_ALREADY_EXISTS', {
          input: { username, id },
          db: { userId: userFound.id.getValue() },
        });
      }

      user.changeUsername(username);
    }

    if (password) {
      user.changePassword(await this.passwordHasher.generateHashPassword(password));
    }

    if (image) {
      user.changeImage(image);
    }

    return this.userRepository.update(id, user);
  };
}