import { prisma } from "@/db";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tmpPageNumber: string = searchParams.get("currentPage");
  const searchValue: string = searchParams.get("searchValue");

  const currentPage: any = parseInt(tmpPageNumber);
  const postsPerPage = 10; // Number of posts per page
  const offset = (currentPage - 1) * postsPerPage;
  let items: any;
  let res: any;
  const tmpSearhValue: string = "%"+searchValue+"%";
  console.log("searchValue", tmpSearhValue);
  try {
    await prisma.$transaction(async (tx) => {
      if (searchValue == "-1") {
        const rawQuery = Prisma.sql`select i.*,c.categoryname,sc.subcategoryname,b.brandname,u.unit from items as i 
      left join categories as c on i.category = c.categoryid
      left join subcategories as sc on i.subcategory = sc.subcategoryid
      left join brands as b on i.brand = b.brandid
      left join units as u on i.unit = u.unitid limit ${postsPerPage} offset ${offset}`;
        items = await tx.$queryRaw(rawQuery);
      } else {
        const rawQuery = Prisma.sql`select i.*,c.categoryname,sc.subcategoryname,b.brandname,u.unit from items as i 
        left join categories as c on i.category = c.categoryid
        left join subcategories as sc on i.subcategory = sc.subcategoryid
        left join brands as b on i.brand = b.brandid
        left join units as u on i.unit = u.unitid where i.itemname like ${tmpSearhValue} or i.barcode like ${tmpSearhValue} limit ${postsPerPage} offset ${offset}`;
        items = await tx.$queryRaw(rawQuery);
      }

      const itemCount = await tx.items.count();

      res = { message: "SUCCESS", items, itemCount };

      return "";
    });
  } catch (error) {
    console.error("Error category:", error);
    res = { message: "FAIL" };
  }

  return NextResponse.json(res);
}

export async function POST(request: Request) {
  const {
    extraitemcode,
    barcode,
    itemname,
    category,
    subcategory,
    brand,
    retailsalesprice,
    retailautosalesprice,
    retailpricechange,
    retailmarkup,
    smallwholesalesprice,
    smallwholeautosalesprice,
    smallwholepricechange,
    smallwholemarkup,
    largewholesalesprice,
    largewholeautosalesprice,
    largewholepricechange,
    largewholemarkup,
    cost,
    stockcontrol,
    currentstock,
    stocklimit,
    unit,
    netweight,
    grossweight,
    location,
  } = await request.json();
  let tmpsubcategory: any;
  if (!subcategory) {
    tmpsubcategory = "0";
  } else {
    tmpsubcategory = subcategory;
  }
  console.log("subcategory", subcategory);
  let message: string = "SUCCESS";
  try {
    await prisma.$transaction(async (tx) => {
      await tx.items.create({
        data: {
          extraitemcode,
          barcode,
          itemname,
          category: parseInt(category),
          subcategory: parseInt(tmpsubcategory),
          brand: parseInt(brand),
          retailsalesprice,
          retailautosalesprice,
          retailpricechange,
          retailmarkup,
          smallwholesalesprice,
          smallwholeautosalesprice,
          smallwholepricechange,
          smallwholemarkup,
          largewholesalesprice,
          largewholeautosalesprice,
          largewholepricechange,
          largewholemarkup,
          cost,
          stockcontrol,
          currentstock,
          stocklimit,
          unit,
          netweight,
          grossweight,
          location,
        },
      });

      return "";
    });
  } catch (error) {
    console.error(`Error adding new item`, error);
    message = "FAIL";
  }
  return NextResponse.json(message);
}

export async function PUT(request: Request) {
  const {
    itemcode,
    extraitemcode,
    barcode,
    itemname,
    category,
    subcategory,
    brand,
    retailsalesprice,
    retailautosalesprice,
    retailpricechange,
    retailmarkup,
    smallwholesalesprice,
    smallwholeautosalesprice,
    smallwholepricechange,
    smallwholemarkup,
    largewholesalesprice,
    largewholeautosalesprice,
    largewholepricechange,
    largewholemarkup,
    cost,
    stockcontrol,
    currentstock,
    stocklimit,
    unit,
    netweight,
    grossweight,
    location,
  } = await request.json();
  let tmpsubcategory: any;
  if (!subcategory) {
    tmpsubcategory = "0";
  } else {
    tmpsubcategory = subcategory;
  }
  let message: string = "SUCCESS";
  try {
    await prisma.$transaction(async (tx) => {
      await tx.items.updateMany({
        where: { itemcode: parseInt(itemcode, 10) },
        data: {
          extraitemcode,
          barcode,
          itemname,
          category: parseInt(category),
          subcategory: parseInt(tmpsubcategory),
          brand: parseInt(brand),
          retailsalesprice,
          retailautosalesprice,
          retailpricechange,
          retailmarkup,
          smallwholesalesprice,
          smallwholeautosalesprice,
          smallwholepricechange,
          smallwholemarkup,
          largewholesalesprice,
          largewholeautosalesprice,
          largewholepricechange,
          largewholemarkup,
          cost,
          stockcontrol,
          currentstock,
          stocklimit,
          unit,
          netweight,
          grossweight,
          location,
        },
      });

      return "";
    });
  } catch (error) {
    console.error(`Error adding new item`, error);
    message = "FAIL";
  }
  return NextResponse.json(message);
}

export async function DELETE(request: Request) {
  const { itemcode } = await request.json();
  let message: string = "SUCCESS";

  try {
    await prisma.$transaction(async (tx) => {
      // 1. delete staff .
      await tx.items.delete({
        where: {
          itemcode: parseInt(itemcode),
        },
      });

      return "";
    });
  } catch (error) {
    console.error("Error deleting staff:", error);
    message = "FAIL";
  }

  return NextResponse.json(message);
}

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);

//   let items: any;
//   let res: any;
//   try {
//     items = await prisma.items.findMany({});

//     res = { message: "SUCCESS", items };
//   } catch (error) {
//     console.error("Error category:", error);
//     res = { message: "FAIL" };
//   }

//   return NextResponse.json(res);
// }
