(() => {
  const frame = document.getElementById('deviceFrame');
  const iframe = document.getElementById('previewFrame');
  const select = document.getElementById('deviceSelect');
  const rotateBtn = document.getElementById('rotateBtn');
  const openNewBtn = document.getElementById('openNewBtn');
  const customW = document.getElementById('customWidth');
  const customH = document.getElementById('customHeight');

  let width = 390, height = 844, rotated = false;

  function setSize(w, h) {
    width = Math.max(200, Math.min(2000, parseInt(w, 10) || 390));
    height = Math.max(200, Math.min(4000, parseInt(h, 10) || 844));
    frame.style.width = rotated ? height + 'px' : width + 'px';
    frame.style.height = rotated ? width + 'px' : height + 'px';
  }

  select.addEventListener('change', () => {
    const v = select.value;
    if (v === 'custom') {
      customW.style.display = 'inline-block';
      customH.style.display = 'inline-block';
      return;
    }
    customW.style.display = 'none';
    customH.style.display = 'none';
    const [w, h] = v.split('x').map(Number);
    setSize(w, h);
  });

  customW.addEventListener('input', () => setSize(customW.value || width, customH.value || height));
  customH.addEventListener('input', () => setSize(customW.value || width, customH.value || height));

  rotateBtn.addEventListener('click', () => {
    rotated = !rotated;
    frame.classList.toggle('rotate', rotated);
    setSize(width, height);
  });

  openNewBtn.addEventListener('click', () => {
    window.open(iframe.src.replace('?phoneview=1', ''), '_blank');
  });

  // allow query params to control initial device
  try {
    const params = new URLSearchParams(location.search);
    const device = params.get('device');
    if (device) {
      const match = device.match(/(\d+)x(\d+)/);
      if (match) {
        const [w, h] = [Number(match[1]), Number(match[2])];
        setSize(w, h);
      }
    } else setSize(width, height);
  } catch (e) {
    setSize(width, height);
  }

  // expose for debugging
  window.phoneView = { setSize };
})();
