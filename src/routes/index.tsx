import { createFileRoute } from "@tanstack/react-router";
import {
  Cable,
  ShieldCheck,
  Wrench,
  FileText,
  ListChecks,
  History,
  Check,
  ArrowRight,
  Info,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Brand,
  SalesSection,
  SectionHeading,
  CheckList,
  BenefitCard,
  Price,
  PurchaseButton,
  OfferDecision,
  ProductPreview,
  VideoDemo,
} from "@/components/sales";
import { PDF_EXAMPLE_URL, SUPPORT_URL, TERMS_URL, PRIVACY_URL } from "@/lib/site-config";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Oferta especial | Dimensionador Expert por R$ 37" },
      {
        name: "description",
        content:
          "Complemente seu Livro Comandos Elétricos: Dimensionador Expert de R$ 97 por R$ 37, com 6 meses de acesso e pagamento único.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Dimensionador Expert — de R$ 97 por R$ 37" },
      {
        property: "og:description",
        content:
          "Uma ferramenta prática para complementar seu Livro Comandos Elétricos. 6 meses de acesso, sem mensalidade.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OtoPage,
});

function OtoPage() {
  return (
    <div className="sales-page">
      <header className="sales-header">
        <div className="sales-container">
          <Brand />
          <span className="sales-header-label">Oferta para compradores do livro</span>
        </div>
      </header>
      <div className="sales-progress" aria-label="Etapas da sua compra">
        <span>
          <Check aria-hidden="true" /> Livro escolhido
        </span>
        <ArrowRight aria-hidden="true" />
        <span aria-current="step">Oferta opcional</span>
        <ArrowRight aria-hidden="true" />
        <span>Finalização</span>
      </div>

      <section id="topo" className="sales-hero">
        <div className="sales-container sales-hero-grid">
          <div>
            <p className="sales-eyebrow">
              Antes de concluir, uma oferta especial para complementar seu livro
            </p>
            <h1>
              Você já garantiu o livro.
              <br />
              Agora, <span>facilite seus dimensionamentos.</span>
            </h1>
            <p className="sales-hero-lead">
              No livro, você aprende os critérios. Com o Dimensionador Expert, informa os dados do
              motor e da instalação e recebe os cálculos, os cabos e os dispositivos dimensionados.
            </p>
            <p className="sales-hero-description">
              Leve também a ferramenta que organiza o dimensionamento dos cabos, disjuntores,
              contatores e relés e ajuda a preparar os documentos do serviço.
            </p>
            <Price compact />
            <OfferDecision source="hero-oto" />
          </div>
          <div>
            <ProductPreview />
            <p className="sales-preview-note">
              Tela real da ferramenta · Uso online, sem instalar programas
            </p>
          </div>
        </div>
      </section>

      <SalesSection tone="muted">
        <SectionHeading
          eyebrow="Do estudo ao serviço"
          title="Aprenda no livro. Ganhe agilidade na hora de dimensionar."
        >
          <p>
            O livro explica os fundamentos e os critérios de comandos elétricos. A ferramenta aplica
            os dados que você informa e organiza os cálculos e as indicações de componentes.
          </p>
        </SectionHeading>
        <ol className="sales-steps">
          {[
            [
              "Informe os dados",
              "Preencha os dados do motor ou selecione um modelo WEG. Informe a tensão, a chave de partida, a distância e as condições de instalação.",
            ],
            [
              "Confira o dimensionamento",
              "Receba a secção transversal dos cabos, a verificação da queda de tensão e o dimensionamento dos dispositivos de proteção e comando.",
            ],
            [
              "Prepare os documentos",
              "Aproveite os resultados na memória de cálculo, na proposta comercial com lista de materiais e no memorial descritivo. Imprima ou salve em PDF.",
            ],
          ].map(([title, text], i) => (
            <li className="sales-card" key={title}>
              <span className="sales-step-number">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
        <p className="sales-highlight">
          Você estuda os critérios no livro e acompanha como os cálculos são aplicados na
          ferramenta.
        </p>
      </SalesSection>

      <SalesSection>
        <SectionHeading
          eyebrow="Incluído nos seus 6 meses de acesso"
          title="Do dimensionamento aos documentos do serviço."
        >
          <p>
            Os recursos trabalham com os dados do seu projeto para reduzir cálculos manuais e
            organizar as informações.
          </p>
        </SectionHeading>
        <div className="sales-benefits">
          <BenefitCard icon={Cable} title="Cabos dimensionados">
            Secção transversal dos condutores, capacidade de corrente e verificação da queda de
            tensão conforme as condições informadas.
          </BenefitCard>
          <BenefitCard icon={ShieldCheck} title="Proteção e comando">
            Disjuntores, contatores e relés conforme o motor e a partida, incluindo disjuntor-motor
            quando aplicável.
          </BenefitCard>
          <BenefitCard icon={Wrench} title="Referências para escolher">
            Indicações de modelos organizadas por WEG, Siemens e Schneider para apoiar a seleção dos
            componentes.
          </BenefitCard>
          <BenefitCard icon={FileText} title="Cálculos explicados">
            Fórmulas, valores e etapas na memória de cálculo para conferir os critérios ou revisar o
            que você estudou.
          </BenefitCard>
          <BenefitCard icon={ListChecks} title="Documentos com seus dados">
            Proposta comercial com lista de materiais e memorial descritivo. Inclua seus dados e sua
            logomarca, imprima ou salve em PDF.
          </BenefitCard>
          <BenefitCard icon={History} title="Seu trabalho organizado">
            Histórico de dimensionamentos e propostas para consultar os resultados e retomar seu
            trabalho durante o acesso.
          </BenefitCard>
        </div>
        {PDF_EXAMPLE_URL && (
          <a className="sales-text-link" href={PDF_EXAMPLE_URL} target="_blank" rel="noreferrer">
            Ver exemplo de documento em PDF <ArrowRight aria-hidden="true" />
          </a>
        )}
      </SalesSection>

      <SalesSection id="video" tone="muted">
        <SectionHeading
          eyebrow="Veja antes de decidir"
          title="Confira o Dimensionador Expert na prática."
        >
          <p>
            Acompanhe o preenchimento dos dados e veja como a ferramenta apresenta os cálculos, os
            condutores e os dispositivos dimensionados.
          </p>
        </SectionHeading>
        <VideoDemo />
        <div className="sales-inline-action">
          <PurchaseButton source="demo-oto" />
        </div>
      </SalesSection>

      <SalesSection id="oferta" tone="dark">
        <div className="sales-offer-grid">
          <div>
            <SectionHeading
              eyebrow="Oferta complementar ao seu livro"
              title="Leve também o Dimensionador Expert."
            >
              <p>
                Uma ferramenta para apoiar seus projetos, instalações de motores e estudos de
                comandos elétricos.
              </p>
            </SectionHeading>
            <CheckList
              items={[
                "6 meses de acesso a todos os recursos apresentados nesta página.",
                "Cálculos, dimensionamento e referências dos fabricantes reunidos.",
                "Memória de cálculo, proposta e memorial para imprimir ou salvar em PDF.",
                "Uso pelo navegador no computador, tablet ou celular.",
              ]}
            />
            <p className="sales-technical-note">
              <Info aria-hidden="true" />
              Os resultados devem ser conferidos pelo profissional conforme as condições reais da
              instalação e as normas aplicáveis.
            </p>
          </div>
          <div className="sales-offer-card">
            <p className="sales-eyebrow">Condição especial nesta oferta</p>
            <p className="sales-offer-name">Dimensionador Expert</p>
            <Price />
            <p className="sales-offer-description">
              6 meses contados a partir da ativação.
              <br />
              Sem mensalidade e sem renovação automática.
            </p>
            <OfferDecision source="oferta-oto" />
            <p className="sales-offer-footnote">
              O Dimensionador é uma compra adicional. O livro e seus bônus são os itens da sua
              compra principal.
            </p>
          </div>
        </div>
      </SalesSection>

      <SalesSection>
        <SectionHeading title="Antes de escolher, tire suas dúvidas." />
        <Accordion type="single" collapsible className="sales-faq">
          {FAQ.map(([q, a], i) => (
            <AccordionItem key={q} value={`q${i}`}>
              <AccordionTrigger className="text-left text-base font-semibold">{q}</AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                {a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="sales-final-decision">
          <p className="sales-highlight">
            Seu livro para aprender. Sua ferramenta para dimensionar.
          </p>
          <p>
            De <s>R$ 97,00</s> por <strong>R$ 37,00</strong> · 6 meses de acesso
          </p>
          <OfferDecision source="final-oto" />
        </div>
      </SalesSection>

      <footer className="sales-footer">
        <div className="sales-container">
          <div className="sales-footer-top">
            <Brand />
            <nav aria-label="Links legais">
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
          <p className="sales-footer-note">
            O Dimensionador Expert é uma ferramenta de apoio técnico. Os resultados devem ser
            analisados considerando as características reais da instalação e as normas aplicáveis.
          </p>
          <div className="sales-copyright">
            <p>Copyright © {new Date().getFullYear()} · Academia do Eletricista</p>
            <p>Instituto Brasileiro de Qualificação Profissional Ltda - ME</p>
            <p>CNPJ: 10.984.548/0001-77</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const FAQ: [string, string][] = [
  [
    "O Dimensionador já faz parte dos bônus do livro?",
    "Não. É uma ferramenta adicional, oferecida separadamente por R$ 37,00 com 6 meses de acesso. O livro e os bônus da compra principal são os itens que você já escolheu.",
  ],
  [
    "Posso usar o Dimensionador com ou sem o curso?",
    "Sim. O Dimensionador é uma ferramenta adicional com acesso independente. Você pode aproveitar esta oferta tanto se comprou o curso quanto se decidiu ficar apenas com o livro.",
  ],
  [
    "Por quanto tempo posso usar? Haverá mensalidade?",
    "São 6 meses de acesso a partir da ativação, com um único pagamento de R$ 37,00. Não há mensalidade nem renovação automática nesta oferta.",
  ],
  [
    "Preciso fazer os cálculos ou instalar algum programa?",
    "Você informa os dados do motor e da instalação, e a ferramenta executa os cálculos. Ela funciona online pelo navegador, com acesso à internet. Preencha os dados corretamente e confira a aplicação dos resultados.",
  ],
  [
    "Posso imprimir ou salvar os documentos em PDF?",
    "Sim. Você pode imprimir a memória de cálculo, a proposta comercial e o memorial descritivo. Na janela de impressão, escolha a impressora ou a opção Salvar como PDF.",
  ],
  [
    "A ferramenta substitui a avaliação do profissional?",
    "Não. Ela apoia o dimensionamento. As condições reais da instalação, os requisitos normativos, a configuração dos dispositivos e a responsabilidade técnica devem ser avaliados pelo profissional.",
  ],
];
