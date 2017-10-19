if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('assets/js/service-worker.js')
    .then(function() {
      console.log('Service Worker Registered');
    });
}

document.querySelector('.screen01').addEventListener('click', function() {
  this.remove();
  document.querySelector('.screen02').style.display = 'block';

  document.querySelector('.screen02').addEventListener('click', function() {
    this.remove();

    document.querySelector('.screen03').style.display = 'block';
  });
});
