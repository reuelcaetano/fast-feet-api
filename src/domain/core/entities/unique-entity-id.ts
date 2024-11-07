import { randomUUID } from 'node:crypto';

export class UniqueEntityId {
  private value: string;

  constructor(value?: string) {
    this.value = value ?? randomUUID();
  }

  get toString() {
    return this.value;
  }

  get toValue() {
    return this.value;
  }
}
