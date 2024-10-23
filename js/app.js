$(document).ready(function (){
    cardapio.eventos.init();
})

var cardapio = {};

var MEU_CARRINHO = [];
var MEU_ENDERECO = null;


var VALOR_CARRINHO = 0;
var VALOR_ENTREGA = 5;

var CELULAR_EMPRESA = '5573988420142';

cardapio.eventos = {
    init: () => {
        cardapio.metodos.obterItensCardapio();
        cardapio.metodos.carregarBotaoReserva();
        cardapio.metodos.carregarBotaoLigar();
        cardapio.metodos.carregarBotaoWpp();
    }

}

cardapio.metodos = {

    // obtem a lista de itens do cardapio
    obterItensCardapio: (categoria = 'pizzas', vermais = false) => {

        var filtro = MENU[categoria];
        console.log(filtro);

        if (!vermais) {
             $("#itensCardapio").html('')
             $("#btnVerMais").removeClass('hidden')
        }


        $.each(filtro, (i, e) =>{

            let temp = cardapio.templates.item.replace(/\${img}/g, e.img)
            .replace(/\${name}/g, e.name)
            .replace(/\${price}/g, e.price.toFixed(2).replace('.',','))
            .replace(/\${id}/g, e.id)
            .replace(/\${dsc}/g, e.dsc)

            //botão vermais clicado (12 itens)
            if (vermais && i >= 4 && i < 12) {
                $("#itensCardapio").append(temp)
            }

            // paginaçao inicial (4 itens)
            if (!vermais && i < 4) {
                $("#itensCardapio").append(temp)
            }


        })

        //remove o ativo
        $(".container-menu a").removeClass('active')

        // seta o menu para ativo
        $("#menu-" + categoria).addClass('active')

    },

    //clica no botão ver mais
    verMais: () => {

        var ativo = $(".container-menu a.active").attr('id').split('menu-')[1]
        cardapio.metodos.obterItensCardapio(ativo,true)

        $("#btnVerMais").addClass('hidden')
    },

    carregarBotaoReserva: () => {

        var texto = "Olá gostaria de fazer uma *reserva*";

        let encode = encodeURI(texto);
        let URL = `https://wa.me/${CELULAR_EMPRESA}?text=${encode}`;

        $("#btnReserva").attr('href', URL)

    },

    carregarBotaoWpp: () => {

        var texto = "Olá! Gostaria de fazer um *pedido*";

        let encode = encodeURI(texto);
        let URL = `https://wa.me/${CELULAR_EMPRESA}?text=${encode}`;

        $("#wppIcon").attr('href', URL)
        $(".wppIcon").attr('href', URL)

    },
    
    carregarBotaoLigar: () => {

        $("#btnLigar").attr('href', `tel:${CELULAR_EMPRESA}`);

    },
    

    mensagem: (texto, cor = 'red', tempo = 3500) => {

        let id = Math.floor(Date.now() * Math.random()).toString();
        
        let msg = `<div id="msg-${id}" class="animated fadeInDown toast ${cor}">${texto}</div>`

        $("#container-mensagens").append(msg);

        setTimeout(() => {
            $("#msg-" + id).removeClass("fadeInDown");
            $("#msg-" + id).addClass("fadeOutUp");
            setTimeout(() => {
                $("#msg-" + id).remove();
            }, 800);
        }, tempo)

    },

}

cardapio.templates = {

    item: `
        <div class="col-12 col-lg-3 col-md-3 col-sn-6 mb-5 animeted fadeInUP">
            <div class="card card-item" id="\${id}">
                <div class="img-produto">
                    <img src="\${img}" alt="">
                </div>
                <p class="title-produto text-center mt-4">
                    <b>\${name}</b>
                </p>
                <p class="price-produto text-center">
                    <b>R$ \${price}</b>
                </p>
                <p class="dsc-produto text-center">
                <b>\${dsc}</b>
                </p>
            </div>
        </div>
    `,

    itemCarrinho:`
        <div class="col-12 item-carrinho">
            <div class="img-produto">
                <img src="\${img}">
            </div>
            <div class="dados-produto">
                <p class="title-produto"><b>\${name}</b></p>
                <p class="price-produto"><b></b>\${price}</p>
            </div>
            <div class="add-carrinho">
                <span class="btn-menos" onclick="cardapio.metodos.diminuirQuantidadeCarrinho('\${id}')"><i class="fas fa-minus"></i></span>
                <span class="add-numero-itens" id="qntd-carrinho-\${id}">\${qntd}</span>
                <span class="btn-mais" onclick="cardapio.metodos.aumentarQuantidadeCarrinho('\${id}')"><i class="fas fa-plus"></i></span>
                <span class="btn btn-remove no-mobile" onclick="cardapio.metodos.removerItemCarrinho('\${id}')"><i class="fa fa-times"></i></span>
            </div> 
        </div>
    `,

    itemResumo:`
        <div class="col-12 item-carrinho resumo">
            <div class="img-produto-resumo">
                <img src="\${img}">
            </div>
            <div class="dados-produto">
                <p class="title-produto-resumo">
                    <b>\${name}</b>
                </p>
                <p class="preco-produto-resumo">
                    <b>R$ \${price}</b>
                </p>
            </div>
            <p class="quantidade-produto-resumo">
                x <b>\${qntd}</b>
            </p>
        </div>
        
    `
}

// Função para abrir o modal
// Abrir o modal
function openModal() {
    document.getElementById("pedidoModal").style.display = "flex";
}

// Fechar o modal
function closeModal() {
    document.getElementById("pedidoModal").style.display = "none";
}

// Função para enviar o pedido via WhatsApp
function enviarPedido() {
    const nome = document.getElementById("nomeCliente").value;
    const pedido = document.getElementById("pedidoTexto").value;
    const bairro = document.getElementById("bairro").value;
    const rua = document.getElementById("rua").value;
    const numero = document.getElementById("numero").value;
    const referencia = document.getElementById("referencia").value;

    if (!nome || !pedido || !bairro || !rua || !numero) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    const mensagem = `
    Pedido de: ${nome}
    Pedido: ${pedido}
    Endereço: ${rua}, ${numero} - bairro: ${bairro}
    Ponto de Referência: ${referencia}`;

    const url = `https://wa.me/${CELULAR_EMPRESA}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank"), closeModal();
    
}
