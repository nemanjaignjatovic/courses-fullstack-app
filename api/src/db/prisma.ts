import { PrismaClient } from '@prisma/client';

/*
  PrismaClient is the single object our backend uses to talk to the database.

  Keeping it in one shared file gives the whole app one consistent database
  access point. Routes and middleware import this client instead of creating
  their own PrismaClient instances.
*/
export const prisma = new PrismaClient();
