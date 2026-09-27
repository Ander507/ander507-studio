import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 sm:px-6">
      <span className="h-3 w-3 bg-signal" aria-hidden />
      <h1 className="mt-6 text-5xl font-extrabold tracking-tight">404</h1>
      <p className="mt-3 text-lg text-muted">This page doesn&apos;t exist. / Siden findes ikke.</p>
      <Link href="/" className="mt-8 font-semibold underline underline-offset-4 hover:text-signal">
        ander507.dev
      </Link>
    </main>
  );
}
