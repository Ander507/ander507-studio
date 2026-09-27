"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ProjectScreenshot } from "@/lib/projects";
import type { Content } from "@/lib/content";

export default function ScreenshotGallery({
  screenshots,
  text,
}: {
  screenshots: ProjectScreenshot[];
  text: Pick<Content["project"], "enlarge" | "viewer" | "close" | "prev" | "next">;
}) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const count = screenshots.length;

  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(() => setLightbox((i) => (i === null ? null : (i - 1 + count) % count)), [count]);
  const next = useCallback(() => setLightbox((i) => (i === null ? null : (i + 1) % count)), [count]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") prev();
      if (event.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightbox, close, prev, next]);

  const current = screenshots[active];

  return (
    <>
      <button
        type="button"
        onClick={() => setLightbox(active)}
        className="relative block aspect-[16/9] w-full overflow-hidden rounded-lg border border-line bg-mist"
        aria-label={`${text.enlarge}: ${current.alt}`}
      >
        <Image
          src={current.src}
          alt={current.alt}
          fill
          priority
          className="object-cover object-top"
          sizes="(max-width: 1152px) 100vw, 1152px"
        />
      </button>

      {count > 1 && (
        <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
          {screenshots.map((shot, index) => (
            <button
              key={shot.src}
              type="button"
              onClick={() => setActive(index)}
              aria-label={shot.alt}
              aria-current={active === index}
              className={`relative aspect-[16/10] w-32 shrink-0 overflow-hidden rounded border transition-opacity ${
                active === index ? "border-ink" : "border-line opacity-60 hover:opacity-100"
              }`}
            >
              <Image src={shot.src} alt="" fill className="object-cover object-top" sizes="128px" />
            </button>
          ))}
        </div>
      )}

      {lightbox !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={text.viewer}
          onClick={close}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            onClick={close}
            aria-label={text.close}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
          {count > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                prev();
              }}
              aria-label={text.prev}
              className="absolute left-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
          )}
          <figure onClick={(event) => event.stopPropagation()} className="max-w-6xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={screenshots[lightbox].src}
              alt={screenshots[lightbox].alt}
              className="max-h-[80vh] w-auto rounded-lg"
            />
            <figcaption className="mt-3 text-center text-sm text-white/70">{screenshots[lightbox].alt}</figcaption>
          </figure>
          {count > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                next();
              }}
              aria-label={text.next}
              className="absolute right-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          )}
        </div>
      )}
    </>
  );
}
