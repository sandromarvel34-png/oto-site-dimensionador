// Configure o checkout específico do downsell de R$ 37,00. Nunca use o checkout do livro ou do curso.
// Também aceita VITE_OTO_CHECKOUT_URL nas variáveis do projeto Lovable.
export const CHECKOUT_URL: string = import.meta.env["VITE_OTO_CHECKOUT_URL"] || "";
export const THANK_YOU_URL: string = import.meta.env["VITE_OTO_THANK_YOU_URL"] || "/obrigado";
export const VIDEO_EMBED_URL: string = "https://www.youtube-nocookie.com/embed/rMAqEe2uzW8";
export const PDF_EXAMPLE_URL = "";
export const SUPPORT_URL = "";
export const TERMS_URL = "";
export const PRIVACY_URL = "";
export const OFFER = {
  referencePrice: 97,
  price: 37,
  savings: 60,
  accessMonths: 6,
  name: "Dimensionador Expert — 6 meses",
} as const;

type FbqWindow = Window & { fbq?: (...args: unknown[]) => void };

/** Só registra intenção de checkout quando há um destino real e válido. */
export function goToCheckout(source: string): boolean {
  if (typeof window === "undefined" || !CHECKOUT_URL) return false;
  let destination: URL;
  try {
    destination = new URL(CHECKOUT_URL);
  } catch {
    return false;
  }
  if (destination.protocol !== "https:") return false;
  const w = window as FbqWindow;
  w.fbq?.("track", "InitiateCheckout", {
    value: OFFER.price,
    currency: "BRL",
    content_name: OFFER.name,
    source,
  });
  window.location.assign(destination.href);
  return true;
}

/** A recusa encerra a oferta; não retorna à página de vendas do livro. */
export function declineOffer(source: string): void {
  if (typeof window === "undefined") return;
  const w = window as FbqWindow;
  w.fbq?.("trackCustom", "DimensionadorOfferDeclined", { source });
  window.location.assign(THANK_YOU_URL);
}
