const BASE_URL = "https://fed-team.modyo.cloud/api/";

export async function getAnimals() {
  const response = await fetch(
    `${BASE_URL}/content/spaces/animals/types/game/entries?per_page=20`
  );
  const data = await response.json();
  return data;
}
