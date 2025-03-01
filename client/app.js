document.addEventListener("DOMContentLoaded", () => {
  const currency_one = document.querySelector("#currency-one");
  const currency_two = document.querySelector("#currency-two");
  let amount = document.querySelector("#amount-one");
  let converted_amount = document.querySelector("#amount-two");
  let rate = 0;

  const getExchangeRate = async () => {
    const base_currency = currency_one.value;
    const target_currency = currency_two.value;

    try {
      const response = await fetch(`http://localhost:3001/?base=${base_currency}&target=${target_currency}`);
      const data = await response.json();
      console.log("Rate:", data.rate);
      rate = data.rate;
      document.getElementById("rate").textContent = `1 ${base_currency} = ${data.rate} ${target_currency}`;
      converted_amount.value = (amount.value * rate).toFixed(2);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  getExchangeRate();

  amount.addEventListener("input", function () {
    console.log(amount.value);
    converted_amount.value = (amount.value * rate).toFixed(2);
  });

  currency_one.addEventListener("change", function () {
    amount.value = 1;
    console.log(currency_one.value);
    getExchangeRate(); 
  });

  currency_two.addEventListener("change", function () {
    console.log(currency_two.value);
    getExchangeRate();  
  });

  document.querySelector("#swap").addEventListener("click", () => {
    const temp = currency_one.value;
    currency_one.value = currency_two.value;
    currency_two.value = temp;
    amount.value = 1;
    getExchangeRate();
  });
});