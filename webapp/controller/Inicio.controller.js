sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
    //quando coloco JSONModel está informando que estou iniciando a função dentro da definição sapui
],
function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("projetonetflix.controller.Inicio", {
        onInit: function () {
          // Definição de lista vazia
            let resultados = {
               titles: []
            }

            // definição de modelo - variavel especial para mostrar dados na tela de forma dinamica
           let resultadosModel = new JSONModel ();
           // Atribuição de dados
           resultadosModel.setData(resultados);
           // anexar modelo na tela
           let tela = this.getView();
           tela.setModel(resultadosModel, "APINetflix");
        },
        onInicioLinkPress: function(){
            alert("Navegar para tela inicial");
        },
        onBuscarDados : function(){
            //busca de dados na API da Netflix em tempo real
            let searchField = this.byId("idSearchfield");
            let filtro = searchField.getValue();


          alert(filtro);
            
            const settings = {
                async: true,
                crossDomain: true,
                url: 'https://netflix54.p.rapidapi.com/search/?query='
                + filtro + '&offset=0&limit_titles=50&limit_suggestions=20&lang=en',
                method: 'GET',
                headers: {
                    'x-rapidapi-key': 'ec36680439msh194256ed3570669p1c611fjsn21e5fc816419',
                    'x-rapidapi-host': 'netflix54.p.rapidapi.com'
                }
            };
            
            $.ajax(settings).done(function (response) {
                console.log(response);
                // resgatar o modelo e atualizar os dados
                let tela = this.getView();
                let modelo = tela.getModel("APINetflix");
                let dados = modelo.getData();

                // limpar a lista
                dados.titles = [];
                dados.titles = response.titles;

                modelo.refresh();
            }.bind(this)); // .bind(this)associando a função a tela principal, dessa forma ela conseguer ler dados externos a ela
        }
    });
});
