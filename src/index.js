import _ from 'lodash';
import $ from 'jquery';
import 'jquery-ui/jquery-ui.min.css';
import 'jquery-ui/jquery-ui.min';
import './kaini.css';
import './exo.css';
import './Ubuntu.css';
import './kaini.js';

$( function() {
    $( "#tabs" ).tabs();
  } );
  
  $(window).on( "load", function() {
    $(".furnitureClass.invert > div div").each(function() {
        //Newest Furniture First
        $(this).prependTo(this.parentNode);
    });
});