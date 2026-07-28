type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
  dark?: boolean;
  as?: "h1" | "h2" | "h3";
};

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  dark = false,
  as = "h2",
}: SectionHeadingProps) {
  const Heading = as;
  const alignClass = align === "center" ? "mx-auto text-center" : "";
  const titleColor = dark ? "text-bone" : "text-ink";
  const ledeColor = dark ? "text-stone" : "text-ink/70";

  return (
    <div className={`prose-measure ${align === "center" ? "max-w-2xl" : ""} ${alignClass}`}>
      {eyebrow && (
        <p className={`mono-label text-xs ${dark ? "text-bronze" : "text-bronze"}`}>
          {eyebrow}
        </p>
      )}
      <Heading className={`mt-2 font-display text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl ${titleColor}`}>
        {title}
      </Heading>
      {lede && <p className={`mt-4 text-base leading-7 ${ledeColor}`}>{lede}</p>}
    </div>
  );
}
