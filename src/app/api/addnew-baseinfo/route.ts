import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title: any = searchParams.get("title");
  const category: any = searchParams.get("category");
  console.log("category", category);
  let fetchData: any;
  let res: any;
  try {
    switch (title) {
      case "Category":
        fetchData = await prisma.categories.findMany({});
        break;
      case "Brand":
        fetchData = await prisma.brands.findMany({});
        break;
      case "Unit":
        fetchData = await prisma.units.findMany({});
        break;
      case "Subcategory":
        fetchData = await prisma.subcategories.findMany({
          where: { categoryid: parseInt(category) },
        });
        break;
      default:
        "";
    }
    // const categories = await prisma.categories.findMany({});
    res = { message: "SUCCESS", fetchData };
  } catch (error) {
    console.error("Error category:", error);
    res = { message: "FAIL" };
  }

  return NextResponse.json(res);
}

export async function POST(request: Request) {
  const { inputvalue, baseinfoType, curparentbaseinfoId } = await request.json();
  // console.log("type", parentbaseinfoId);
  // let message: string = "SUCCESS";
  let res: any;
  let savedDate: any;
  let curId: any;
  let curValue: any;
  try {
    await prisma.$transaction(async (tx) => {
      switch (baseinfoType) {
        case "Category":
          savedDate = await tx.categories.create({
            data: {
              categoryname: inputvalue,
            },
          });
          curId = savedDate.categoryid;
          curValue = savedDate.categoryname;
          res = { message: "SUCCESS", curId, curValue };
          break;
        case "Brand":
          savedDate = await tx.brands.create({
            data: {
              brandname: inputvalue,
            },
          });
          curId = savedDate.brandid;
          res = { message: "SUCCESS", curId };
          break;
        case "Unit":
          savedDate = await tx.units.create({
            data: {
              unit: inputvalue,
            },
          });
          curId = savedDate.unitid;
          res = { message: "SUCCESS", curId };
          break;
        case "Subcategory":
          savedDate = await tx.subcategories.create({
            data: {
              categoryid: parseInt(curparentbaseinfoId),
              subcategoryname: inputvalue,
            },
          });
          curId = savedDate.subcategoryid;
          res = { message: "SUCCESS", curId };
          break;
        default:
          "";
      }

      return "";
    });
  } catch (error) {
    console.error(`Error adding new ${baseinfoType}`, error);
    res = { message: "FAIL" };
  }
  console.log("res", res);
  return NextResponse.json(res);
}

export async function PUT(request: Request) {
  const { inputvalueid, inputvalue, baseinfoType, parentbaseinfoId } =
    await request.json();
  let message: string = "SUCCESS";
  try {
    await prisma.$transaction(async (tx) => {
      // 1. addnew category for geader table.
      switch (baseinfoType) {
        case "Category":
          await tx.categories.updateMany({
            where: { categoryid: parseInt(inputvalueid) },
            data: {
              categoryname: inputvalue,
            },
          });
          break;
        case "Brand":
          await tx.brands.updateMany({
            where: { brandid: parseInt(inputvalueid) },
            data: {
              brandname: inputvalue,
            },
          });
          break;
        case "Unit":
          await tx.units.updateMany({
            where: { unitid: parseInt(inputvalueid) },
            data: {
              unit: inputvalue,
            },
          });
          break;
        case "Subcategory":
          await tx.subcategories.updateMany({
            where: { subcategoryid: parseInt(inputvalueid) },
            data: {
              subcategoryname: inputvalue,
            },
          });
          break;
        default:
          "";
      }
      // const response = await tx.categories.updateMany({
      //   where: { categoryid: parseInt(inputvalueid) },
      //   data: {
      //     categoryname: inputvalue,
      //   },
      // });

      return "";
    });
  } catch (error) {
    console.error(`Error updating ${baseinfoType}`, error);
    message = "FAIL";
  }
  return NextResponse.json(message);
}

// export async function PUT(request: Request) {
//     const { categoryid, categoryname, categoryValues } = await request.json();
//     let message: string = "SUCCESS"

//     try {
//         await prisma.$transaction(async (tx) => {
//             // 1. update category.
//             const updateCategory = await tx.categories.updateMany({
//                 where: { categoryid },
//                 data: {
//                   categoryname
//                 },
//               });

//             // 2. update category details.
//             for (let i = 0; i < categoryValues.length; i++) {
//                 const element = categoryValues[i];
//                 if (element.categorydetailid) {
//                   const tmpCatDetailId = element.categorydetailid;
//                   await tx.categorydetails.updateMany({
//                     where: { categorydetailid: tmpCatDetailId },
//                     data: {
//                       categorydetailname: element.categorydetailname
//                     },
//                   });
//                 } else {
//                   await prisma.categorydetails.create({
//                     data: {
//                       categoryid: categoryid,
//                       categorydetailname: element.categorydetailname,
//                     },
//                   });
//                 }

//               }

//             return ""
//         })
//     } catch (error) {
//         console.error('Error updating category:', error);
//         message = "FAIL"
//     }
//     return NextResponse.json(message)
// }

// export async function DELETE(request: Request) {
//     const { categoryid, categoryValues } = await request.json();

//     let message: string = "SUCCESS"

//     try {
//         await prisma.$transaction(async (tx) => {
//             // 1. delete category.
//             await tx.categories.delete({
//                 where: {
//                   categoryid
//                 },
//               })

//             // 2. delete category details.
//             for (let i = 0; i < categoryValues.length; i++) {
//                 const element = categoryValues[i];
//                 await tx.categorydetails.delete({
//                     where: {
//                       categorydetailid : element.categorydetailid
//                     },
//                 })
//             }
//             return ""
//         })
//     } catch (error) {
//         console.error('Error deleting category', error);
//         message = "FAIL"
//     }

//     return NextResponse.json(message)
// }
