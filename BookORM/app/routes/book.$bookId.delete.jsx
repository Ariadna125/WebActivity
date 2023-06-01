import { redirect } from "@remix-run/node";
import { db } from "../services/index";
//Eliminamos un libro.
export async function action({ params }) {
  console.log("Delete");
  const bookId = parseInt(params.bookId);
  await db.book.delete({
    where: {
      id: bookId,
    },
  });
  //Redirigimos a la página principal.

  return redirect("/");
}
