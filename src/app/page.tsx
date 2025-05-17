import MainClock from "@/components/MainClock";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="mx-8">
      <Navbar />
      <main>
        <MainClock />
      </main>
    </div>
  );
}
