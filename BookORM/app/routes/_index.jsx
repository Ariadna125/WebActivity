import { useLoaderData } from "@remix-run/react";
import { db } from "../services/index";
import { Link, Form } from "@remix-run/react";

export async function loader() {
  const books = await db.book.findMany();
  return {
    data: books,
  };
}

export default function Index() {
  const { data: books } = useLoaderData();
  return (
    <div>
      <h1 className="basis-1 mx-1 text-center font-monserrat text-red-400 text-4xl ml-5xt-lg mt-5 mb-5 mr-5">
        Welcome to your personal Library
      </h1>
      <p className="basis-1/3 mx-10 relative place-items-left h-5 text-sm text-center mt-2 text-slate-500 mr-16">
        Register all the books that are part of your life.
      </p>

      <div className="flex justify-start mb-10">
        <Link
          to="/create"
          className="mx-5 bg-red-400 hover:bg-stone-500 text-white py-2 px-5 rounded items-center"
        >
          Create a book
        </Link>
      </div>

      <div className="flex mb-3 bg-red-400 text-white">
        <p className="w-1/4 mx-4 rounded py-2 px-20 grow h-10 flex items-center">
          Title
        </p>
        <p className="w-1/4 mx-2 rounded py-2 px-2 grow h-10 flex items-center">
          Author
        </p>
        <p className="w-1/4 mx-2 rounded py-2 px-4 grow h-10 flex items-center">
          Genre
        </p>
      </div>

      {books.map((book) => (
        <div key={book.id} className="flex items-center mb-3">
          <p className="w-1/4 mx-4 rounded bg-white py-2 px-10 grow h-10 flex items-center">
            {book.title}
          </p>
          <p className="w-1/4 mx-2 rounded bg-white py-2 px-10 grow h-10 flex items-center">
            {book.author}
          </p>
          <p className="w-1/4 mx-2 rounded bg-white py-2 px-10 grow h-10 flex items-center">
            {book.genre}
          </p>
          <div className="flex ml-auto">
            <Link to={`/book/${book.id}`}>
              <button className="bg-red-400 hover:bg-stone-500 text-white py-2 px-3 rounded items-center ml-2 text-sm">
                Edit
              </button>
            </Link>
            <Form method="post">
              <button
                type="submit"
                formAction={`/book/${book.id}/delete`}
                className="bg-red-400 hover:bg-stone-500 text-white py-2 px-3 rounded items-center ml-2 text-sm mr-5"
              >
                Delete
              </button>
            </Form>
          </div>
        </div>
      ))}
    </div>
  );
}
