import { Header } from "../components/Header";
import { TrackItemWizard } from "../components/TrackItemWizard/TrackItemWizard";


export default function Home() {
  return (
    <div>
      <Header />
      <section className="bg-luluwhite flex items-center justify-center min-h-screen py-24 px-10">
            <TrackItemWizard />
      </section>
    </div>
  )
}
