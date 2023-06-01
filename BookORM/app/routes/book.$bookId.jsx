import { useLoaderData, useNavigation, Form, Link } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { db } from "../services/index";
import { genres } from "../components/genres";

export async function loader({ params }) {
  const id = parseInt(params.bookId);
  const book = await db.book.findFirst({
    where: {
      id: id,
    },
  });

  return {
    data: book,
  };
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const body = Object.fromEntries(formData.entries());

  await new Promise((resolve) => setTimeout(resolve, 500));

  const bookId = parseInt(params.bookId);
  console.log(bookId);

  // update and redirect to index
  await db.book.update({
    where: {
      id: bookId,
    },
    data: {
      title: body.title,
      author: body.author,
      genre: body.genre,
    },
  });

  return redirect(`/`);
}

export default function () {
  /** @type {Awaited<ReturnType<typeof Loader>>} */
  const { data: book } = useLoaderData();
  const navigation = useNavigation();
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
            // placeholder="Title"
            className="rounded mx-10 bg-gray-100 py-2 px-4 h-10 w-18 ml-2"
            id="title"
            name="title"
            defaultValue={book.title}
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
            // placeholder="Author"
            className="rounded mx-10 bg-gray-100 py-2 px-4 h-10 w-18 ml-2"
            id="author"
            name="author"
            defaultValue={book.author}
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
            defaultValue={book.genre}
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
            className="bg-red-400 hover:bg-stone-500 text-white py-2 px-3 rounded ml-2 text-sm mb-10 "
          >
            {navigation.state !== "idle" ? "Updating" : "Update"} book
          </button>
          <Link to="/">
            <button className="bg-red-400 hover:bg-stone-500 text-white py-2 px-3 rounded ml-2 text-sm mb-10 ">
              Cancel
            </button>
          </Link>
        </Form>
      </div>
    </div>
  );
}
