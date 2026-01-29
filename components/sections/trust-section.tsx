import Image from "next/image"

export function TrustSection() {
  return (
    <section className="py-6 md:py-8 bg-white border-y border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <h2 className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
            As Featured In
          </h2>
          <div className="relative w-full max-w-5xl aspect-[10/1]">
            <Image
              src="/images/press-banner.webp"
              alt="Featured in Living, Washington Post, Real Simple, NYT, House Beautiful, Glamour, InStyle"
              fill
              className="object-contain"
              sizes="(max-width: 1280px) 100vw, 1280px"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
