import HeaderBlue from "@/components/HeaderBlue";
import ClockTitle from "@/components/ClockTitle";
import RateCards from "@/components/RateCards";
import TierBox from "@/components/TierBox";
import NoteFooter from "@/components/NoteFooter";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeaderBlue />
      <div className="max-w-6xl mx-auto px-4">
        <ClockTitle title="Tỷ giá quy đổi tại Meilian.xyz" />
        <RateCards />
        <div className="mt-10"><TierBox /></div>
        <div className="mt-10" id="lien-he"><NoteFooter /></div>
      </div>
    </main>
  );
}
