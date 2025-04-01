import AnouncesList from "@/src/components/anounces/anounceList";

export default function CategoriesPage() {
  return (
    <main className="bg-[#f9f6f1] p-10">
      <h1 className="text-3xl font-bold text-[#333333] mb-8">
        Découvrez nos annonces
      </h1>

      <div className="flex flex-wrap gap-8 justify-center">
        <AnouncesList />
      </div>
    </main>
  );
}