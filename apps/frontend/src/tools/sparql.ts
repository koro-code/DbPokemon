"use server";

const queryUrl = async (query: string) =>
  `${process.env.SPARQL_ENDPOINT}?query=${encodeURIComponent(query)}&should-sponge=&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on`;

export const fetchSparql = async <
  T = Array<
    Record<
      string,
      {
        value: string;
      }
    >
  >,
>(
  query: string,
) => {
  const response = await fetch(await queryUrl(query), {
    cache: "force-cache",
  });

  const json = await response.json();

  return json.results.bindings as T;
};
