import { useEffect,  useState } from "react";
import { PokemonCard } from "../components/PokemonCard";
import { ViewPokemon } from "../components/PokemonView";
import { BASE_URL } from "../PokemonColorUtils";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ThemeModal } from "../components/ThemeModal";
import { Pagination } from "../components/Pagination";
import { CustomSelect } from "../components/CustomSelect";

export function ListPokemon() {
  const [selPoke, setSelPoke] = useState<string | null>(null);
  const [pokePerPage, setPokePerPage] = useState(8);
  const [pokePages, setPokePages] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const { isPending, error, data } = useQuery({
    queryKey: ["selPoke", name],
    queryFn: () =>
      fetch(`${BASE_URL}/pokemon?offset=0&limit=500`).then((res) => res.json()),
  });

  useEffect(() => {
    if (data) {
      const fetchedPoke = data.results;
      const result = [];
      for (let i = 0; i < fetchedPoke.length; i += pokePerPage) {
        result.push(fetchedPoke.slice(i, i + pokePerPage));
      }
      setPokePages(result);
    }
  }, [data, pokePerPage]);

  const handlePokePerPage = (option: number) => {
    const indexInView = (currentPage - 1) * pokePerPage;
    setPokePerPage(option);
    setCurrentPage(Math.floor(indexInView / option) + 1);
  };

  if (error) {
    return <p className="text-red-500 text-sm">Something went wrong</p>;
  }

  return (
    <div className="relative w-full h-full bg-white overflow-hidden">
      <div className="absolute z-0 h-full w-full bg-[url('/noise.png')] opacity-[0.1]"></div>

      <header className="fixed top-0 left-0 w-full bg-white bg-opacity-70 z-50 shadow-lg">
        <nav className="flex items-center justify-between py-2 px-4 z-[999] overflow-y-visible h-20 max-w-[1300px] mx-auto">
          <Link to="/" className="flex gap-1 items-center z-50">
            <img src="./home_image.png" className="w-28 mt-6" alt="Home" />
            <h4 className="font-bold text-3xl hidden sm:block font-[ClashDisplay-Variable]">
              Poké <span className="text-[var(--primary-color)]">book</span>
            </h4>
          </Link>
          <div className="relative">
            <div className="h-12 w-12 top-1/2 -translate-y-1/2 flex justify-center items-center absolute left-1">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Search SVG Path */}
              </svg>
            </div>
            <input
              type="text"
              placeholder="Enter pokemon name"
              className="min-w-0 w-[min(500px,50vw)] pl-10 text-xl shadow-md rounded-full border border-[#E1E1E1] outline-none bg-transparent py-2"
            />
          </div>
          <button
            onClick={() => setShowThemeModal(true)}
            className="rounded-full h-[45px] w-[45px] z-50 outline-1 outline outline-[#868686] border-[4px] border-white bg-[var(--primary-color)] p-1"
          ></button>
          {showThemeModal && (
            <ThemeModal closeModal={() => setShowThemeModal(false)} />
          )}
        </nav>
      </header>
      {selPoke && (
        <ViewPokemon name={selPoke} closeModal={() => setSelPoke(null)} />
      )}
      <main className="absolute top-20 left-0 py-6 w-full h-[calc(100%-80px)] pb-20 bg-gray-200 bg-opacity-30 overflow-y-auto z-1">
        <div className="p-10 max-w-[1100px] mx-auto h-full">
          {isPending && <p>Loading...</p>}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12">
            {pokePages[currentPage - 1] &&
              pokePages[currentPage - 1].map((pokemon: any) => (
                <PokemonCard
                  name={pokemon.name}
                  key={pokemon.name}
                  id={pokemon.url.split("/")[6]}
                  handleView={(name) => setSelPoke(name)}
                />
              ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-8 sm:justify-between mt-16 pb-32">
            <Pagination
              numPages={pokePages.length}
              currentPage={currentPage}
              onChanged={(page) => setCurrentPage(page)}
            />
            <CustomSelect onChanged={(option) => handlePokePerPage(option)} />
          </div>
        </div>
      </main>
    </div>
  );
}



