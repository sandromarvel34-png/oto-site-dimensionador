import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, Fragment, type ReactNode } from "react";
import { Zap, ArrowRight, Check, Monitor, X } from "lucide-react";
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
      className={`inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-soft transition hover:-translate-y-0.5 hover:bg-primary/90 active:translate-y-0 sm:w-auto ${className}`}
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
    <section id={id} className={`px-5 py-20 sm:py-24 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

function Heading({ eyebrow, title, text, center }: { eyebrow?: string; title: string; text?: ReactNode; center?: boolean }) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-primary">{eyebrow}</p>}
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
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground"><Zap className="h-4 w-4" /></span>
            <span className="truncate font-semibold">Dimensionador Expert</span>
          </div>
          <button onClick={() => goToCheckout("header")} className="hidden shrink-0 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 sm:inline-flex">
            Liberar meu acesso
          </button>
        </div>
      </header>

      {COPY_SECTIONS.map((blocks, sectionIndex) => (
        <Fragment key={sectionIndex}>
        {sectionIndex === COPY_SECTIONS.length - 1 && <Section><Heading center title="Perguntas frequentes" /><Accordion type="single" collapsible className="mx-auto mt-10 max-w-3xl">{FAQ.map(([q,a],i) => <AccordionItem key={q} value={`q${i}`}><AccordionTrigger className="text-left text-base font-semibold">{q}</AccordionTrigger><AccordionContent className="text-base leading-relaxed text-muted-foreground">{a}</AccordionContent></AccordionItem>)}</Accordion></Section>}
        <Section id={sectionIndex === 0 ? "topo" : sectionIndex === 2 ? "pratica" : blocks.some((b) => b.kind === "heading" && b.text === "CONDIÇÃO DE LANÇAMENTO") ? "oferta" : undefined} className={sectionIndex % 2 ? "bg-secondary" : ""}>
          <div className="mx-auto max-w-4xl space-y-6">
            {blocks.map((block, blockIndex) => {
              if (block.kind === "heading") {
                const style = block.level === 1 ? "text-3xl font-bold leading-tight tracking-tight sm:text-4xl" : block.level === 2 ? "text-xl font-semibold leading-relaxed sm:text-2xl" : "text-lg font-semibold text-primary";
                return sectionIndex === 0 && blockIndex === 0 ? <h1 key={blockIndex} className={style}>{block.text}</h1> : block.level === 3 ? <h3 key={blockIndex} className={style}>{block.text}</h3> : <h2 key={blockIndex} className={style}>{block.text}</h2>;
              }
              if (block.kind === "cta") return <div key={blockIndex} className="pt-2"><CTA source={`copy-${sectionIndex}-${blockIndex}`}>{block.text}</CTA></div>;
              if (block.kind === "shot") return <Shot key={blockIndex} label={block.text ?? "Dimensionador Expert"} />;
              if (block.kind === "negative") return <ul key={blockIndex} className="space-y-3">{block.items?.map((item) => <li key={item} className="flex items-start gap-3 text-muted-foreground"><X className="mt-1 h-4 w-4 shrink-0" />{item}</li>)}</ul>;
              if (block.kind === "list") return <ul key={blockIndex} className="grid gap-3 sm:grid-cols-2">{block.items?.map((item) => <CheckItem key={item}>{item}</CheckItem>)}</ul>;
              if (block.kind === "quote") return <blockquote key={blockIndex} className="border-l-4 border-primary bg-secondary p-5 text-xl font-semibold">{block.text}</blockquote>;
              return <p key={blockIndex} className="whitespace-pre-line text-base leading-relaxed text-muted-foreground sm:text-lg">{block.text}</p>;
            })}
          </div>
        </Section>
        </Fragment>
      ))}
      {/* Rodapé */}
      <footer className="border-t border-border px-5 py-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground"><Zap className="h-4 w-4" /></span>
              <span className="font-semibold">Dimensionador Expert</span>
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
          <p className="mt-2">© {new Date().getFullYear()} Dimensionador Expert — Academia do Eletricista. Todos os direitos reservados.</p>
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


type CopyBlock = { kind: string; text?: string; level?: number; items?: string[] };
const COPY_SECTIONS: CopyBlock[][] = [
  [
    {
      "kind": "heading",
      "level": 1,
      "text": "PARE DE PERDER TEMPO ENTRE CÁLCULOS, TABELAS E CATÁLOGOS PARA DIMENSIONAR COMANDOS ELÉTRICOS"
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
      "text": "QUERO ACESSAR O DIMENSIONADOR EXPERT"
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
      "text": "QUANTO TEMPO VOCÊ PERDE EM CADA DIMENSIONAMENTO?"
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
      "text": "CÁLCULO"
    },
    {
      "kind": "text",
      "text": "TABELA"
    },
    {
      "kind": "text",
      "text": "CATÁLOGO"
    },
    {
      "kind": "text",
      "text": "OUTRO CÁLCULO"
    },
    {
      "kind": "text",
      "text": "OUTRO CATÁLOGO"
    },
    {
      "kind": "text",
      "text": "ANOTAÇÕES"
    },
    {
      "kind": "text",
      "text": "DOCUMENTAÇÃO"
    },
    {
      "kind": "text",
      "text": "O problema não é fazer uma dessas tarefas."
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "É TER QUE INTERROMPER O RACIOCÍNIO O TEMPO TODO PARA FAZER TODAS ELAS."
    },
    {
      "kind": "text",
      "text": "Foi para centralizar esse processo que criamos o:"
    },
    {
      "kind": "heading",
      "level": 1,
      "text": "DIMENSIONADOR EXPERT"
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
      "text": "VEJA COMO UM DIMENSIONAMENTO ACONTECE NA PRÁTICA"
    },
    {
      "kind": "text",
      "text": "Não queremos apenas dizer que a ferramenta economiza etapas."
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "QUEREMOS MOSTRAR."
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "1 — INFORME OS DADOS"
    },
    {
      "kind": "text",
      "text": "Preencha os dados necessários do motor e da instalação."
    },
    {
      "kind": "shot",
      "text": "TELA DE ENTRADA"
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "2 — EXECUTE O DIMENSIONAMENTO"
    },
    {
      "kind": "text",
      "text": "A ferramenta processa as informações inseridas e organiza os resultados do dimensionamento."
    },
    {
      "kind": "shot",
      "text": "BOTÃO/TELA DE DIMENSIONAMENTO"
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "3 — ANALISE OS RESULTADOS"
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
      "text": "RESULTADO"
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "4 — CONSULTE COMPONENTES"
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
      "text": "5 — GERE A DOCUMENTAÇÃO"
    },
    {
      "kind": "text",
      "text": "Organize os dados do projeto, resultados, componentes e informações profissionais em um documento para consulta, arquivo ou apresentação."
    },
    {
      "kind": "shot",
      "text": "PDF GERADO"
    },
    {
      "kind": "heading",
      "level": 1,
      "text": "DADOS → DIMENSIONAMENTO → RESULTADOS → COMPONENTES → DOCUMENTAÇÃO"
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "EM VEZ DE ESPALHAR O PROCESSO ENTRE VÁRIAS FERRAMENTAS, VOCÊ CONCENTRA AS PRINCIPAIS ETAPAS EM UM ÚNICO AMBIENTE."
    },
    {
      "kind": "cta",
      "text": "QUERO FAZER MEU PRÓXIMO DIMENSIONAMENTO"
    }
  ],
  [
    {
      "kind": "heading",
      "level": 1,
      "text": "NÃO RECEBA APENAS UM NÚMERO."
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "VEJA COMO O RESULTADO FOI CONSTRUÍDO."
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
      "text": "O OBJETIVO NÃO É ESCONDER O RACIOCÍNIO."
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "É ORGANIZÁ-LO."
    }
  ],
  [
    {
      "kind": "heading",
      "level": 1,
      "text": "DO DADO DO MOTOR AO RESULTADO FINAL"
    },
    {
      "kind": "text",
      "text": "Dentro do Dimensionador Expert você encontra recursos para auxiliar em:"
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "⚡ CORRENTE NOMINAL E CORRENTE DE PROJETO"
    },
    {
      "kind": "text",
      "text": "Organize os dados necessários para avançar no dimensionamento."
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "🔌 DIMENSIONAMENTO DE CONDUTORES"
    },
    {
      "kind": "text",
      "text": "Consulte o resultado de acordo com os critérios considerados pela ferramenta."
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "📉 QUEDA DE TENSÃO"
    },
    {
      "kind": "text",
      "text": "Verifique a queda de tensão calculada para as condições informadas."
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "🛡️ PROTEÇÃO"
    },
    {
      "kind": "text",
      "text": "Tenha as informações de proteção integradas ao dimensionamento."
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "⚙️ CONTATORES E RELÉS"
    },
    {
      "kind": "text",
      "text": "Consulte os dispositivos relacionados às características informadas."
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "🔎 REFERÊNCIAS DE COMPONENTES"
    },
    {
      "kind": "text",
      "text": "Encontre opções disponíveis no catálogo interno da ferramenta sem começar uma nova busca a cada etapa."
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "🧮 MEMÓRIA DE CÁLCULO"
    },
    {
      "kind": "text",
      "text": "Consulte como determinados resultados foram obtidos."
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "📁 HISTÓRICO"
    },
    {
      "kind": "text",
      "text": "Mantenha seus dimensionamentos reunidos para futuras consultas."
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "📄 DOCUMENTAÇÃO"
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
      "text": "E NA HORA DE PROCURAR OS COMPONENTES?"
    },
    {
      "kind": "text",
      "text": "Depois de fazer os cálculos, ainda existe outro trabalho:"
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "ENCONTRAR REFERÊNCIAS COMPATÍVEIS."
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
      "text": "MENOS TEMPO PROCURANDO CATÁLOGO POR CATÁLOGO."
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "MAIS CONTINUIDADE NO SEU DIMENSIONAMENTO."
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
      "text": "TERMINE O DIMENSIONAMENTO COM AS INFORMAÇÕES ORGANIZADAS"
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
      "text": "PORQUE UM TRABALHO TÉCNICO BEM APRESENTADO TAMBÉM COMUNICA PROFISSIONALISMO."
    }
  ],
  [
    {
      "kind": "heading",
      "level": 1,
      "text": "COLOQUE OS DOIS PROCESSOS LADO A LADO"
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "SEM O DIMENSIONADOR EXPERT"
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
      "text": "COM O DIMENSIONADOR EXPERT"
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
      "text": "O DIMENSIONADOR NÃO FAZ O PROFISSIONAL DEIXAR DE PENSAR."
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "ELE EVITA QUE O PROFISSIONAL PRECISE ESPALHAR O TRABALHO ENTRE VÁRIOS LUGARES."
    }
  ],
  [
    {
      "kind": "heading",
      "level": 1,
      "text": "PARA QUEM É O DIMENSIONADOR EXPERT?"
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "ELETRICISTAS"
    },
    {
      "kind": "text",
      "text": "Que realizam serviços envolvendo motores e comandos e querem organizar melhor seus dimensionamentos."
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "TÉCNICOS EM ELETROTÉCNICA"
    },
    {
      "kind": "text",
      "text": "Que trabalham com motores, comandos, instalações ou projetos elétricos."
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "ENGENHEIROS E PROJETISTAS"
    },
    {
      "kind": "text",
      "text": "Que desejam uma ferramenta complementar para apoiar cálculos, consultas e especificações."
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "ESTUDANTES"
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
      "text": "AGORA VEJA O QUE VOCÊ RECEBE AO LIBERAR SEU ACESSO"
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "6 MESES DE DIMENSIONADOR EXPERT"
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
      "text": "CONDIÇÃO DE LANÇAMENTO"
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "ACESSO FUNDADOR"
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
      "text": "6 MESES DE ACESSO"
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "POR UM ÚNICO PAGAMENTO DE"
    },
    {
      "kind": "heading",
      "level": 1,
      "text": "R$ 37,00"
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "SEM MENSALIDADE."
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "SEM RENOVAÇÃO AUTOMÁTICA DURANTE OS 6 MESES CONTRATADOS."
    },
    {
      "kind": "cta",
      "text": "LIBERAR MEU ACESSO POR R$ 37"
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
      "text": "POR QUE R$ 37?"
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
      "text": "VOCÊ UTILIZA A FERRAMENTA."
    },
    {
      "kind": "text",
      "text": "NÓS RECEBEMOS FEEDBACK DO USO REAL."
    },
    {
      "kind": "text",
      "text": "O PRODUTO CONTINUA EVOLUINDO."
    },
    {
      "kind": "text",
      "text": "Por isso estamos disponibilizando esta condição inicial:"
    },
    {
      "kind": "heading",
      "level": 1,
      "text": "R$ 37 POR 6 MESES."
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
      "text": "PENSE NO SEU PRÓXIMO DIMENSIONAMENTO"
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
      "text": "ESSA É A PROPOSTA DO DIMENSIONADOR EXPERT."
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
      "text": "MAS COLOCAR CÁLCULOS, RESULTADOS, COMPONENTES E DOCUMENTAÇÃO MAIS PERTO UNS DOS OUTROS."
    },
    {
      "kind": "heading",
      "level": 1,
      "text": "POR R$ 37,00, VOCÊ PODE USAR O DIMENSIONADOR EXPERT DURANTE 6 MESES."
    },
    {
      "kind": "cta",
      "text": "QUERO LIBERAR MEU ACESSO"
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
      "text": "SEU PRÓXIMO DIMENSIONAMENTO PODE SER MAIS ORGANIZADO."
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "CENTRALIZE CÁLCULOS, RESULTADOS, COMPONENTES E DOCUMENTAÇÃO EM UM ÚNICO AMBIENTE."
    },
    {
      "kind": "heading",
      "level": 1,
      "text": "DIMENSIONADOR EXPERT"
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "6 MESES DE ACESSO"
    },
    {
      "kind": "heading",
      "level": 1,
      "text": "R$ 37,00"
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "PAGAMENTO ÚNICO"
    },
    {
      "kind": "cta",
      "text": "QUERO ACESSAR O DIMENSIONADOR EXPERT"
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
