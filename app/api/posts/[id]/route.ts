import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> }
) {
  //   console.log(params, "params");

  const postId = params.id;

  if (!postId) {
    return NextResponse.json({ error: "Post ID is missing" }, { status: 400 });
  }

  const post = await prisma.post.delete({
    where: { id: postId as string },
  });

  return NextResponse.json(post);
}
