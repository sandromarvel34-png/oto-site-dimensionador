import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, Fragment, type ReactNode } from "react";
import { ArrowRight, Check, Monitor, X } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { goToCheckout, SUPPORT_URL, TERMS_URL, PRIVACY_URL } from "@/lib/site-config";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dimensionador Expert | Dimensionamento de Comandos Elétricos" },
      { name: "description", content: "Dimensione condutores, proteções e componentes de comandos elétricos com mais rapidez e organização utilizando o Dimensionador Expert." },
      { property: "og:title", content: "Dimensionador Expert" },
      { property: "og:description", content: "Uma ferramenta online de apoio ao dimensionamento de comandos elétricos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SalesPage,
});

/* ---------- peças reutilizáveis ---------- */

function CTA({ children, source, className = "" }: { children: ReactNode; source: string; className?: string }) {
  return (
    <button
      type="button"
      onClick={() => goToCheckout(source)}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#f28a00] px-6 py-4 text-base font-semibold text-slate-950 shadow-soft transition hover:-translate-y-0.5 hover:bg-[#df7c00] active:translate-y-0 sm:w-auto ${className}`}
    >
      {children} <ArrowRight className="h-4 w-4" />
    </button>
  );
}

/** Espaço para screenshot real do sistema. Passe `src` quando a imagem estiver disponível. */
function Shot({ label, src, ratio = "aspect-[16/10]", className = "" }: { label: string; src?: string; ratio?: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-border bg-card shadow-soft ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-border bg-secondary px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-border" /><span className="h-2.5 w-2.5 rounded-full bg-border" /><span className="h-2.5 w-2.5 rounded-full bg-border" />
      </div>
      {src ? (
        <img src={src} alt={label} loading="lazy" className={`w-full object-cover ${ratio}`} />
      ) : (
        <div className={`grid place-items-center bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-[size:24px_24px] ${ratio}`}>
          <div className="flex flex-col items-center gap-2 rounded-xl bg-card/90 px-5 py-4 text-center">
            <Monitor className="h-6 w-6 text-primary" />
            <span className="text-sm font-medium text-foreground">{label}</span>
            <span className="text-xs text-muted-foreground">Imagem demonstrativa em preparação</span>
          </div>
        </div>
      )}
    </div>
  );
}

