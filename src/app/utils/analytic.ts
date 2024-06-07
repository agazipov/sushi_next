export function sendToAnalytics(metric: any) {
  const body = JSON.stringify(metric);
  console.log(metric);
  

  // Используйте fetch API для отправки метрик на сервер
  if (navigator.sendBeacon) {
    navigator.sendBeacon('http://localhost:3000/api/analytic', body);
  } else {
    fetch('http://localhost:3000/api/analytic', { body, method: 'POST', keepalive: true });
  }
}