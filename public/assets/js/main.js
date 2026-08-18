/* MANIC/LOVERBOY — site behaviour. No dependencies, no build step. */
(function () {
  'use strict';
  var y = document.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());
})();
