(function(){
  const form = document.querySelector('#calc-form');
  const output = document.querySelector('#calc-total');
  if(!form || !output) return;

  function format(amount){
    return amount.toLocaleString('es-ES') + '\u00a0€';
  }

  function calc(tipo, noches){
    if(noches <= 0 || !Number.isFinite(noches)) return 0;
    if(tipo === 'finSemana'){
      const base = 400;
      if(noches <= 2) return base;
      return base + (noches - 2) * 150;
    }
    return noches * 150;
  }

  function update(){
    const data = new FormData(form);
    const tipo = data.get('tipo');
    const noches = Number(data.get('noches')) || 0;
    const total = calc(tipo, noches);
    output.textContent = total ? format(total) : '—';
  }

  form.addEventListener('input', update);
  form.addEventListener('change', update);
  update();
})();
