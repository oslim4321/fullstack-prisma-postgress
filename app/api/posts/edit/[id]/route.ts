import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { params }: { params: any }
) {
  const body = await request.json();

  const postId = params.id;
  if (!postId) {
    return NextResponse.json({ error: "Post ID is missing" }, { status: 400 });
  }

  const post = await prisma.post.update({
    where: { id: String(postId) },
    data: {
      title: body.title,
      content: body.content,
      published: body.published,
    },
  });

  return NextResponse.json(post);
}
