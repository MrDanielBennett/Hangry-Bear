import { Bear, Hiker } from './bear';

import './styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


$(document).ready(function() {

  let bear = new Bear('Gary');
  let hiker = new Hiker('Tasty Hiker');

  $("#hiker-name").text(hiker.name);

  $("#bear-progress-bar").html(`<div class="progress-bar bg-danger progress-bar-striped progress-bar-animated" role="progressbar" style="width: ${bear.foodLevel * 10}%" aria-valuenow="${bear.foodLevel * 10}" aria-valuemin="0" aria-valuemax="100">${bear.foodLevel * 10}</div>`);

  $('#feed-button').click(function() {
    event.preventDefault();
    hiker.feedBear(bear);
    console.log('you fed bear');
  });

  $('#capture-button').click(function() {
    event.preventDefault();
    console.log('you press capture');
  });

  $('#forage-button').click(function() {
    event.preventDefault();
    console.log('you press forage');
  });

  setInterval(function() {
    $("#hiker-health").text(`Health: ${hiker.health}`);
    $("#hiker-stamina").text(`Stamina: ${hiker.stamina}`);
    $("#hiker-berries").text(`Berries: ${hiker.berries}`);
    $("#hiker-captures").text(`Captures: ${hiker.captureAttempts}`);
  }, 10);

});