function Section({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`px-5 py-12 sm:py-16 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

function Heading({ eyebrow, title, text, center }: { eyebrow?: string; title: string; text?: ReactNode; center?: boolean }) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="mb-3 text-xs font-semibold tracking-[0.14em] text-primary">{eyebrow}</p>}
      <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h2>
      {text && <div className="mt-4 space-y-3 text-base leading-relaxed text-muted-foreground sm:text-lg">{text}</div>}
    </div>
  );
}

function CheckItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground"><Check className="h-3.5 w-3.5" /></span>
      <span className="text-foreground">{children}</span>
    </li>
  );
}


/* ---------- página ---------- */

function SalesPage() {
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("topo");
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setShowBar(!e.isIntersecting));
    io.observe(hero);
    return () => io.disconnect();
  }, []);


  return (
    <div className="min-h-screen bg-background pb-20 text-foreground md:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex items-center text-left" style={{ gap: 12 }}>
              <div className="flex h-9 items-center">
                <img src="/logo-academia-eletricista.svg" alt="Academia do Eletricista" width="61.42" height="32" style={{ width: 61.42, height: 32, minWidth: 61.42, maxWidth: 61.42 }} className="shrink-0 object-contain" />
              </div>
              <div className="leading-tight">
                <span className="block font-bold tracking-tight text-slate-950" style={{ fontSize: 16, lineHeight: "20px" }}>Dimensionador Expert</span>
                <span className="mt-0.5 block font-semibold uppercase tracking-[0.14em] text-slate-400" style={{ fontSize: 10, lineHeight: "12.5px" }}>Comandos elétricos</span>
              </div>
            </div>
          </div>
          <button onClick={() => goToCheckout("header")} className="hidden shrink-0 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 sm:inline-flex">
            Liberar meu acesso
          </button>
        </div>
      </header>

      {COPY_SECTIONS.map((blocks, sectionIndex) => (
        <Fragment key={sectionIndex}>
          {sectionIndex === COPY_SECTIONS.length - 1 && <Section><Heading center title="Perguntas frequentes" /><Accordion type="single" collapsible className="mx-auto mt-8 max-w-3xl">{FAQ.map(([q,a],i) => <AccordionItem key={q} value={`q${i}`}><AccordionTrigger className="text-left text-base font-semibold">{q}</AccordionTrigger><AccordionContent className="text-base leading-relaxed text-muted-foreground">{a}</AccordionContent></AccordionItem>)}</Accordion></Section>}
          <CopySection blocks={blocks} index={sectionIndex} />
        </Fragment>
      ))}
      {/* Rodapé */}
      <footer className="border-t border-border px-5 py-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex items-center text-left" style={{ gap: 12 }}>
              <div className="flex h-9 items-center">
                <img src="/logo-academia-eletricista.svg" alt="Academia do Eletricista" width="61.42" height="32" style={{ width: 61.42, height: 32, minWidth: 61.42, maxWidth: 61.42 }} className="shrink-0 object-contain" />
              </div>
              <div className="leading-tight">
                <span className="block font-bold tracking-tight text-slate-950" style={{ fontSize: 16, lineHeight: "20px" }}>Dimensionador Expert</span>
                <span className="mt-0.5 block font-semibold uppercase tracking-[0.14em] text-slate-400" style={{ fontSize: 10, lineHeight: "12.5px" }}>Comandos elétricos</span>
              </div>
            </div>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Academia do Eletricista</p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {[["Termos de Uso", TERMS_URL], ["Política de Privacidade", PRIVACY_URL], ["Suporte", SUPPORT_URL]].filter(([, u]) => u).map(([t, u]) => (
              <a key={t} href={u} target="_blank" rel="noreferrer" className="hover:text-foreground">{t}</a>
            ))}
          </nav>
        </div>
        <div className="mx-auto mt-8 max-w-6xl border-t border-border pt-6 text-xs leading-relaxed text-muted-foreground">
          <p>O Dimensionador Expert é uma ferramenta de apoio técnico. Os resultados devem ser analisados considerando as características reais da instalação e as normas aplicáveis.</p>
          <div className="mt-5 space-y-1 text-center text-sm">
            <p>Copyright © 2026</p>
            <p className="font-bold text-foreground">Academia do Eletricista</p>
            <p>Instituto Brasileiro de Qualificação Profissional Ltda - ME</p>
            <p>CNPJ: 10.984.548/0001-77</p>
          </div>
        </div>
      </footer>

      {/* Barra fixa mobile */}
      <div className={`fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-4 py-3 backdrop-blur transition-transform md:hidden ${showBar ? "translate-y-0" : "translate-y-full"}`}>
        <div className="flex items-center justify-between gap-3">
          <span className="min-w-0 truncate text-sm font-semibold">Dimensionador Expert — R$37</span>
          <button onClick={() => goToCheckout("barra-mobile")} className="shrink-0 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">Quero acessar</button>
        </div>
      </div>
    </div>
  );
}

const FAQ: [string, string][] = [
  ["O que é o Dimensionador Expert?", "É uma ferramenta online de apoio ao dimensionamento de comandos elétricos, reunindo cálculos, resultados, componentes e documentação em um único ambiente."],
  ["Por quanto tempo terei acesso?", "6 meses a partir da ativação do acesso."],
  ["Vou pagar R$37 todos os meses?", "Não. Nesta oferta inicial o pagamento é único: R$37 pelos 6 meses de acesso."],
  ["Haverá cobrança automática depois dos 6 meses?", "Não nesta oferta. Ao final do período, você poderá receber uma nova opção de acesso caso queira continuar utilizando a ferramenta."],
  ["Preciso instalar algum programa?", "Não. O Dimensionador Expert funciona online através do navegador."],
  ["Posso usar no celular?", "Sim. A interface é responsiva e compatível com computadores, tablets e smartphones."],
  ["A ferramenta substitui um profissional habilitado?", "Não. O Dimensionador Expert é uma ferramenta de apoio ao dimensionamento. As condições reais da instalação, requisitos normativos e responsabilidade técnica devem ser avaliados pelo profissional responsável."],
  ["Quais fabricantes aparecem no sistema?", "Atualmente o sistema trabalha com referências disponíveis de fabricantes como WEG, Siemens e Schneider."],
  ["Posso gerar documentação?", "Sim. O Dimensionador Expert possui recursos para organizar os resultados e gerar documentação relacionada ao dimensionamento."],
  ["O produto continuará recebendo melhorias?", "A proposta do período Fundador é utilizar o feedback dos primeiros usuários para continuar aprimorando a plataforma. As atualizações disponibilizadas durante seu período de acesso estarão incluídas."],
];



function CopyContent({ blocks, hero = false }: { blocks: CopyBlock[]; hero?: boolean }) {
  return <div className="space-y-4">{blocks.map((block, i) => {
    const text = block.text ?? "";
    if (block.kind === "heading") {
      if (hero && i === 1) return <p key={i} className="text-base leading-relaxed text-muted-foreground sm:text-lg">{text}</p>;
      if (text === "R$ 37,00") return <p key={i} className="text-5xl font-bold tracking-tight text-primary sm:text-6xl">{text}</p>;
      const cls = block.level === 1 ? "text-2xl font-bold leading-tight tracking-tight sm:text-3xl" : block.level === 2 ? "text-lg font-semibold leading-relaxed sm:text-xl" : "text-base font-semibold text-primary";
      return hero && i === 0 ? <h1 key={i} className="text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl lg:text-[44px]">{text}</h1> : block.level === 3 ? <h3 key={i} className={cls}>{text}</h3> : <h2 key={i} className={cls}>{text}</h2>;
    }
    if (block.kind === "cta") return <div key={i} className="pt-3"><CTA source={`layout-${text}`}>{text}</CTA></div>;
    if (block.kind === "shot") return <Shot key={i} label={text} ratio="aspect-[16/9]" />;
    if (block.kind === "list" || block.kind === "negative") return <ul key={i} className="space-y-3">{block.items?.map(item => block.kind === "negative" ? <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"><X className="mt-1 h-4 w-4 shrink-0" />{item}</li> : <CheckItem key={item}>{item}</CheckItem>)}</ul>;
    if (block.kind === "quote") return <blockquote key={i} className="rounded-xl border-l-4 border-primary bg-secondary px-5 py-4 font-semibold">{text}</blockquote>;
    return <p key={i} className="text-sm leading-relaxed text-muted-foreground sm:text-base">{text}</p>;
  })}</div>;
}
function splitCards(blocks: CopyBlock[]) {
  const intro: CopyBlock[] = [], cards: CopyBlock[][] = [];
  for (const block of blocks) {
    if (block.kind === "heading" && block.level === 3) cards.push([block]);
    else if (cards.length) cards[cards.length - 1].push(block);
    else intro.push(block);
  }
  return { intro, cards };
}

function ConsultationZigzag({ steps }: { steps: string[] }) {
  const render = (mobile: boolean) => {
    const width = mobile ? 360 : 760;
    const cardWidth = mobile ? 145 : 230;
    const left = mobile ? 10 : 40;
    const right = width - left - cardWidth;
    const arrowId = mobile ? "consultation-arrow-mobile" : "consultation-arrow-desktop";
    return <svg viewBox={`0 0 ${width} 450`} role="img" aria-label="Percurso de consultas em zigue-zague: cálculo, tabela, catálogo, outro cálculo, outro catálogo, anotações e documentação." className={mobile ? "block w-full sm:hidden" : "hidden w-full sm:block"}>
      <defs><marker id={arrowId} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#f28a00" /></marker></defs>
      {steps.slice(0,-1).map((_,i) => {
        const fromLeft = i % 2 === 0;
        const x1 = fromLeft ? left + cardWidth + 8 : right - 8;
        const x2 = fromLeft ? right - 12 : left + cardWidth + 12;
        return <path key={i} d={`M ${x1} ${38 + i * 60} L ${x2} ${38 + (i + 1) * 60}`} fill="none" stroke="#f28a00" strokeWidth="2.5" strokeLinecap="round" markerEnd={`url(#${arrowId})`} />;
      })}
      {steps.map((step,i) => <g key={step} transform={`translate(${i % 2 === 0 ? left : right}, ${14 + i * 60})`}>
        <rect width={cardWidth} height="48" rx="12" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
        <text x={cardWidth / 2} y="25" dominantBaseline="middle" textAnchor="middle" fill="#1e293b" fontFamily="Inter, ui-sans-serif, system-ui, sans-serif" fontSize={mobile ? 14 : 17} fontWeight="600">{step}</text>
      </g>)}
    </svg>;
  };
  return <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-slate-200 bg-white p-3 sm:p-5">{render(false)}{render(true)}</div>;
}

