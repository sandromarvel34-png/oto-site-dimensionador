# Sistema de design — Dimensionador Expert OTO

A página do repositório é o downsell após a recusa do curso de R$ 197,00, dentro do funil Livro → Curso → Dimensionador. Não altera as páginas ou o checkout dos outros produtos.

## Tokens e tipografia

- Tokens de cores e dimensões em `src/styles.css`; nenhuma cor específica definida nos blocos da página.
- Azul-marinho como base neutra; azul da marca para o destaque principal. Âmbar reservado aos botões de compra, conforme identidade existente.
- Fontes carregadas em `src/routes/__root.tsx`: Inter (texto, 400–700) e Barlow Condensed (H1 e H2, 700).
- H1: 60px desktop / 42px celular. H2: 40px / 32px. H3: 18px. Texto: 14–18px.
- Um H1 por página. Um H2 por seção. Frases de impacto usam `.sales-highlight`, nunca H2.
- Container: 1120px. Texto corrido: 720px. Seções: 80px desktop / 64px celular.
- Breakpoints: 960px e 640px. Cards em três, duas e uma colunas. Alvos interativos de pelo menos 44px.

## Componentes

Todos os blocos usam `src/components/sales.tsx` e os componentes shadcn existentes.

- `Brand`: logomarca AE preservada, nome e assinatura.
- `SalesSection`: fundo claro, cinza ou marinho.
- `SectionHeading`: eyebrow opcional, único H2 e texto de apoio.
- `CheckList`: listas com Lucide Check. `BenefitCard`: ícone de linha, título H3 e benefício.
- `Price`: de R$ 97,00 por R$ 37,00, economia R$ 60,00 e 6 meses. Valores centralizados em `OFFER`.
- `PurchaseButton`: CTA âmbar; checkout válido em HTTPS; diálogo de indisponibilidade se não configurado.
- `OfferDecision`: aceitar a oferta, informar compra adicional opcional e recusar de forma clara.
- `ProductPreview`: captura real existente, sem dados novos ou depoimentos inventados.
- `VideoDemo`: vídeo original, carregado após clique, sem reprodução automática ao abrir a página.

## Comportamento e integração

- `VITE_OTO_CHECKOUT_URL` ou `CHECKOUT_URL`: checkout específico de R$ 37,00 com 6 meses. O repositório original não tinha URL configurada.
- `VITE_OTO_THANK_YOU_URL` ou `THANK_YOU_URL`: destino de recusa. Padrão `/obrigado`, rota incluída no projeto.
- `InitiateCheckout` somente ao abrir destino válido. Recusa usa evento personalizado; nunca registra Purchase na página de oferta ou agradecimento.
- Termos, privacidade, suporte e PDF preservados em `site-config.ts`; continuam condicionais quando vazios.
- Sem timer, vagas fictícias, confirmação de pagamento sem validação ou promessa de cobrar em um clique.
- O gateway precisa direcionar a recusa do curso para esta página. Editar este repositório não configura o funil no gateway.
- Página e agradecimento usam noindex para não promover o downsell como página pública de aquisição.
- Foco visível, alt nas imagens, nomes acessíveis, preferência por movimento reduzido e layout sem barra fixa que esconda a recusa.
