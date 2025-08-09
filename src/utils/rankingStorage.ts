export interface RankingEntry {
  playerName: string;
  difficulty: "easy" | "hard";
  timeInSeconds: number;
  date: string;
}

const RANKING_KEY = "wordSearchRanking";

export function getRanking(): RankingEntry[] {
  try {
    const storedRanking = localStorage.getItem(RANKING_KEY);
    return storedRanking ? JSON.parse(storedRanking) : [];
  } catch (error) {
    console.error("Failed to load ranking from localStorage:", error);
    return [];
  }
}

export function addRankingEntry(newEntry: RankingEntry): void {
  let currentRanking = getRanking();

  // Check if an entry for this player and difficulty already exists
  const existingIndex = currentRanking.findIndex(
    (entry) =>
      entry.playerName === newEntry.playerName &&
      entry.difficulty === newEntry.difficulty
  );

  if (existingIndex !== -1) {
    // If existing, update only if new time is better
    if (newEntry.timeInSeconds < currentRanking[existingIndex].timeInSeconds) {
      currentRanking[existingIndex] = newEntry;
    }
  } else {
    // If not existing, add new entry
    currentRanking.push(newEntry);
  }

  const updatedRanking = currentRanking
    .sort((a, b) => a.timeInSeconds - b.timeInSeconds) // Sort by time (lower is better)
    .slice(0, 5); // Keep only the top 5

  try {
    localStorage.setItem(RANKING_KEY, JSON.stringify(updatedRanking));
  } catch (error) {
    console.error("Failed to save ranking to localStorage:", error);
  }
}

export function clearRanking(): void {
  try {
    localStorage.removeItem(RANKING_KEY);
  } catch (error) {
    console.error("Failed to clear ranking from localStorage:", error);
  }
}