// TODO: Switch to a real EmailJS, Formspree or API service later by changing only this file.
// The provider can be configured with import.meta.env.VITE_FORMS_PROVIDER ("local" by default).
export async function submitContactMessage(data) {
  if (!data || typeof data !== "object") {
    throw new TypeError("Contact submission data must be an object.");
  }

  const provider = import.meta.env.VITE_FORMS_PROVIDER || "local";
  if (provider === "local") {
    await new Promise((resolve) => window.setTimeout(resolve, 700));
    if (import.meta.env.DEV) console.log("Contact submission (simulated):", data);
    return { ok: true };
  }

  // PLACEHOLDER integration point for a future provider.
  throw new Error("The configured forms provider is not implemented yet.");
}
