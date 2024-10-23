# README

## Funcionalidades

### Mensagens

A seção `container-mensagens` exibe mensagens importantes ou feedback para os usuários.

### Carrinho de Compras

O botão do carrinho (`botao-carrinho`) exibe o número total de itens. Ao clicar, a função `abrirCarrinho` em `cardapio.metodos` é ativada.

### Cardápio

A seção `cardapio` mostra o cardápio do restaurante com categorias como pizzas e bebidas. Botões do menu permitem a navegação entre categorias.

### Reservas

A seção `reserva` incentiva os usuários a fazerem reservas, redirecionando para um link definido no atributo `href`.

### Carrinho - Modal

O modal `modalCarrinho` permite a revisão e envio de pedidos, com detalhes sobre itens, endereço de entrega e custos.

### Integração com Endereço

Dentro do modal, os usuários fornecem informações de entrega, usando a função `buscarCep` para buscar dados com base no CEP.

### Resumo do Pedido

O modal exibe um resumo do pedido, incluindo itens selecionados e detalhes de entrega, antes da finalização.

### Totalização e Finalização

O modal exibe a totalização do pedido, com subtotal, custos de entrega e valor total. Botões permitem navegação entre etapas.

### Navegação entre Etapas

Botões como "Continuar", "Revisar Pedido" e "Enviar Pedido" permitem a navegação entre as etapas do processo de compra. O botão "Voltar" retorna à etapa anterior.

Certifique-se de integrar o script corretamente na sua página para ativar essas funcionalidades. Consulte o código-fonte para detalhes específicos da implementação.
