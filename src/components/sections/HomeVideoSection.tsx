const VIDEO_ID = "TBqRiIJpEXo";
const VIDEO_URL = `https://www.youtube.com/watch?v=${VIDEO_ID}`;
const THUMBNAIL_URL = `https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`;

export function HomeVideoSection() {
  return (
    <section
      aria-label="Featured video"
      className="w-full bg-[var(--background)] px-8 pb-8"
    >
      <div className="grid grid-cols-12 gap-0">
        <a
          href={VIDEO_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Watch video on YouTube"
          className="group relative col-span-12 block aspect-video w-full overflow-hidden"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={THUMBNAIL_URL}
            alt="Video thumbnail"
            className="h-full w-full object-cover transition-opacity duration-200 group-hover:opacity-80"
          />
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-[var(--bp-blue)] text-[var(--primary-light)] shadow-lg transition-transform duration-200 group-hover:scale-110">
              <svg
                className="ml-1 size-7"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}
