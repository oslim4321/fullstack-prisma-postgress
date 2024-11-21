import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const res = await request.json();
  console.log(res, "res");
  const { title, content } = res;
  const result = await prisma.post.create({
    data: {
      title,
      content,
      published: true,
      author: {
        create: {
          name: "oslim",
        },
      },
    },
  });
  console.log(res);
  return NextResponse.json({ result });
}
