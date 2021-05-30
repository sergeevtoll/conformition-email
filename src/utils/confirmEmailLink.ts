import { redis } from './../redis';
import { v4 } from 'uuid';

export const confirmEmailLink = async (userId: string):Promise<string> => {
  const id = v4()

  await redis.set(id, userId, 'ex', 60*15 )

  return `http://localhost:3000/user/confirm/${id}`
};
