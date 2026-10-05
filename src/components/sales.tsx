import { useState, type ReactNode, type ComponentType } from "react";
import { ArrowRight, Check, Monitor, Play, ShieldCheck, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { OFFER, goToCheckout, declineOffer, VIDEO_EMBED_URL } from "@/lib/site-config";

export function Brand() {
  return (
    <div className="sales-brand">
      <img
        src="/logo-academia-eletricista.png"
        alt="Academia do Eletricista"
        width={62}
        height={32}
      />
      <div>
        <span>Dimensionador Expert</span>
        <small>Academia do Eletricista</small>
      </div>
    </div>
  );
}

export function SalesSection({
  id,
  tone = "light",
  children,
}: {
  id?: string;
  tone?: "light" | "muted" | "dark";
  children: ReactNode;
}) {
  return (
    <section id={id} className={`sales-section sales-section--${tone}`}>
      <div className="sales-container">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="sales-heading">
      {eyebrow && <p className="sales-eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {children && <div className="sales-lead">{children}</div>}
    </div>
  );
}

export function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="sales-checklist">
      {items.map((item) => (
        <li key={item}>
          <Check aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function BenefitCard({
  icon: Icon,
  title,
  children,
}: {
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="sales-card">
      <Icon className="sales-card-icon" aria-hidden={true} />
      <h3>{title}</h3>
      <p>{children}</p>
    </article>
  );
}

export function Price({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`sales-price${compact ? " sales-price--compact" : ""}`}>
      <p className="sales-reference">
        De <s>R$ {OFFER.referencePrice},00</s> por
      </p>
      <p className="sales-price-value">
        R$ {OFFER.price}
        <span>,00</span>
      </p>
      <p className="sales-savings">Você economiza R$ {OFFER.savings},00</p>
      <p className="sales-price-terms">{OFFER.accessMonths} meses de acesso · Pagamento único</p>
    </div>
  );
}

export function PurchaseButton({ source, compact = false }: { source: string; compact?: boolean }) {
  const [unavailable, setUnavailable] = useState(false);
  return (
    <>
      <Button
        className={`sales-cta${compact ? " sales-cta--compact" : ""}`}
        onClick={() => {
          if (!goToCheckout(source)) setUnavailable(true);
        }}
      >
        {compact ? "Quero por R$ 37" : "Sim, quero o Dimensionador por R$ 37"}
        <ArrowRight aria-hidden="true" />
      </Button>
      <Dialog open={unavailable} onOpenChange={setUnavailable}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Oferta indisponível no momento</DialogTitle>
            <DialogDescription>
              Não foi possível abrir a compra desta oferta. Tente novamente mais tarde ou continue
              apenas com o livro.
            </DialogDescription>
          </DialogHeader>
          <Button variant="outline" onClick={() => declineOffer(source)}>
            Continuar apenas com o livro
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function OfferDecision({ source }: { source: string }) {
  return (
    <div className="sales-decision">
      <PurchaseButton source={source} />
      <p className="sales-payment-note">
        <ShieldCheck aria-hidden="true" /> Compra adicional e opcional · Sem renovação automática
      </p>
      <button type="button" className="sales-decline" onClick={() => declineOffer(source)}>
        Não, quero continuar apenas com o livro
      </button>
    </div>
  );
}

export function ProductPreview() {
  return (
    <figure className="sales-preview">
      <div className="sales-screen">
        <div className="sales-screen-bar">
          <span />
          <span />
          <span />
          <p>Dimensionador Expert</p>
        </div>
        <img
          src="/images/dimensionador-resultado-nitido.jpg"
          alt="Tela real do Dimensionador Expert com condutores, dispositivos e resultados de um dimensionamento"
          width={1242}
          height={840}
          fetchPriority="high"
        />
      </div>
      <figcaption>
        <span>
          <Monitor aria-hidden="true" /> Computador
        </span>
        <span>
          <Smartphone aria-hidden="true" /> Celular e tablet
        </span>
      </figcaption>
    </figure>
  );
}

export function VideoDemo() {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="sales-video">
      {playing ? (
        <iframe
          src={`${VIDEO_EMBED_URL}?autoplay=1&playsinline=1&rel=0`}
          title="Demonstração do Dimensionador Expert"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label="Reproduzir demonstração do Dimensionador Expert"
        >
          <img
            src="/images/dimensionador-demo-poster.png"
            alt="Prévia da demonstração do Dimensionador Expert"
            width={1280}
            height={720}
            loading="lazy"
          />
          <span>
            <Play aria-hidden="true" /> Assistir à demonstração
          </span>
        </button>
      )}
    </div>
  );
}
