import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  Check,
  Calculator,
  Cable,
  ShieldCheck,
  Settings2,
  FileText,
  History,
  Layers3,
  BookOpen,
  Monitor,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  goToCheckout,
  SUPPORT_URL,
  TERMS_URL,
  PRIVACY_URL,
  VIDEO_EMBED_URL,
  PDF_EXAMPLE_URL,
} from "@/lib/site-config";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dimensionador Expert | Dimensionamento de Comandos Elétricos" },
      {
        name: "description",
        content:
          "Centralize o dimensionamento de condutores, proteções e componentes, com memória de cálculo e documentação. R$ 37 por 6 meses.",
      },
      { property: "og:title", content: "Dimensionador Expert | Do motor à documentação" },
      {
        property: "og:description",
        content:
          "Cálculos, componentes e documentação em um único ambiente. Acesso por 6 meses com pagamento único.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: SalesPage,
});

function Brand() {
  return (
    <div className="de-brand">
      <img
        src="/logo-academia-eletricista.svg"
        alt="Academia do Eletricista"
        width="62"
        height="33"
      />
      <div>
        <strong>Dimensionador Expert</strong>
        <span>COMANDOS ELÉTRICOS</span>
      </div>
    </div>
  );
}
function CTA({
  children = "Quero acessar o Dimensionador",
  source,
  className = "",
}: {
  children?: ReactNode;
  source: string;
  className?: string;
}) {
  return (
    <button type="button" className={`de-cta ${className}`} onClick={() => goToCheckout(source)}>
      {children}
      <ArrowUpRight size={19} aria-hidden="true" />
    </button>
  );
}
function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`de-section ${className}`}>
      <div className="de-container">{children}</div>
    </section>
  );
}
function Intro({ label, title, children }: { label: string; title: string; children?: ReactNode }) {
  return (
    <div className="de-intro">
      <span className="de-eyebrow">{label}</span>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

const benefits = [
  {
    icon: Cable,
    title: "Condutores e queda de tensão",
    text: "Consulte a seção recomendada e a queda de tensão calculada para as condições informadas.",
  },
  {
    icon: ShieldCheck,
    title: "Proteção, contatores e relés",
    text: "Reúna as informações de proteção e dos dispositivos relacionados ao dimensionamento.",
  },
  {
    icon: Settings2,
    title: "Referências de componentes",
    text: "Consulte as opções disponíveis no catálogo interno, com referências de WEG, Siemens e Schneider.",
  },
  {
    icon: BookOpen,
    title: "Memória de cálculo",
    text: "Acompanhe os critérios e cálculos apresentados pelo sistema para conferir os resultados.",
  },
  {
    icon: History,
    title: "Histórico de dimensionamentos",
    text: "Mantenha seus dimensionamentos reunidos e retome os trabalhos anteriores para consulta.",
  },
  {
    icon: FileText,
    title: "Documentação organizada",
    text: "Gere documentos com dados do projeto, resultados e informações profissionais.",
  },
];
const faq = [
  [
    "O que é o Dimensionador Expert?",
    "É uma ferramenta online de apoio ao dimensionamento de comandos elétricos. Reúne cálculos, resultados, referências de componentes e documentação em um único ambiente.",
  ],
  [
    "O pagamento de R$ 37 é mensal?",
    "Não. A oferta é de R$ 37 em pagamento único por 6 meses de acesso, contados a partir da ativação.",
  ],
  [
    "O acesso renova automaticamente?",
    "Não nesta oferta. Ao final dos 6 meses, você poderá contratar um novo período se desejar continuar utilizando a ferramenta.",
  ],
  [
    "Preciso instalar? Posso usar no celular?",
    "O sistema funciona online pelo navegador, com interface responsiva para computadores, tablets e smartphones. É necessária conexão com a internet.",
  ],
  [
    "Quais fabricantes aparecem no catálogo?",
    "O catálogo reúne referências disponíveis de fabricantes como WEG, Siemens e Schneider. A disponibilidade depende dos componentes cadastrados no sistema.",
  ],
  [
    "Posso consultar os cálculos e gerar documentos?",
    "Sim. Você pode consultar as memórias de cálculo disponíveis e gerar documentação relacionada ao dimensionamento.",
  ],
  [
    "A ferramenta substitui a análise do profissional?",
    "Não. Os resultados devem ser conferidos pelo profissional responsável, considerando as condições reais da instalação, as especificações dos fabricantes e as normas aplicáveis.",
  ],
  [
    "As atualizações estão incluídas?",
    "As atualizações disponibilizadas durante os seus 6 meses de acesso estão incluídas.",
  ],
];

/** Diagrama editorial dos recursos, sem simular resultados ou uma tela real. */
function ProductFlow() {
  return (
    <div className="de-product-flow">
      <div className="de-flow-top">
        <Layers3 size={18} />
        <span>UM AMBIENTE. UM FLUXO.</span>
      </div>
      <div className="de-flow-heading">
        <span className="de-eyebrow">Dimensionador Expert</span>
        <h2>
          Do motor à<br />
          <em>documentação.</em>
        </h2>
      </div>
      <div className="de-flow-steps">
        {[
          {
            icon: Calculator,
            title: "Dados & dimensionamento",
            note: "Motor e condições da instalação",
          },
          {
            icon: ShieldCheck,
            title: "Resultados & componentes",
            note: "Condutores, proteção e dispositivos",
          },
          {
            icon: FileText,
            title: "Memória & documentação",
            note: "Critérios e informações organizadas",
          },
        ].map(({ icon: Icon, title, note }, i) => (
          <div className="de-flow-step" key={title}>
            <span className="de-flow-icon">
              <Icon size={22} />
            </span>
            <div>
              <strong>{title}</strong>
              <p>{note}</p>
            </div>
            <span className="de-flow-number">0{i + 1}</span>
          </div>
        ))}
      </div>
      <div className="de-flow-foot">
        <Monitor size={15} />
        Ferramenta online de apoio técnico
      </div>
    </div>
  );
}

function SalesPage() {
  const [showBar, setShowBar] = useState(false);
  useEffect(() => {
    const hero = document.getElementById("topo");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) =>
      setShowBar(entry ? !entry.isIntersecting : false),
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);
  return (
    <div className="de-page">
      <header className="de-header">
        <div className="de-container de-header-inner">
          <Brand />
          <nav aria-label="Navegação principal">
            <a href="#como-funciona">Como funciona</a>
            <a href="#recursos">Recursos</a>
          </nav>
          <CTA source="header">Liberar meu acesso</CTA>
        </div>
      </header>
      <Section id="topo" className="de-hero">
        <div className="de-hero-grid">
          <div>
            <span className="de-eyebrow">
              <span className="de-dot" />
              PARA QUEM TRABALHA COM COMANDOS ELÉTRICOS
            </span>
            <h1>
              Seu dimensionamento.
              <br />
              <span>Em um só lugar.</span>
            </h1>
            <p className="de-hero-description">
              Centralize o dimensionamento de condutores, proteções e componentes — com memória de
              cálculo e documentação organizada.
            </p>
            <ul className="de-hero-checks">
              {[
                "Dados do motor e da instalação",
                "Resultados e referências de componentes",
                "Histórico e documentação",
              ].map((text) => (
                <li key={text}>
                  <Check size={17} />
                  {text}
                </li>
              ))}
            </ul>
            <div className="de-hero-action">
              <CTA source="hero" />
              <a href="#como-funciona" className="de-text-link">
                Conhecer a ferramenta <ChevronRight size={16} />
              </a>
            </div>
            <p className="de-price-note">
              <strong>R$ 37</strong> por 6 meses <span>·</span> Pagamento único
            </p>
          </div>
          <ProductFlow />
        </div>
        <div className="de-hero-strip">
          <span>
            <Calculator size={17} />
            Cálculos reunidos
          </span>
          <span>
            <Settings2 size={17} />
            Referências de componentes
          </span>
          <span>
            <FileText size={17} />
            Documentação integrada
          </span>
        </div>
      </Section>
      <Section className="de-problem">
        <div className="de-problem-grid">
          <div>
            <span className="de-eyebrow">MENOS INTERRUPÇÕES</span>
            <h2>
              Uma consulta aqui.
              <br />
              Outra ali.
              <br />
              <span>O raciocínio fica pelo caminho.</span>
            </h2>
            <p>
              Entre cálculos, tabelas, catálogos e anotações, o trabalho exige voltar às mesmas
              informações várias vezes.
            </p>
            <p>
              O Dimensionador Expert reúne as principais etapas para você acompanhar o processo com
              mais continuidade.
            </p>
          </div>
          <div className="de-consultations">
            <div className="de-consultations-label">
              <RotateCcw size={16} />
              Consultas espalhadas
            </div>
            <div
              className="de-zigzag"
              aria-label="Consultas com retornos entre cálculo, tabela e catálogo"
            >
              <span>Cálculo</span>
              <span className="de-return" aria-label="ida e volta">
                ↔
              </span>
              <span>Tabela</span>
              <span className="de-down" aria-hidden="true">
                ↕
              </span>
              <span>Outro cálculo</span>
              <span className="de-return" aria-label="ida e volta">
                ↔
              </span>
              <span>Catálogo</span>
              <span className="de-down de-down-left" aria-hidden="true">
                ↕
              </span>
              <span>Anotações</span>
              <span className="de-return" aria-label="ida e volta">
                ↔
              </span>
              <span>Documentação</span>
            </div>
            <div className="de-central-flow">
              <Layers3 size={20} />
              <div>
                <strong>No Dimensionador Expert</strong>
                <p>Dados → resultados → documentação</p>
              </div>
            </div>
          </div>
        </div>
      </Section>
      <Section id="como-funciona">
        <Intro label="COMO FUNCIONA" title="Um processo com começo, meio e entrega.">
          Informe as condições do projeto, confira os resultados e organize a documentação.
        </Intro>
        <div className="de-steps">
          {[
            {
              icon: Calculator,
              title: "Informe os dados",
              text: "Preencha as informações do motor e as condições da instalação.",
            },
            {
              icon: ShieldCheck,
              title: "Confira o dimensionamento",
              text: "Consulte condutores, queda de tensão, proteção e referências de componentes.",
            },
            {
              icon: FileText,
              title: "Organize a entrega",
              text: "Acompanhe a memória de cálculo e gere a documentação do dimensionamento.",
            },
          ].map(({ icon: Icon, title, text }, i) => (
            <article className="de-step" key={title}>
              <div className="de-step-top">
                <span>0{i + 1}</span>
                <Icon size={24} />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        {VIDEO_EMBED_URL && (
          <div className="de-video">
            <iframe
              src={VIDEO_EMBED_URL}
              title="Demonstração real do Dimensionador Expert"
              loading="lazy"
              allow="fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </Section>
      <Section id="recursos" className="de-soft">
        <Intro label="RECURSOS DA FERRAMENTA" title="As informações que você precisa, reunidas.">
          Do cálculo à consulta de componentes, com recursos para acompanhar e registrar seu
          trabalho.
        </Intro>
        <div className="de-benefits">
          {benefits.map(({ icon: Icon, title, text }) => (
            <article className="de-benefit" key={title}>
              <span className="de-icon">
                <Icon size={23} />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <p className="de-catalog-note">
          As referências de fabricantes devem ser conferidas antes da especificação final e da
          aquisição.
        </p>
      </Section>
      <Section className="de-doc-section">
        <div className="de-document-grid">
          <div>
            <span className="de-eyebrow">DO RESULTADO AO REGISTRO</span>
            <h2>
              Seu trabalho merece
              <br />
              uma entrega organizada.
            </h2>
            <p>
              Reúna os dados do projeto e os resultados do dimensionamento em documentos para
              consulta, arquivo ou apresentação.
            </p>
            <ul className="de-document-checks">
              {[
                "Identificação do projeto e informações da carga",
                "Resultados e componentes",
                "Critérios e informações profissionais",
              ].map((text) => (
                <li key={text}>
                  <Check size={17} />
                  {text}
                </li>
              ))}
            </ul>
            {PDF_EXAMPLE_URL && (
              <a className="de-text-link" href={PDF_EXAMPLE_URL} target="_blank" rel="noreferrer">
                Ver documento real de exemplo <ArrowUpRight size={17} />
              </a>
            )}
          </div>
          <div
            className="de-document-art"
            aria-label="Esquema das informações reunidas na documentação"
          >
            <div className="de-paper">
              <div className="de-paper-brand">
                <FileText size={23} />
                <span>
                  DOCUMENTAÇÃO
                  <br />
                  <strong>Dimensionador Expert</strong>
                </span>
              </div>
              <div className="de-paper-rule" />
              {[
                "Dados do projeto",
                "Resultados do dimensionamento",
                "Componentes e critérios",
                "Informações profissionais",
              ].map((text, i) => (
                <div className="de-paper-row" key={text}>
                  <span>0{i + 1}</span>
                  <strong>{text}</strong>
                  <Check size={16} />
                </div>
              ))}
              <p className="de-paper-caption">Esquema de conteúdo · não representa um PDF gerado</p>
            </div>
          </div>
        </div>
      </Section>
      <Section className="de-author-section">
        <div className="de-author-grid">
          <div className="de-author-mark">
            <BookOpen size={38} />
            <strong>26+</strong>
            <span>ANOS DE EXPERIÊNCIA</span>
          </div>
          <div>
            <span className="de-eyebrow">CONHECIMENTO APLICADO À PRÁTICA</span>
            <h2>
              Por quem conhece
              <br />o trabalho e a sala de aula.
            </h2>
            <p>
              Uma ferramenta da Academia do Eletricista, criada por Sandro Nogueira, engenheiro
              eletricista e professor com mais de 26 anos de experiência.
            </p>
            <p>
              Para eletricistas, técnicos, engenheiros, projetistas e estudantes que trabalham ou
              estudam dimensionamento de comandos elétricos.
            </p>
          </div>
        </div>
      </Section>
      <Section id="oferta" className="de-offer-section">
        <div className="de-offer-grid">
          <div>
            <span className="de-eyebrow">SEU PRÓXIMO DIMENSIONAMENTO</span>
            <h2>
              Comece com
              <br />6 meses de acesso.
            </h2>
            <p>
              Tenha os recursos do Dimensionador Expert disponíveis em um único ambiente, com
              pagamento único e sem mensalidade.
            </p>
            <ul className="de-offer-checks">
              {[
                "Dimensionamento e consulta de componentes",
                "Memórias de cálculo disponíveis",
                "Histórico e geração de documentação",
                "Atualizações disponibilizadas no período",
              ].map((text) => (
                <li key={text}>
                  <Check size={18} />
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <div className="de-offer-card">
            <span className="de-offer-tag">DIMENSIONADOR EXPERT</span>
            <h3>Acesso por 6 meses</h3>
            <p className="de-offer-price">
              <span>R$</span> 37<span>,00</span>
            </p>
            <p className="de-offer-payment">Um único pagamento. Sem mensalidade.</p>
            <CTA source="offer">Liberar meu acesso por R$ 37</CTA>
            <div className="de-offer-conditions">
              <p>
                <Check size={15} />6 meses a partir da ativação
              </p>
              <p>
                <Check size={15} />
                Sem renovação automática
              </p>
              <p>
                <Monitor size={15} />
                Acesso online pelo navegador
              </p>
            </div>
          </div>
        </div>
      </Section>
      <Section id="perguntas">
        <Intro label="ANTES DE COMEÇAR" title="Perguntas frequentes" />
        <Accordion type="single" collapsible className="de-faq">
          {faq.map(([q, a], i) => (
            <AccordionItem key={q} value={`faq-${i}`}>
              <AccordionTrigger className="text-left text-base font-semibold">{q}</AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                {a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="de-final">
          <h3>Mais continuidade no seu próximo dimensionamento.</h3>
          <CTA source="final" />
          <p>R$ 37 · 6 meses · Pagamento único</p>
        </div>
      </Section>
      <footer className="de-footer">
        <div className="de-container">
          <div className="de-footer-top">
            <Brand />
            <nav aria-label="Informações e suporte">
              {[
                ["Termos de Uso", TERMS_URL],
                ["Política de Privacidade", PRIVACY_URL],
                ["Suporte", SUPPORT_URL],
              ]
                .filter(([, url]) => url)
                .map(([label, url]) => (
                  <a key={label} href={url} target="_blank" rel="noreferrer">
                    {label}
                  </a>
                ))}
            </nav>
          </div>
          <p className="de-responsibility">
            Ferramenta de apoio técnico. Os resultados devem ser verificados pelo profissional
            responsável considerando as condições reais da instalação, as especificações dos
            fabricantes e as normas aplicáveis.
          </p>
          <div className="de-legal">
            <span>© {new Date().getFullYear()} Academia do Eletricista</span>
            <span>
              Instituto Brasileiro de Qualificação Profissional Ltda - ME · CNPJ: 10.984.548/0001-77
            </span>
          </div>
        </div>
      </footer>
      <div className={`de-mobile-bar ${showBar ? "is-visible" : ""}`}>
        <div>
          <strong>R$ 37</strong>
          <span>6 meses · pagamento único</span>
        </div>
        <CTA source="mobile">Quero acessar</CTA>
      </div>
    </div>
  );
}
