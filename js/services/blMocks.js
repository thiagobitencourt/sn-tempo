'use strict';
//Mocks for Blumenau city. The server is no able to resolve the blumenau city request.
app.factory('blMocks', function() {
  return {
      "nome": "Blumenau",
      "cidade":"Blumenau -  SC",
      "sigla": "SC",
      "agora":
        {
          "data_hora":"08/04/2016 - 22:00",
          "descricao":"Muito Nublado (noite)",
          "temperatura":"25",
          "umidade":"100%",
          "visibilidade":"7,24 km",
          "vento_velocidade":"6,44 km/h",
          "vento_direcao":"NW",
          "pressao":"32.712,53 mBar",
          "pressao_status":"estável",
          "nascer_do_sol":"6:8 am",
          "por_do_sol":"6:0 pm",
          "imagem":"https://developers.agenciaideias.com.br/images/tempo/27.png"
        },
        "previsoes":
          [
            {
              "data":"Sexta - 08/04/2016",
              "descricao":"Trovoadas",
              "temperatura_max":"31",
              "temperatura_min":"22",
              "imagem":"https://developers.agenciaideias.com.br/images/tempo/4.png"
            },
            {
              "data":"Sábado - 09/04/2016",
              "descricao":"Ensolarado",
              "temperatura_max":"30",
              "temperatura_min":"18",
              "imagem":"https://developers.agenciaideias.com.br/images/tempo/32.png"
            },
            {
              "data":"Domingo - 10/04/2016",
              "descricao":"Ensolarado",
              "temperatura_max":"29",
              "temperatura_min":"17",
              "imagem":"https://developers.agenciaideias.com.br/images/tempo/32.png"
            },
            {
              "data":"Segunda - 11/04/2016",
              "descricao":"Ensolarado",
              "temperatura_max":"29",
              "temperatura_min":"17",
              "imagem":"https://developers.agenciaideias.com.br/images/tempo/32.png"
            },
            {
              "data":"Terça - 12/04/2016",
              "descricao":"Trovoadas Isoladas",
              "temperatura_max":"27",
              "temperatura_min":"21",
              "imagem":"https://developers.agenciaideias.com.br/images/tempo/47.png"
            },
            {
              "data":"Quarta - 13/04/2016",
              "descricao":"Trovoadas Isoladas",
              "temperatura_max":"27",
              "temperatura_min":"21",
              "imagem":"https://developers.agenciaideias.com.br/images/tempo/47.png"
            },
            {
              "data":"Quinta - 14/04/2016",
              "descricao":"Trovoadas",
              "temperatura_max":"27",
              "temperatura_min":"21",
              "imagem":"https://developers.agenciaideias.com.br/images/tempo/4.png"
            },
            {
              "data":"Sexta - 15/04/2016",
              "descricao":"Trovoadas",
              "temperatura_max":"29",
              "temperatura_min":"23",
              "imagem":"https://developers.agenciaideias.com.br/images/tempo/4.png"
            },
            {
              "data":"Sábado - 16/04/2016",
              "descricao":"Trovoadas",
              "temperatura_max":"26",
              "temperatura_min":"22",
              "imagem":"https://developers.agenciaideias.com.br/images/tempo/4.png"
            },
            {
              "data":"Domingo - 17/04/2016",
              "descricao":"Trovoadas",
              "temperatura_max":"30",
              "temperatura_min":"22",
              "imagem":"https://developers.agenciaideias.com.br/images/tempo/4.png"
            }]
      }
});
