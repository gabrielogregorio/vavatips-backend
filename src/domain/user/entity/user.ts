import { Entity } from '@/domain/common/entity/entity.abstract';
import { NotificationError } from '@/domain/common/notification/notification.error';
import { UniqueIdGenerator } from '@/domain/common/utils/UniqueIdGenerator';
import { UserEntityInterface } from '@/domain/user/entity/user.interface';
import { UserValidatorFactory } from '@/domain/user/factory/user.validator';

type UserEntityDto = {
  id: string;
  username: string;
  password: string;
};

type UserEntityCreateDto = {
  username: string;
  password: string;
};

type UserEntityRestoreDto = {
  id: string;
  username: string;
  password: string;
};

export class UserEntity extends Entity implements UserEntityInterface {
  private _id: string;

  private _username: string;

  private _password: string;

  private _image: string;

  private constructor({ id = UniqueIdGenerator.generate(), username = '', password = '' }: UserEntityDto) {
    super();
    this._id = id;
    this._username = username;
    this._password = password;
    this._image = '';

    this.validate();
  }

  public static create({ password, username }: UserEntityCreateDto) {
    return new UserEntity({
      id: UniqueIdGenerator.generate(),
      username,
      password,
    });
  }

  public static restore({ password, username, id }: UserEntityRestoreDto) {
    return new UserEntity({
      id,
      username,
      password,
    });
  }

  public changePassword(password: string) {
    this._password = password;
    this.validate();
  }

  public changeImage(image: string) {
    this._image = image;
    this.validate();
  }

  public changeUsername(username: string) {
    this._username = username;
    this.validate();
  }

  get id() {
    return this._id;
  }

  get image() {
    return this._image;
  }

  get username() {
    return this._username;
  }

  get password() {
    return this._password;
  }

  validate() {
    UserValidatorFactory.create().validate(this);

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }
}
