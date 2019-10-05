// JavaScript Document

$(document).ready(function(){
	
	$("#carregando").hide();
	
	$('.carregar').click(function(){
		pagina = $(this).attr('href');

$("#carregando").ajaxStart(function(){
               $(this).show()
               })
            $("#carregando").ajaxStop(function(){
               $(this).hide();

            })

		$('#content').load(pagina);
		return false;
		
	});
});


function rand(l,u) {
return Math.floor((Math.random() * (u-l+1))+l); }
 
function MudaPagina(pagina) {
$(function(){
$("#carregando").show();

/// ajustes pra funcionar no ie
if(pagina.substr(-3,3) == 'php') {
$("#content").load(pagina + '?ie=' +rand(1,99999)); } else {
$("#content").load(pagina + '&ie=' +rand(1,99999)); }

});
}



function AbreJanela(pagina, titulo) {

abrir();
document.getElementById('titulo').innerHTML=titulo;
	
$(function(){
$("#carregandoJanela").show();
$("#paginaJanela").load(pagina);
});
}



function AtualizaFrigobar(pagina) {
$(function(){
$("#janelaFrigobar").load(pagina);
});
}



function AtualizaEmprestimos(pagina) {
$(function(){
$("#janelaEmprestimo").load(pagina);
});
}



function AtualizaJanela(pagina, janela) {
$(function(){
$("#carregandoJanela_" + janela).show();

/// ajustes pra funcionar no ie
if(pagina.substr(-3,3) == 'php') {
$("#janela_" + janela).load(pagina + '?ie=' +rand(1,99999)); } else {
$("#janela_" + janela).load(pagina + '&ie=' +rand(1,99999)); }

});
}



function AtualizaServicos(pagina) {
$(function(){
$("#janelaServicos").load(pagina);
});
}



function MudaPeriodo(pagina) {
$(function(){
$("#carregandoPeriodos").show();
$("#periodos").load	(pagina);
});
}



function AbrePopPequeno(pagina) {
document.getElementById('AbrePopPequeno').style.display='inline';
$(function(){
$("#carregandoAbrePopPequeno").show();
$("#AbrePopPequeno").load(pagina);
});
}



function AbreReserva(pagina) {
AbreJanela(pagina, 'Dados da Reserva')
}



function BuscarClientes(pagina) {
document.getElementById('buscaCliente').style.display='inline';
$(function(){
$("#carregandoCliente").show();
$("#buscaCliente").load	(pagina);
});
}



function DtLembrete(opcao) {
	
if(opcao == 1) {
document.getElementById('janelaDtLembrete').style.display='inline';
$(function(){
$("#carregandojanelaDtLembrete").show();
$("#janelaDtLembrete").load	('janela-prazo-pagamento.php');
}); }/// se for bloqueado
}



function BuscarAps(pagina) {
document.getElementById('BuscarAps').style.display='inline';
$(function(){
$("#carregandoBuscarAps").show();
$("#BuscarAps").load	(pagina);
});
}



function cancelaReserva(pagina) {
document.getElementById('cancelaReserva').style.display='inline';
$(function(){
$("#carregandoCancelamento").show();
$("#cancelaReserva").load	(pagina);
});
}



function AlteraPeriodo(pagina) {
document.getElementById('AlteraPeriodo').style.display='inline';
$(function(){
$("#carregandoAltPeriodo").show();
$("#AlteraPeriodo").load	(pagina);
});
}



function MudaQtdFotosClasse(pagina) {
document.getElementById('MudaQtdFotosClasse').style.display='inline';
$(function(){
$("#carregandoFotos").show();
$("#MudaQtdFotosClasse").load(pagina);
});
}



function MudaFAQ(pagina, cat) {
$(function(){
$("#geral_" + cat).load(pagina);
});
}