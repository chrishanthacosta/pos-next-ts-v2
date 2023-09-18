import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const itemcode: any = searchParams.get("item-code");
  let res: any;
  try {
    const itemData = await prisma.items.findMany({
      where: {
        itemcode: parseInt(itemcode),
      },
    });
    res = { message: "SUCCESS", itemData };
  } catch (error) {
    console.error("Error items", error);
    res = { message: "FAIL" };
  }

  return NextResponse.json(res);
}
