import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type SeedUser = {
  id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
};

type SeedCourse = {
  id: number;
  userId: number;
  title: string;
  description: string;
  estimatedTime: string;
  materialsNeeded: string;
};

const seedUsers: SeedUser[] = [
  {
    id: 1,
    firstName: 'Joe',
    lastName: 'Smith',
    emailAddress: 'joe@smith.com',
    password: 'joepassword'
  },
  {
    id: 2,
    firstName: 'Sally',
    lastName: 'Jones',
    emailAddress: 'sally@jones.com',
    password: 'sallypassword'
  }
];

const seedCourses: SeedCourse[] = [
  {
    id: 1,
    userId: 1,
    title: 'Build a Basic Bookcase',
    description: `High-end furniture projects are great to dream about. But unless you have a well-equipped shop and some serious woodworking experience to draw on, it can be difficult to turn the dream into a reality.

Not every piece of furniture needs to be a museum showpiece, though. Often a simple design does the job just as well and the experience gained in completing it goes a long way toward making the next project even better.

Our pine bookcase, for example, features simple construction and it is designed to be built with basic woodworking tools.`,
    estimatedTime: '12 hours',
    materialsNeeded: '* 1/2 x 3/4 inch parting strip\n* 1 x 2 common pine\n* 1 x 4 common pine\n* 1 x 10 common pine\n* 1/4 inch thick lauan plywood\n* Finishing Nails\n* Sandpaper\n* Wood Glue\n* Wood Filler\n'
  },
  {
    id: 2,
    userId: 2,
    title: 'Learn How to Program',
    description: "In this course, you will learn how to write code like a pro!",
    estimatedTime: '6 hours',
    materialsNeeded: '* Notebook computer running Mac OS X or Windows\n* Text editor'
  },
  {
    id: 3,
    userId: 2,
    title: 'Learn How to Test Programs',
    description: 'In this course, you will learn how to test programs.',
    estimatedTime: '',
    materialsNeeded: ''
  },
  {
    id: 4,
    userId: 1,
    title: 'Debugging 101',
    description: 'An introduction to testing and debugging your code.',
    estimatedTime: '4 hours',
    materialsNeeded: '* Notebook computer running Mac OS X or Windows\n* Text editor'
  }
];

async function main(): Promise<void> {
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  for (const user of seedUsers) {
    const passwordHash = await bcrypt.hash(user.password, 10);

    await prisma.user.create({
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress,
        password: passwordHash
      }
    });
  }

  for (const course of seedCourses) {
    await prisma.course.create({ data: course });
  }

  console.log('Database seeded successfully.');
}

main()
  .catch(error => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
