// import { prisma } from "@/db";
// import { NextResponse } from "next/server";

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

// export async function POST(request: Request) {
//   const {
//     extraitemcode,
//     barcode,
//     itemname,
//     category,
//     subcategory,
//     brand,
//     retailsalesprice,
//     retailautosalesprice,
//     retailpricechange,
//     retailmarkup,
//     smallwholesalesprice,
//     smallwholeautosalesprice,
//     smallwholepricechange,
//     smallwholemarkup,
//     largewholesalesprice,
//     largewholeautosalesprice,
//     largewholepricechange,
//     largewholemarkup,
//     cost,
//     stockcontrol,
//     currentstock,
//     stocklimit,
//     unit,
//     netweight,
//     grossweight,
//     location,
//   } = await request.json();
//   let tmpsubcategory: any;
//   if (!subcategory) {
//     tmpsubcategory = "0";
//   } else {
//     tmpsubcategory = subcategory;
//   }
//   console.log("subcategory", subcategory);
//   let message: string = "SUCCESS";
//   try {
//     await prisma.$transaction(async (tx) => {
//       await tx.items.create({
//         data: {
//           extraitemcode,
//           barcode,
//           itemname,
//           category: parseInt(category),
//           subcategory: parseInt(tmpsubcategory),
//           brand: parseInt(brand),
//           retailsalesprice,
//           retailautosalesprice: retailautosalesprice.toString(),
//           retailpricechange: retailpricechange.toString(),
//           retailmarkup,
//           smallwholesalesprice,
//           smallwholeautosalesprice: smallwholeautosalesprice.toString(),
//           smallwholepricechange: smallwholepricechange.toString(),
//           smallwholemarkup,
//           largewholesalesprice,
//           largewholeautosalesprice: largewholeautosalesprice.toString(),
//           largewholepricechange: largewholepricechange.toString(),
//           largewholemarkup,
//           cost,
//           stockcontrol: stockcontrol.toString(),
//           currentstock,
//           stocklimit,
//           unit,
//           netweight,
//           grossweight,
//           location,
//         },
//       });

//       return "";
//     });
//   } catch (error) {
//     console.error(`Error adding new item`, error);
//     message = "FAIL";
//   }
//   return NextResponse.json(message);
// }

// export async function PUT(request: Request) {
//   const { inputvalueid, inputvalue, title } = await request.json();
//   let message: string = "SUCCESS";
//   try {
//     await prisma.$transaction(async (tx) => {
//       // 1. addnew category for geader table.
//       switch (title) {
//         case "Category":
//           await tx.categories.updateMany({
//             where: { categoryid: parseInt(inputvalueid) },
//             data: {
//               categoryname: inputvalue,
//             },
//           });
//           break;
//         case "Brand":
//           await tx.brands.updateMany({
//             where: { brandid: parseInt(inputvalueid) },
//             data: {
//               brandname: inputvalue,
//             },
//           });
//           break;
//         case "Unit":
//           await tx.units.updateMany({
//             where: { unitid: parseInt(inputvalueid) },
//             data: {
//               unit: inputvalue,
//             },
//           });
//           break;
//         case "Subcategory":
//           await tx.subcategories.updateMany({
//             where: { subcategoryid: parseInt(inputvalueid) },
//             data: {
//               subcategoryname: inputvalue,
//             },
//           });
//           break;
//         default:
//           "";
//       }
//       // const response = await tx.categories.updateMany({
//       //   where: { categoryid: parseInt(inputvalueid) },
//       //   data: {
//       //     categoryname: inputvalue,
//       //   },
//       // });

//       return "";
//     });
//   } catch (error) {
//     console.error(`Error updating ${title}`, error);
//     message = "FAIL";
//   }
//   return NextResponse.json(message);
// }

// // export async function PUT(request: Request) {
// //     const { categoryid, categoryname, categoryValues } = await request.json();
// //     let message: string = "SUCCESS"

// //     try {
// //         await prisma.$transaction(async (tx) => {
// //             // 1. update category.
// //             const updateCategory = await tx.categories.updateMany({
// //                 where: { categoryid },
// //                 data: {
// //                   categoryname
// //                 },
// //               });

// //             // 2. update category details.
// //             for (let i = 0; i < categoryValues.length; i++) {
// //                 const element = categoryValues[i];
// //                 if (element.categorydetailid) {
// //                   const tmpCatDetailId = element.categorydetailid;
// //                   await tx.categorydetails.updateMany({
// //                     where: { categorydetailid: tmpCatDetailId },
// //                     data: {
// //                       categorydetailname: element.categorydetailname
// //                     },
// //                   });
// //                 } else {
// //                   await prisma.categorydetails.create({
// //                     data: {
// //                       categoryid: categoryid,
// //                       categorydetailname: element.categorydetailname,
// //                     },
// //                   });
// //                 }

// //               }

// //             return ""
// //         })
// //     } catch (error) {
// //         console.error('Error updating category:', error);
// //         message = "FAIL"
// //     }
// //     return NextResponse.json(message)
// // }

// // export async function DELETE(request: Request) {
// //     const { categoryid, categoryValues } = await request.json();

// //     let message: string = "SUCCESS"

// //     try {
// //         await prisma.$transaction(async (tx) => {
// //             // 1. delete category.
// //             await tx.categories.delete({
// //                 where: {
// //                   categoryid
// //                 },
// //               })

// //             // 2. delete category details.
// //             for (let i = 0; i < categoryValues.length; i++) {
// //                 const element = categoryValues[i];
// //                 await tx.categorydetails.delete({
// //                     where: {
// //                       categorydetailid : element.categorydetailid
// //                     },
// //                 })
// //             }
// //             return ""
// //         })
// //     } catch (error) {
// //         console.error('Error deleting category', error);
// //         message = "FAIL"
// //     }

// //     return NextResponse.json(message)
// // }
