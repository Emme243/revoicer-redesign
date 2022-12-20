import { faker } from '@faker-js/faker';
import { ISpeaker } from '../intefaces/Speaker';

export const SPEAKERS: ISpeaker[] = Array.from({ length: 100 }, (_, i) => ({
  description: faker.lorem.paragraph(),
  isAvailableOnProPlan: faker.datatype.boolean(),
  name: faker.name.fullName(),
  picture: faker.image.avatar(),
}));
