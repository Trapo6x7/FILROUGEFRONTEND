import CategoriesList from "@/src/components/categories/categoriesList";


export default function CategoriesPage() {
  return (
    <main className="flex flex-col items-center justify-between p-6 md:p-24">
      <h1 className="mb-8">Explorer notre collection</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <CategoriesList />
      </div>
    </main>
  );
}
