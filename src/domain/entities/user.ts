import { Entity } from '../core/entities/entity';
import { UniqueEntityId } from '../core/entities/unique-entity-id';
import { Optional } from '../core/types/optional';

interface UserProps {
  cpf: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export class User extends Entity<UserProps> {
  static create(props: Optional<UserProps, 'createdAt'>, id?: UniqueEntityId) {
    const user = new User(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    );

    return user;
  }

  get cpf() {
    return this.cpf;
  }

  get password() {
    return this.password;
  }

  get createdAt() {
    return this.createdAt;
  }

  get updateAt() {
    return this.updateAt;
  }
}
