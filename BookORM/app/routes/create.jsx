import { redirect } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { db } from "../services/index";

export const genres = [
  "Action and Adventure",
  "Classics",
  "Comic Book or Graphic Novel",
  "Detective and Mystery",
  "Fantasy",
  "Historical Fiction",
  "Horror",
  "Literary Fiction",
  "Romance",
  "Science Fiction (Sci-Fi)",
  "Short Stories",
  "Suspense and Thrillers",
];

export async function action({ request }) {
  const formData = await request.formData();
  const body = Object.fromEntries(formData.entries());

  await db.book.create({
    data: {
      title: body.title,
      author: body.author,
      genre: body.genre,
    },
  });

  return redirect("/");
}

export default function () {
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <h1 className="text-center text-red-400 text-4xl mt-5 mb-5">Create</h1>
        <Form method="post">
          <label
            htmlFor="title"
            className="flex justify-end items-center h-14 rounded-lg text-red-400 font-semibold text-base"
          >
            Title
          </label>
          <input
            type="text"
            placeholder="Title"
            className="rounded mx-10 bg-gray-100 py-2 px-4 h-10 w-18 ml-2"
            id="title"
            name="title"
            required
          />
          <label
            htmlFor="author"
            className="flex justify-end items-center h-14 rounded-lg text-red-400 font-semibold text-base"
          >
            Author
          </label>
          <input
            type="text"
            placeholder="Author"
            className="rounded mx-10 bg-gray-100 py-2 px-4 h-10 w-18 ml-2"
            id="author"
            name="author"
            required
          />
          <label
            htmlFor="genre"
            className="flex justify-end items-center h-14 rounded-lg text-red-400 font-semibold text-base"
          >
            Genre
          </label>
          <select
            id="genre"
            name="genre"
            className="rounded mx-10 bg-gray-100 py-2 px-4 h-10 w-18 ml-2"
            required
          >
            <option value="">Select a genre</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-red-400 hover:bg-stone-500 text-white py-2 px-3 rounded ml-2 text-sm mb-10"
          >
            Submit
          </button>
          <Link to="/">
            <button className="bg-red-400 hover:bg-stone-500 text-white py-2 px-3 rounded ml-2 text-sm mb-10">
              Cancel
            </button>
          </Link>
        </Form>
      </div>
    </div>
  );
}
