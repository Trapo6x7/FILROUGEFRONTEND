import BookCard from "@/src/components/books/book-card";
import BooksList from "@/src/components/books/bookList";


export const metadata = {
  title: "Explorer les livres | BookMarket",
  description:
    "Parcourez notre catalogue de livres et trouvez votre prochaine lecture préférée",
};

export default function BooksPage() {
  return (
    <main className="flex flex-col items-center justify-between p-6 md:p-24">
      <h1 className="mb-8">Explorer notre collection</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <BooksList />
      </div>
    </main>
  );
}
