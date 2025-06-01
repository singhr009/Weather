async function getWeather() {
  const location = document.getElementById('locationInput').value.trim();
  const resultDiv = document.getElementById('result');

  if (!location) {
    resultDiv.textContent = "Please enter a location.";
    return;
  }

  const apiKey = 'bb7d00b474304d329bd82553250106';
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}&aqi=yes`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch data');

    const data = await response.json();
    const tempC = data.current.temp_c;
    const condition = data.current.condition.text;
    const city = data.location.name;

    resultDiv.innerHTML = `
      <strong>${city}</strong><br/>
      Temperature: ${tempC}°C<br/>
      Condition: ${condition}
    `;
  } catch (error) {
    resultDiv.textContent = "Could not retrieve weather data. Please check the location and try again.";
    console.error(error);
  }
}
