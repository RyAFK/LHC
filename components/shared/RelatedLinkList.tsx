import Link from "next/link";

export function RelatedLinkList({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  if (items.length === 0) return null;

  return (
    <div>
      <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ink/50">
        {title}
      </h3>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-sm font-medium text-ink underline decoration-ink/20 underline-offset-4 hover:decoration-teal"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
