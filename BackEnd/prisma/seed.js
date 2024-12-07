const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const author = await prisma.user.create({
    data: {
      username: 'author1',
      email: 'author1@example.com',
      password: 'password123',
      role: 'author',
    },
  });

  const post = await prisma.post.create({
    data: {
      title: 'My First Post',
      content: 'This is the content of the first post.',
      authorId: author.id,
    },
  });

  await prisma.comment.create({
    data: {
      content: 'Great post!',
      postId: post.id,
      username: 'reader1',
    },
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