function CopySection({ blocks, index }: { blocks: CopyBlock[]; index: number }) {
  const box = "rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-6";
  if (index === 0) return <Section id="topo" className="bg-gradient-to-br from-white via-white to-blue-50"><div className="grid items-center gap-10 lg:grid-cols-2"><div><p className="mb-4 text-xs font-semibold tracking-widest text-primary">Dimensionador Expert</p><CopyContent hero blocks={blocks.filter(b => b.kind !== "shot")} /></div><div className="lg:pl-4"><CopyContent blocks={blocks.filter(b => b.kind === "shot")} /><div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-semibold text-muted-foreground"><span className="rounded-lg bg-secondary p-3">Cálculos</span><span className="rounded-lg bg-secondary p-3">Componentes</span><span className="rounded-lg bg-secondary p-3">Documentação</span></div></div></div></Section>;

  if (index === 1) {
    const first = blocks.findIndex(b => b.text === "Cálculo");
    const last = blocks.findIndex(b => b.text === "Documentação");
    const checklist = blocks.findIndex(b => b.kind === "list");
    return <Section className="bg-slate-50">
      <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_1fr]">
        <CopyContent blocks={blocks.slice(0, checklist)} />
        <div className="rounded-2xl border border-blue-100 bg-white p-6"><ul className="grid gap-3 sm:grid-cols-2">{blocks[checklist].items?.map(item => <CheckItem key={item}>{item.replace(/;$/,"")}</CheckItem>)}</ul></div>
      </div>
      <div className="mt-8"><CopyContent blocks={blocks.slice(checklist + 1, first)} /></div>
      <ConsultationZigzag steps={blocks.slice(first,last + 1).map(block => block.text ?? "")} />
      <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-blue-100 bg-blue-50 p-6 text-center"><CopyContent blocks={blocks.slice(last + 1)} /></div>
    </Section>;
  }
  if ([2,4,5,8].includes(index)) {
    const catalogClosing = index === 5 ? blocks.findIndex(b => b.text === "Menos tempo procurando catálogo por catálogo.") : -1;
    const { intro, cards } = splitCards(catalogClosing >= 0 ? blocks.slice(0,catalogClosing) : blocks);
    let closing: CopyBlock[] = catalogClosing >= 0 ? blocks.slice(catalogClosing) : [];
    if (index === 2 && cards.length) {
      const last = cards[cards.length - 1];
      const end = last.findIndex(b => b.kind === "heading" && b.level === (index === 2 ? 1 : 2));
      if (end >= 0) closing = last.splice(end);
    }
    return <Section id={index === 2 ? "pratica" : undefined} className={index % 2 ? "bg-secondary" : ""}><div className="mx-auto mb-8 max-w-3xl text-center"><CopyContent blocks={intro} /></div><div className={`grid gap-5 ${index === 5 || index === 4 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>{cards.map((group,i) => <div key={i} className={box}><CopyContent blocks={group} /></div>)}</div>{closing.length > 0 && <div className="mx-auto mt-8 max-w-3xl text-center"><CopyContent blocks={closing} /></div>}</Section>;
  }
  if (index === 7) {
    const left = blocks.findIndex(b => b.text === "Sem o Dimensionador Expert"), right = blocks.findIndex(b => b.text === "Com o Dimensionador Expert");
    const closing = blocks.findIndex((b,i) => i > right && b.kind === "heading" && b.level === 1);
    return <Section className="bg-secondary"><div className="mb-8 text-center"><CopyContent blocks={blocks.slice(0,left)} /></div><div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2"><div className={box}><CopyContent blocks={blocks.slice(left,right)} /></div><div className={`${box} border-primary/30`}><CopyContent blocks={blocks.slice(right,closing)} /></div></div><div className="mx-auto mt-8 max-w-3xl text-center"><CopyContent blocks={blocks.slice(closing)} /></div></Section>;
  }
  if (index === 9) {
    const start = blocks.findIndex(b => b.text === "Condição de lançamento");
    return <Section id="oferta" className="bg-secondary"><div className="grid items-start gap-8 lg:grid-cols-2"><div className="lg:py-5"><CopyContent blocks={blocks.slice(0,start)} /></div><div className="rounded-3xl border-2 border-orange-300 bg-card p-7 shadow-soft sm:p-9"><CopyContent blocks={blocks.slice(start)} /></div></div></Section>;
  }
  if (index === 12) return <Section><div className="rounded-3xl border border-primary/20 bg-accent p-7 text-center sm:p-12"><div className="mx-auto max-w-3xl"><CopyContent blocks={blocks} /></div></div></Section>;
  const shots = blocks.filter(b => b.kind === "shot"), text = blocks.filter(b => b.kind !== "shot");
  return <Section className={index % 2 ? "bg-secondary" : ""}><div className={shots.length ? "grid items-center gap-8 lg:grid-cols-2" : "mx-auto max-w-3xl"}><CopyContent blocks={text} />{shots.length > 0 && <CopyContent blocks={shots} />}</div></Section>;
}

type CopyBlock = { kind: string; text?: string; level?: number; items?: string[] };
const COPY_SECTIONS: CopyBlock[][] = [
  [
    {
      "kind": "heading",
      "level": 1,
      "text": "Pare de perder tempo entre cálculos, tabelas e catálogos para dimensionar comandos elétricos"
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Informe os dados do motor e da instalação e centralize em uma única ferramenta o dimensionamento de condutores, proteção, queda de tensão, contatores e relés — com memória de cálculo, referências de componentes e documentação organizada."
    },
    {
      "kind": "text",
      "text": "6 meses de acesso • R$ 37,00 uma única vez • Sem mensalidade"
    },
    {
      "kind": "cta",
      "text": "Quero acessar o Dimensionador Expert"
    },
    {
      "kind": "text",
      "text": "Ferramenta de apoio técnico ao dimensionamento. As condições reais da instalação, requisitos normativos e especificações finais devem ser verificados pelo profissional responsável."
    },
    {
      "kind": "shot",
      "text": "Painel do Dimensionador Expert"
    }
  ],
  [
    {
      "kind": "heading",
      "level": 1,
      "text": "Quanto tempo você perde em cada dimensionamento?"
    },
    {
      "kind": "text",
      "text": "Dimensionar um comando elétrico não termina quando você descobre a corrente do motor."
    },
    {
      "kind": "text",
      "text": "Ainda é preciso verificar:"
    },
    {
      "kind": "list",
      "items": [
        "Corrente de projeto;",
        "Condutor;",
        "Queda de tensão;",
        "Proteção;",
        "Contator;",
        "Relé;",
        "Compatibilidade dos componentes;",
        "Documentação do dimensionamento."
      ]
    },
    {
      "kind": "text",
      "text": "E quando cada informação está em um lugar diferente, o processo vira uma sequência de interrupções:"
    },
    {
      "kind": "text",
      "text": "Cálculo"
    },
    {
      "kind": "text",
      "text": "Tabela"
    },
    {
      "kind": "text",
      "text": "Catálogo"
    },
    {
      "kind": "text",
      "text": "Outro cálculo"
    },
    {
      "kind": "text",
      "text": "Outro catálogo"
    },
    {
      "kind": "text",
      "text": "Anotações"
    },
    {
      "kind": "text",
      "text": "Documentação"
    },
    {
      "kind": "text",
      "text": "O problema não é fazer uma dessas tarefas."
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "É ter que interromper o raciocínio o tempo todo para fazer todas elas."
    },
    {
      "kind": "text",
      "text": "Foi para centralizar esse processo que criamos o:"
    },
    {
      "kind": "heading",
      "level": 1,
      "text": "Dimensionador Expert"
    },
    {
      "kind": "text",
      "text": "Uma ferramenta online de apoio ao dimensionamento de comandos elétricos."
    }
  ],
  [
    {
      "kind": "heading",
      "level": 1,
      "text": "Veja como um dimensionamento acontece na prática"
    },
    {
      "kind": "text",
      "text": "Não queremos apenas dizer que a ferramenta economiza etapas."
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Queremos mostrar."
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "1 — Informe os dados"
    },
    {
      "kind": "text",
      "text": "Preencha os dados necessários do motor e da instalação."
    },
    {
      "kind": "shot",
      "text": "Tela de entrada"
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "2 — Execute o dimensionamento"
    },
    {
      "kind": "text",
      "text": "A ferramenta processa as informações inseridas e organiza os resultados do dimensionamento."
    },
    {
      "kind": "shot",
      "text": "Botão/tela de dimensionamento"
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "3 — Analise os resultados"
    },
    {
      "kind": "text",
      "text": "Consulte em uma mesma tela informações como:"
    },
    {
      "kind": "text",
      "text": "Corrente nominal"
    },
    {
      "kind": "text",
      "text": "Corrente de projeto"
    },
    {
      "kind": "text",
      "text": "Condutor recomendado"
    },
    {
      "kind": "text",
      "text": "Queda de tensão"
    },
    {
      "kind": "text",
      "text": "Proteção"
    },
    {
      "kind": "text",
      "text": "Contator"
    },
    {
      "kind": "text",
      "text": "Relé"
    },
    {
      "kind": "text",
      "text": "Critérios utilizados"
    },
    {
      "kind": "shot",
      "text": "Resultado"
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "4 — Consulte componentes"
    },
    {
      "kind": "text",
      "text": "Veja referências disponíveis no catálogo interno da ferramenta de fabricantes como:"
    },
    {
      "kind": "text",
      "text": "WEG • SIEMENS • SCHNEIDER"
    },
    {
      "kind": "shot",
      "text": "Referências de componentes"
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "5 — Gere a documentação"
    },
    {
      "kind": "text",
      "text": "Organize os dados do projeto, resultados, componentes e informações profissionais em um documento para consulta, arquivo ou apresentação."
    },
    {
      "kind": "shot",
      "text": "PDF gerado"
    },
    {
      "kind": "heading",
      "level": 1,
      "text": "Dados → dimensionamento → resultados → componentes → documentação"
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Em vez de espalhar o processo entre várias ferramentas, você concentra as principais etapas em um único ambiente."
    },
    {
      "kind": "cta",
      "text": "Quero fazer meu próximo dimensionamento"
    }
  ],
  [
    {
      "kind": "heading",
      "level": 1,
      "text": "Não receba apenas um número."
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Veja como o resultado foi construído."
    },
    {
      "kind": "text",
      "text": "Uma calculadora poderia simplesmente entregar um valor na tela."
    },
    {
      "kind": "text",
      "text": "Essa não é a proposta do Dimensionador Expert."
    },
    {
      "kind": "text",
      "text": "Além dos resultados, a ferramenta permite consultar os critérios e memórias de cálculo disponíveis no sistema."
    },
    {
      "kind": "text",
      "text": "Assim, você não vê apenas:"
    },
    {
      "kind": "quote",
      "text": "“Este é o resultado.”"
    },
    {
      "kind": "text",
      "text": "Você pode consultar também:"
    },
    {
      "kind": "quote",
      "text": "“Como chegamos a este resultado?”"
    },
    {
      "kind": "shot",
      "text": "Memória de cálculo"
    },
    {
      "kind": "text",
      "text": "Isso torna a ferramenta útil tanto para quem executa dimensionamentos quanto para quem está estudando, revisando conceitos ou conferindo cálculos."
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "O objetivo não é esconder o raciocínio."
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "É organizá-lo."
    }
  ],
  [
    {
      "kind": "heading",
      "level": 1,
      "text": "Do dado do motor ao resultado final"
    },
    {
      "kind": "text",
      "text": "Dentro do Dimensionador Expert você encontra recursos para auxiliar em:"
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "⚡ Corrente nominal e corrente de projeto"
    },
    {
      "kind": "text",
      "text": "Organize os dados necessários para avançar no dimensionamento."
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "🔌 Dimensionamento de condutores"
    },
    {
      "kind": "text",
      "text": "Consulte o resultado de acordo com os critérios considerados pela ferramenta."
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "📉 Queda de tensão"
    },
    {
      "kind": "text",
      "text": "Verifique a queda de tensão calculada para as condições informadas."
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "🛡️ Proteção"
    },
    {
      "kind": "text",
      "text": "Tenha as informações de proteção integradas ao dimensionamento."
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "⚙️ Contatores e relés"
    },
    {
      "kind": "text",
      "text": "Consulte os dispositivos relacionados às características informadas."
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "🔎 Referências de componentes"
    },
    {
      "kind": "text",
      "text": "Encontre opções disponíveis no catálogo interno da ferramenta sem começar uma nova busca a cada etapa."
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "🧮 Memória de cálculo"
    },
    {
      "kind": "text",
      "text": "Consulte como determinados resultados foram obtidos."
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "📁 Histórico"
    },
    {
      "kind": "text",
      "text": "Mantenha seus dimensionamentos reunidos para futuras consultas."
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "📄 Documentação"
    },
    {
      "kind": "text",
      "text": "Transforme as informações do dimensionamento em um documento organizado."
    }
  ],
  [
    {
      "kind": "heading",
      "level": 1,
      "text": "E na hora de procurar os componentes?"
    },
    {
      "kind": "text",
      "text": "Depois de fazer os cálculos, ainda existe outro trabalho:"
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Encontrar referências compatíveis."
    },
    {
      "kind": "text",
      "text": "Sem uma ferramenta centralizada, isso normalmente significa abrir catálogos e começar outra sequência de pesquisas."
    },
    {
      "kind": "text",
      "text": "No Dimensionador Expert, você pode consultar opções existentes no catálogo interno da ferramenta de fabricantes como:"
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "WEG"
    },
    {
      "kind": "shot",
      "text": "Componente — WEG"
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "SIEMENS"
    },
    {
      "kind": "shot",
      "text": "Componente — SIEMENS"
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "SCHNEIDER"
    },
    {
      "kind": "shot",
      "text": "Componente — SCHNEIDER"
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Menos tempo procurando catálogo por catálogo."
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "Mais continuidade no seu dimensionamento."
    },
    {
      "kind": "text",
      "text": "As referências apresentadas devem ser verificadas pelo profissional antes da especificação final e aquisição."
    }
  ],
  [
    {
      "kind": "heading",
      "level": 1,
      "text": "Termine o dimensionamento com as informações organizadas"
    },
    {
      "kind": "text",
      "text": "O trabalho não precisa acabar em um monte de números espalhados em anotações."
    },
    {
      "kind": "text",
      "text": "Depois do dimensionamento, utilize as informações do sistema para gerar documentação contendo dados como:"
    },
    {
      "kind": "list",
      "items": [
        "Identificação do projeto;",
        "Informações da carga;",
        "Resultados do dimensionamento;",
        "Componentes;",
        "Critérios utilizados;",
        "Informações profissionais."
      ]
    },
    {
      "kind": "shot",
      "text": "Documentação do dimensionamento"
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Porque um trabalho técnico bem apresentado também comunica profissionalismo."
    }
  ],
  [
    {
      "kind": "heading",
      "level": 1,
      "text": "Coloque os dois processos lado a lado"
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Sem o Dimensionador Expert"
    },
    {
      "kind": "negative",
      "items": [
        "Consultar informações separadamente",
        "Alternar entre diferentes ferramentas",
        "Procurar referências manualmente em catálogos",
        "Organizar resultados em anotações separadas",
        "Montar a documentação manualmente"
      ]
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Com o Dimensionador Expert"
    },
    {
      "kind": "list",
      "items": [
        "Fluxo centralizado",
        "Resultados organizados",
        "Memória dos cálculos disponíveis",
        "Referências de componentes reunidas",
        "Histórico de dimensionamentos",
        "Documentação integrada"
      ]
    },
    {
      "kind": "heading",
      "level": 1,
      "text": "O dimensionador não faz o profissional deixar de pensar."
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Ele evita que o profissional precise espalhar o trabalho entre vários lugares."
    }
  ],
  [
    {
      "kind": "heading",
      "level": 1,
      "text": "Para quem é o Dimensionador Expert?"
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "Eletricistas"
    },
    {
      "kind": "text",
      "text": "Que realizam serviços envolvendo motores e comandos e querem organizar melhor seus dimensionamentos."
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "Técnicos em eletrotécnica"
    },
    {
      "kind": "text",
      "text": "Que trabalham com motores, comandos, instalações ou projetos elétricos."
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "Engenheiros e projetistas"
    },
    {
      "kind": "text",
      "text": "Que desejam uma ferramenta complementar para apoiar cálculos, consultas e especificações."
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "Estudantes"
    },
    {
      "kind": "text",
      "text": "Que querem acompanhar os cálculos e compreender melhor o processo por trás do dimensionamento."
    }
  ],
  [
    {
      "kind": "heading",
      "level": 1,
      "text": "Agora veja o que você recebe ao liberar seu acesso"
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "6 Meses de Dimensionador Expert"
    },
    {
      "kind": "text",
      "text": "Durante o período de acesso, você poderá utilizar:"
    },
    {
      "kind": "list",
      "items": [
        "Plataforma online",
        "Dimensionamentos disponíveis durante o período contratado",
        "Dimensionamento de condutores",
        "Verificação de queda de tensão",
        "Proteção",
        "Contatores e relés",
        "Consulta aos componentes disponíveis na ferramenta",
        "Memória dos cálculos disponíveis",
        "Histórico de projetos",
        "Geração de documentação",
        "Atualizações disponibilizadas durante seu período de acesso"
      ]
    },
    {
      "kind": "heading",
      "level": 1,
      "text": "Condição de lançamento"
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Acesso fundador"
    },
    {
      "kind": "text",
      "text": "Estamos formando o primeiro grupo de usuários do Dimensionador Expert."
    },
    {
      "kind": "text",
      "text": "Por isso, neste momento, você pode liberar:"
    },
    {
      "kind": "heading",
      "level": 1,
      "text": "6 Meses de acesso"
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Por um único pagamento de"
    },
    {
      "kind": "heading",
      "level": 1,
      "text": "R$ 37,00"
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "Sem mensalidade."
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "Sem renovação automática durante os 6 meses contratados."
    },
    {
      "kind": "cta",
      "text": "Liberar meu acesso por R$ 37"
    },
    {
      "kind": "text",
      "text": "Acesso válido por 6 meses a partir da ativação."
    }
  ],
  [
    {
      "kind": "heading",
      "level": 1,
      "text": "Por que R$ 37?"
    },
    {
      "kind": "text",
      "text": "O Dimensionador Expert está entrando em uma nova fase."
    },
    {
      "kind": "text",
      "text": "Em vez de esperar que a plataforma esteja “perfeita” para colocá-la no mercado, queremos que os primeiros profissionais e estudantes utilizem a ferramenta em situações reais."
    },
    {
      "kind": "text",
      "text": "Esse primeiro grupo é importante porque:"
    },
    {
      "kind": "text",
      "text": "Você utiliza a ferramenta."
    },
    {
      "kind": "text",
      "text": "Nós recebemos feedback do uso real."
    },
    {
      "kind": "text",
      "text": "O produto continua evoluindo."
    },
    {
      "kind": "text",
      "text": "Por isso estamos disponibilizando esta condição inicial:"
    },
    {
      "kind": "heading",
      "level": 1,
      "text": "R$ 37 por 6 meses."
    },
    {
      "kind": "text",
      "text": "Não é uma assinatura mensal."
    },
    {
      "kind": "text",
      "text": "Não haverá renovação automática durante o período contratado."
    },
    {
      "kind": "text",
      "text": "É um pagamento único para liberar os 6 meses de acesso."
    }
  ],
  [
    {
      "kind": "heading",
      "level": 1,
      "text": "Pense no seu próximo dimensionamento"
    },
    {
      "kind": "text",
      "text": "Você pode continuar alternando entre:"
    },
    {
      "kind": "text",
      "text": "calculadora → tabela → catálogo → anotações → documento"
    },
    {
      "kind": "text",
      "text": "Ou pode colocar os dados do projeto em um ambiente criado justamente para organizar essas etapas."
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Essa é a proposta do Dimensionador Expert."
    },
    {
      "kind": "text",
      "text": "Não substituir seu conhecimento técnico."
    },
    {
      "kind": "text",
      "text": "Não tomar decisões profissionais por você."
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Mas colocar cálculos, resultados, componentes e documentação mais perto uns dos outros."
    },
    {
      "kind": "heading",
      "level": 1,
      "text": "Por R$ 37,00, você pode usar o Dimensionador Expert durante 6 meses."
    },
    {
      "kind": "cta",
      "text": "Quero liberar meu acesso"
    },
    {
      "kind": "text",
      "text": "Pagamento único • Sem mensalidade • Sem renovação automática"
    }
  ],
  [
    {
      "kind": "heading",
      "level": 1,
      "text": "Seu próximo dimensionamento pode ser mais organizado."
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Centralize cálculos, resultados, componentes e documentação em um único ambiente."
    },
    {
      "kind": "heading",
      "level": 1,
      "text": "Dimensionador Expert"
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "6 Meses de acesso"
    },
    {
      "kind": "heading",
      "level": 1,
      "text": "R$ 37,00"
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "Pagamento único"
    },
    {
      "kind": "cta",
      "text": "Quero acessar o Dimensionador Expert"
    },
    {
      "kind": "text",
      "text": "Sem mensalidade • Sem renovação automática"
    },
    {
      "kind": "text",
      "text": "Ferramenta de apoio técnico. Os resultados devem ser verificados pelo profissional considerando as características reais da instalação e as normas aplicáveis."
    }
  ]
];
