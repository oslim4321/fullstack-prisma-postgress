import prisma from "@/lib/prisma";
import Posts from "./components/Posts";

const getData = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return feed;
};
export default async function Home() {
  const posts = await getData();

  return <Posts posts={posts} />;
}
