"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import type { Content } from "@/lib/content";
import { formatMoney, type Locale } from "@/lib/i18n";

export const PREFILL_EVENT = "contact:prefill";

export interface PrefillDetail {
  type: string;
  budget: string;
  message: string;
}

interface PriceCalculatorProps {
  locale: Locale;
  text: Content["calculator"];
  rows: Content["prices"]["rows"];
  form: Content["contact"]["form"];
}

function budgetFor(amount: number, form: Content["contact"]["form"]): string {
  const bucket = form.budgetLimits.findIndex((limit) => amount < limit);
  return form.budgets[bucket === -1 ? form.budgets.length - 1 : bucket + 1];
}

export default function PriceCalculator({ locale, text, rows, form }: PriceCalculatorProps) {
  const [typeIndex, setTypeIndex] = useState(1);
  const [extras, setExtras] = useState<Set<string>>(new Set());
  const [hosting, setHosting] = useState(false);

  const row = rows[typeIndex];
  const chosen = text.extras.filter((extra) => extras.has(extra.id));
  const total = row.amount + chosen.reduce((sum, extra) => sum + extra.amount, 0);
  const isApp = typeIndex === rows.length - 1;

  function toggleExtra(id: string) {
    setExtras((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function sendAsRequest() {
    const lines = [
      text.briefIntro,
      `- ${row.name}`,
      ...chosen.map((extra) => `- ${extra.label}`),
      ...(hosting ? [`- ${text.hostingLabel}`] : []),
      `${text.resultLabel} ${formatMoney(total, locale)}`,
      "",
      "",
    ];
    const detail: PrefillDetail = {
      type: form.types[typeIndex],
      budget: budgetFor(total, form),
      message: lines.join("\n"),
    };
    window.dispatchEvent(new CustomEvent(PREFILL_EVENT, { detail }));
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="grid gap-8 rounded-lg border border-line p-6 sm:p-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
      <div>
        <h3 className="text-2xl font-extrabold tracking-tight">{text.title}</h3>
        <p className="mt-2 text-muted">{text.intro}</p>

        <fieldset className="mt-8">
          <legend className="text-sm font-semibold">{text.typeLabel}</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {rows.map((option, index) => (
              <label
                key={option.name}
                className={`cursor-pointer rounded-md border px-4 py-3 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-signal ${
                  typeIndex === index ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"
                }`}
              >
                <input
                  type="radio"
                  name="calc-type"
                  className="sr-only"
                  checked={typeIndex === index}
                  onChange={() => setTypeIndex(index)}
                />
                <span className="block font-semibold">{option.name}</span>
                <span className={`text-sm ${typeIndex === index ? "text-paper/70" : "text-muted"}`}>
                  {formatMoney(option.amount, locale)}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-8">
          <legend className="text-sm font-semibold">{text.extrasLabel}</legend>
          <div className="mt-3 grid gap-x-6 sm:grid-cols-2">
            {text.extras.map((extra) => {
              const checked = extras.has(extra.id);
              return (
                <label
                  key={extra.id}
                  className="flex cursor-pointer items-center gap-3 border-b border-line py-3 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-signal"
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={checked}
                    onChange={() => toggleExtra(extra.id)}
                  />
                  <span
                    className={`grid h-5 w-5 shrink-0 place-items-center rounded border ${
                      checked ? "border-signal bg-signal text-white" : "border-line"
                    }`}
                    aria-hidden
                  >
                    {checked && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                  </span>
                  <span className="flex-1">{extra.label}</span>
                  <span className="text-sm text-muted">+{formatMoney(extra.amount, locale)}</span>
                </label>
              );
            })}
            <label className="flex cursor-pointer items-center gap-3 border-b border-line py-3 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-signal sm:col-span-2">
              <input type="checkbox" className="sr-only" checked={hosting} onChange={() => setHosting(!hosting)} />
              <span
                className={`grid h-5 w-5 shrink-0 place-items-center rounded border ${
                  hosting ? "border-signal bg-signal text-white" : "border-line"
                }`}
                aria-hidden
              >
                {hosting && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
              </span>
              <span className="flex-1">{text.hostingLabel}</span>
              <span className="text-sm text-muted">
                +{formatMoney(text.hostingAmount, locale)}
                {text.perMonth}
              </span>
            </label>
          </div>
        </fieldset>
      </div>

      <div className="flex flex-col justify-between rounded-md bg-mist p-6 lg:sticky lg:top-24 lg:h-fit">
        <div aria-live="polite">
          <p className="text-muted">{text.resultLabel}</p>
          <p className="mt-1 text-5xl font-extrabold tracking-tight">{formatMoney(total, locale)}</p>
          {hosting && (
            <p className="mt-2 font-semibold">
              + {formatMoney(text.hostingAmount, locale)}
              {text.perMonth}
            </p>
          )}
          <p className="mt-4 text-sm text-muted">{isApp ? text.appNote : text.note}</p>
        </div>
        <button
          type="button"
          onClick={sendAsRequest}
          className="mt-8 rounded-md bg-signal px-5 py-3 font-semibold text-white hover:bg-signal/85"
        >
          {text.send}
        </button>
      </div>
    </div>
  );
}
