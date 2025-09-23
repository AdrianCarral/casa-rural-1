(function(){
  const input = document.querySelector('#fecha');
  const out = document.querySelector('#precioTotal');
  if(!input || !out || typeof flatpickr === 'undefined') return;

  const fp = flatpickr(input, { mode:'range', dateFormat:'Y-m-d', minDate:'today' });

  function diffDays(a,b){
    const MS=24*60*60*1000;
    return Math.round((b - a)/MS);
  }

  function calcPrice(from, to){
    // Estimación básica: si es exactamente viernes->domingo => 450 €
    // Si no, precio por noche provisional: 120 €/noche (temporal hasta tarifas reales)
    const nights = diffDays(from, to);
    const day = from.getDay(); // 5=viernes en JS? (0=domingo,1=lunes,...)
    const isFriToSun = (day===5 && nights===2 && to.getDay()===0);
    if(isFriToSun) return 450;
    return Math.max(0, nights) * 120;
  }

  input.addEventListener('change', () => {
    const sel = fp.selectedDates;
    if(sel.length===2){
      const total = calcPrice(sel[0], sel[1]);
      out.textContent = total ? (total.toLocaleString('es-ES') + ' €') : '—';
    } else {
      out.textContent = '—';
    }
  });
})();