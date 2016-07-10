$(function () {

  var url = 'http://www.ncbi.nlm.nih.gov/Structure/mmdb2/mmdb_strview.cgi?uid=1tup&format=json&intrac=1';

  function init() {
    $.getJSON('./cytoscape-style.json', function (data) {
      var style = data[0]['style'];
      console.log(style);

      $.getJSON('./data.json', function (data) {
        startCytoscape(style, data);
      });

    });
  }


  function startCytoscape(style, elements) {
    var cy = cytoscape({
      container: $('#cy')[0],

      boxSelectionEnabled: false,
      style: style,
      elements: elements,

      layout: {
        name: 'preset',
        padding: 10
      }
    });

    cy.on('tap', 'node', function () {
      var name = this.data('name');
      var type = this.data('type');
      $('#node-selected').text('Last Selected Node: ' + name + ' (' + type + ')');
    });

    cy.on('tap', 'edge', function () {
      $('#edge-selected').text('Last Selected Edge ID: ' + this.data('id'));
    });
  }


  init();


});