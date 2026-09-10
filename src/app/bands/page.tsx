import BandExplorer from "../components/BandExplorer.tsx";
import { bands } from "../data/bandData";

export const metadata = {
  title: "My Favorite Bands",
};

export default function BandsPage() {
  return (
    <main className="page" style={{ padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>
        My Favorite Bands
      </h1>
      <BandExplorer bands={bands} />
    </main>
  );
}