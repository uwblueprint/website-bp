"use client";
import Image from "next/image";
import { FadeUp } from "@/components/ui/FadeUp";
import { cn } from "@/lib/utils";

const VALUE_PROPS = [
  {
    title: "Nomad Futurist Foundation",
    image: "img/sponsors/nomad-futurist-foundation.png"
  },
];

export function OurSponsors({ className }: { className?: string }) {
  return (
    <section
      id="our-sponsors"
      aria-label="Our Sponsors"
      className={cn("bg-[var(--primary-light)] px-8 pt-24 pb-8", className)}
    >
      <div className="grid w-full grid-cols-12 gap-0 pb">
        <h2 className="col-span-12 text-xxl lowercase text-[var(--bp-blue)] pb-8 md:pb-16">
          our sponsors
        </h2>

        <div className="col-span-12 text-lg text-[var(--primary-dark)] pb-8 md:pb-16 md:w-8/12">
          <p>
            Check out our 2026-2027 sponsors below!
          </p>
        </div>

        <div className="col-span-12 grid grid-cols-12 gap-0 min-[800px]:auto-rows-fr">
          {VALUE_PROPS.map((prop, i) => (
            <FadeUp
              key={prop.title}
              index={i}
              inView
              className="col-span-12 min-[800px]:col-span-4"
            >
              <div className="h-full">
                <div className="flex h-full flex-col items-center py-6 md:px-6 transition-colors duration-200 hover:bg-black/5">

                  <div className="relative flex w-full justify-center overflow-hidden"> 
                    <Image 
                      src={prop.image} 
                      alt={prop.title} 
                      width={800} 
                      height={500} 
                      className="h-auto w-[512px] object-contain" 
                    /> 
                  </div>

                  <h3 className="pb-4 text-lg text-[var(--primary-dark)]"> 
                    {prop.title} 
                  </h3>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
