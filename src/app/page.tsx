import { Banner } from "@/components/banner";
import { CallToAction } from "@/components/call-to-action";
import { Testimonials } from "@/components/testimonials";
import Featured from "@/components/ui/featured";
import { WhyChooseUs } from "@/components/why-choose-us";

export default function Home() {
  return (
    <>
      
      <Banner />
      <Featured/>
      <WhyChooseUs />
      <Testimonials />
      <CallToAction />
      
    </>
  );
}
