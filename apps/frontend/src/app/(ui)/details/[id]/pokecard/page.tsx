"use server";

import { NextPage } from "next";

const Page: NextPage<{
  params: Promise<{ id: string }>;
}> = async ({ params }) => {
  const { id } = await params;

  // Fetch Pokémon cards from API based on label
  const cardsResponse = await fetch(
    `https://api.pokemontcg.io/v2/cards?q=name:${id}`,
    {
      cache: "force-cache",
    },
  );

  if (!cardsResponse.ok) {
    throw new Error(
      `Erreur lors de la requête des cartes : ${cardsResponse.statusText}`,
    );
  }

  const cardsData = await cardsResponse.json();
  const cards: Array<{ id: string; images: { small: string }; name: string }> =
    cardsData.data || [];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map(
        (card: { id: string; images: { small: string }; name: string }) => (
          <div
            key={card.id}
            className="flex flex-col items-center bg-white rounded-lg shadow-md overflow-hidden p-4"
          >
            <img
              src={card.images.small}
              alt={card.name}
              className="w-full h-auto object-cover rounded-md border border-gray-200 shadow-md"
            />
            <p className="text-sm font-medium mt-2 text-center">{card.name}</p>
          </div>
        ),
      )}
    </div>
  );
};

export default Page;
