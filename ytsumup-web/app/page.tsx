import SearchBar from "./SearchBar";

export default function Home() {
  return (
    <main className="bg-black">
      <header className="h-[112px] bg-red-700 flex items-center justify-center">
        <SearchBar />
      </header>
    </main>
  );
}
