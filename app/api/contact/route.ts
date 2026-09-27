import { NextResponse } from "next/server";

/** Discord user pinged above each new contact message. */
const NOTIFY_USER_ID = "1118073170499473431";

const EMAIL_PATTERN =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

// Forwards contact form submissions to a Discord channel via webhook.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = text(body.name);
  const email = text(body.email);
  const subject = text(body.subject);
  const message = text(body.message);

  // Honeypot field: bots fill it, people never see it. Pretend it worked.
  if (text(body.website)) {
    return NextResponse.json({ success: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }
  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: "Message is too long (max 5000 characters)." }, { status: 400 });
  }

  const webhookUrl = process.env.DISCORD_CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("Contact form: DISCORD_CONTACT_WEBHOOK_URL is not set.");
    return NextResponse.json({ error: "Contact form is not configured yet." }, { status: 500 });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `<@${NOTIFY_USER_ID}>`,
        // Only ping this user, never @everyone/roles, whatever ends up in the message.
        allowed_mentions: { parse: [], users: [NOTIFY_USER_ID] },
        embeds: [
          {
            title: subject ? `Contact: ${subject.slice(0, 200)}` : "New contact message",
            color: 0xec4899,
            fields: [
              { name: "Name", value: name.slice(0, 256), inline: true },
              { name: "Email", value: email.slice(0, 256), inline: true },
              { name: "Message", value: message.slice(0, 1024) },
            ],
            description: message.length > 1024 ? message.slice(1024, 4000) : undefined,
            timestamp: new Date().toISOString(),
            footer: { text: "ander507.dev contact form" },
          },
        ],
      }),
    });

    if (!response.ok) {
      console.error("Contact form: Discord responded", response.status, await response.text());
      throw new Error("Failed to deliver message");
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again later." }, { status: 500 });
  }
}
