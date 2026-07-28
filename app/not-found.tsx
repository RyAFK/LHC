import { Container } from "@/components/ui/Container";
import { BookingCTA } from "@/components/shared/BookingCTA";
import { CallAction } from "@/components/shared/CallAction";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] max-w-2xl flex-col items-start justify-center py-20">
      <p className="mono-label text-xs text-bronze">404</p>
      <h1 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
        We can&rsquo;t find that page
      </h1>
      <p className="prose-measure mt-4 text-base leading-7 text-ink/70">
        The page you&rsquo;re looking for may have moved. Try the links below, or
        return to the homepage.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Link href="/" className="font-display text-sm font-semibold text-teal underline underline-offset-4">
          Go to homepage
        </Link>
        <BookingCTA source="404_page" />
        <CallAction source="404_page" />
      </div>
    </Container>
  );
}
