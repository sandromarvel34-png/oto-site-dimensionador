import { createFileRoute } from "@tanstack/react-router";
import { FileText, Mail } from "lucide-react";
import { Brand, SalesSection, BenefitCard } from "@/components/sales";
import { SUPPORT_URL } from "@/lib/site-config";

export const Route = createFileRoute("/obrigado")({
  head: () => ({
    meta: [
      { title: "Próximos passos | Academia do Eletricista" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: NextSteps,
});

function NextSteps() {
  return (
    <div className="sales-page">
      <header className="sales-header">
        <div className="sales-container">
          <Brand />
        </div>
      </header>
      <SalesSection tone="muted">
        <div className="sales-next-steps">
          <p className="sales-eyebrow">Academia do Eletricista</p>
          <h1>Obrigado por escolher o Livro Comandos Elétricos.</h1>
          <p className="sales-lead">
            Agora, acompanhe a confirmação do seu pedido pela plataforma de pagamento.
          </p>
          <div className="sales-next-cards">
            <BenefitCard icon={Mail} title="Confira seu e-mail">
              Após a confirmação do pagamento, consulte as mensagens da plataforma com as
              orientações para acessar os materiais. Verifique também as pastas de spam e promoções.
            </BenefitCard>
            <BenefitCard icon={FileText} title="Guarde seu comprovante">
              Use o comprovante e os dados do pedido para acompanhar a compra e consultar os canais
              de suporte indicados pela plataforma.
            </BenefitCard>
          </div>
          {SUPPORT_URL && (
            <a className="sales-text-link" href={SUPPORT_URL}>
              Falar com o suporte
            </a>
          )}
        </div>
      </SalesSection>
    </div>
  );
}
