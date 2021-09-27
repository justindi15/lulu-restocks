import { TrackItemWizard } from "../components/TrackItemWizard/TrackItemWizard";
import { FAQ } from '../components/FAQ'
import { Stats } from "../components/Stats";
import { HowItWorks } from "../components/HowItWorks";


export default function Home() {
  return (
    <>
      <section className="bg-luluwhite flex items-center justify-center min-h-screen py-24 px-10">
            <TrackItemWizard />
      </section>
      <HowItWorks/>
      <Stats />
      <section id="faq" className="bg-luluwhite py-24 px-10">
            <FAQ />
      </section>
    </>
  )
}
