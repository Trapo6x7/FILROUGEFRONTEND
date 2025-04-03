import AnouncesList from "@/src/components/anounces/anounceList";

export default function CategoriesPage() {
  return (
    <main className="bg-[#f9f6f1] p-10">
      <div className="flex flex-wrap gap-8 justify-center">
        <AnouncesList />
      </div>
    </main>
  );
}