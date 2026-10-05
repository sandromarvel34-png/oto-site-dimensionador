# Sistema de design — Dimensionador Expert OTO

A página do repositório é o segundo upsell (oferta OTO complementar), apresentado a todos os compradores do livro depois da oferta do curso de R$ 197,00, tenham comprado o curso ou não. Funil: Livro → Curso (aceitar ou recusar) → Dimensionador → Agradecimento. Não altera as páginas ou o checkout dos outros produtos.

## Tokens e tipografia

- Tokens de cores e dimensões em `src/styles.css`; nenhuma cor específica definida nos blocos da página.
- Azul-marinho como base neutra; azul da marca para o destaque principal. Âmbar reservado aos botões de compra, conforme identidade existente.
- Fontes carregadas em `src/routes/__root.tsx`: Inter (texto, 400–700) e Barlow Condensed (H1 e H2, 700).
- H1: 60px desktop / 42px celular. H2: 40px / 32px. H3: 18px. Texto: 14–18px.
- Um H1 por página. Um H2 por seção. Frases de impacto usam `.sales-highlight`, nunca H2.
- Container: 1120px. Texto corrido: 720px. Seções: 80px desktop / 64px celular.
- Breakpoints: 960px e 640px. Cards em três, duas e uma colunas. Alvos interativos de pelo menos 44px.

## Componentes

A página principal preserva a estrutura, a copy explicativa e as peças reutilizáveis da referência `https://site-dimensionador.lovable.app/` (`sandromarvel34-png/site-dimensionador`, commit `a12c159e0126e41f5a3e69b2d0f25fdf6497bfff`).

- `Section`, `Heading`, `CheckItem` e `ProductMockup` preservam os componentes da referência, seus tokens e os estilos existentes.
- `CTA` envolve `OfferDecision` para aceitar ou recusar a oferta. Header e barra mobile usam `PurchaseButton`.
- Preservados: problema, solução, demonstração, funcionalidades, fabricantes, memória de cálculo, documentação, comparação, público, recursos incluídos e FAQ técnico.
- Ajustes de texto limitados ao gancho inicial, preço de R$ 97 por R$ 37, condição OTO, botões de decisão e uma pergunta sobre a independência do curso.
- O título comercial no card de oferta usa parágrafo destacado, mantendo um único H2 na seção.

Componentes adicionais em `src/components/sales.tsx` atendem às decisões da OTO e à rota de agradecimento, junto dos componentes shadcn existentes.

- `Brand`: logomarca AE preservada, nome e assinatura.
- `SalesSection`: fundo claro, cinza ou marinho.
- `SectionHeading`: eyebrow opcional, único H2 e texto de apoio.
- `CheckList`: listas com Lucide Check. `BenefitCard`: ícone de linha, título H3 e benefício.
- `Price`: de R$ 97,00 por R$ 37,00, economia R$ 60,00 e 6 meses. Valores centralizados em `OFFER`.
- `PurchaseButton`: CTA âmbar; checkout válido em HTTPS; diálogo de indisponibilidade se não configurado.
- `OfferDecision`: aceitar a oferta, informar compra adicional opcional e recusar de forma clara. A recusa usa “Não, quero concluir minha compra”, sem presumir que o cliente recusou o curso.
- `ProductPreview`: captura real existente, sem dados novos ou depoimentos inventados.
- `VideoDemo`: vídeo original, carregado após clique, sem reprodução automática ao abrir a página.

## Comportamento e integração

- `VITE_OTO_CHECKOUT_URL` ou `CHECKOUT_URL`: checkout específico de R$ 37,00 com 6 meses. O repositório original não tinha URL configurada.
- `VITE_OTO_THANK_YOU_URL` ou `THANK_YOU_URL`: destino de recusa. Padrão `/obrigado`, rota incluída no projeto.
- `InitiateCheckout` somente ao abrir destino válido. Recusa usa evento personalizado; nunca registra Purchase na página de oferta ou agradecimento.
- Termos, privacidade, suporte e PDF preservados em `site-config.ts`; continuam condicionais quando vazios.
- Sem timer, vagas fictícias, confirmação de pagamento sem validação ou promessa de cobrar em um clique.
- O gateway precisa direcionar tanto a compra confirmada do curso quanto a recusa do curso para esta página. Editar este repositório não configura o funil no gateway.
- Página e agradecimento usam noindex para não promover a oferta OTO como página pública de aquisição.
- Foco visível, alt nas imagens, nomes acessíveis, preferência por movimento reduzido e layout sem barra fixa que esconda a recusa.
