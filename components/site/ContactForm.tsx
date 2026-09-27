"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import type { Content } from "@/lib/content";
import { PREFILL_EVENT, type PrefillDetail } from "./PriceCalculator";

type Status = { state: "idle" } | { state: "sending" } | { state: "sent" } | { state: "error"; message: string };

const fieldClass =
  "w-full rounded-md border border-on-panel/20 bg-on-panel/5 px-3.5 py-3 text-on-panel outline-none placeholder:text-on-panel/40 focus:border-on-panel/60";

// Sits on the dark ink background of the contact block.
export default function ContactForm({ text }: { text: Content["contact"]["form"] }) {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const formRef = useRef<HTMLFormElement>(null);

  // The price calculator can fill in type, budget, and a summary of what was picked.
  useEffect(() => {
    function onPrefill(event: Event) {
      const { type, budget, message } = (event as CustomEvent<PrefillDetail>).detail;
      const form = formRef.current;
      if (!form) return;
      const field = (name: string) => form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | null;
      const typeField = field("type");
      const budgetField = field("budget");
      const messageField = form.elements.namedItem("message") as HTMLTextAreaElement | null;
      if (typeField) typeField.value = type;
      if (budgetField) budgetField.value = budget;
      if (messageField) {
        messageField.value = message;
        messageField.focus({ preventScroll: true });
        messageField.setSelectionRange(message.length, message.length);
      }
    }
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          subject: data.get("type"),
          message: `Budget: ${data.get("budget")}\n\n${data.get("message")}`,
          website: data.get("website"),
        }),
      });
      // Server errors are logged on the server; visitors get the message in their own language.
      if (!res.ok) throw new Error(`Contact form failed with ${res.status}`);
      setStatus({ state: "sent" });
    } catch {
      setStatus({ state: "error", message: text.genericError });
    }
  }

  if (status.state === "sent") {
    return (
      <div className="rounded-md border border-on-panel/20 p-8" role="status">
        <p className="text-2xl font-bold">{text.sentTitle}</p>
        <p className="mt-2 text-on-panel/70">{text.sentBody}</p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <div className="hidden" aria-hidden>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="grid gap-2 text-sm font-semibold">
        {text.name}
        <input name="name" required maxLength={100} autoComplete="name" className={fieldClass} />
      </label>
      <label className="grid gap-2 text-sm font-semibold">
        {text.email}
        <input name="email" type="email" required maxLength={254} autoComplete="email" className={fieldClass} />
      </label>
      <label className="grid gap-2 text-sm font-semibold">
        {text.type}
        <select name="type" className={`${fieldClass} [&>option]:text-ink`} defaultValue={text.types[0]}>
          {text.types.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </label>
      <label className="grid gap-2 text-sm font-semibold">
        {text.budget}
        <select name="budget" className={`${fieldClass} [&>option]:text-ink`} defaultValue={text.budgets[0]}>
          {text.budgets.map((budget) => (
            <option key={budget}>{budget}</option>
          ))}
        </select>
      </label>
      <label className="grid gap-2 text-sm font-semibold sm:col-span-2">
        {text.details}
        <textarea
          name="message"
          required
          maxLength={4800}
          rows={5}
          placeholder={text.detailsPlaceholder}
          className={`${fieldClass} resize-y font-normal`}
        />
      </label>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status.state === "sending"}
          className="rounded-md bg-signal px-6 py-3 font-semibold text-white hover:bg-signal/85 disabled:opacity-60"
        >
          {status.state === "sending" ? text.sending : text.submit}
        </button>
        <p className="text-sm text-on-panel/60" role={status.state === "error" ? "alert" : undefined}>
          {status.state === "error" ? <span className="text-on-panel">{status.message}</span> : text.replyNote}
        </p>
      </div>
      <p className="text-xs text-on-panel/50 sm:col-span-2">
        {text.privacyNote}{" "}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-on-panel">
          {text.privacyLink}
        </Link>
      </p>
    </form>
  );
}
