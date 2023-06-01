import { redirect } from "@remix-run/node";
import { db } from "../services/index";

export async function action({ params }) {
  console.log("Delete");
  const bookId = parseInt(params.bookId);
  await db.book.delete({
    where: {
      id: bookId,
    },
  });
  return redirect("/");
}
