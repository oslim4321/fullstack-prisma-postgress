import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export interface DeleteParams {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: any;
}

export async function DELETE(request: NextRequest, { params }: DeleteParams) {
  const postId = params.id;

  if (!postId) {
    return NextResponse.json({ error: "Post ID is missing" }, { status: 400 });
  }

  const post = await prisma.post.delete({
    where: { id: postId },
  });

  return NextResponse.json(post);
}
