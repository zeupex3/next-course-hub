import BandCard from "../components/BandCard";
import { bands } from "../data/bandData";

export default function BandsPage() {
  return (
    <main className="page">
      <h1>My Favorite Bands</h1>
      
      <section className="courseGrid">
        {bands.map((band) => (
          <BandCard key={band.id} band={band} />
        ))}
      </section>
    </main>
  );
}