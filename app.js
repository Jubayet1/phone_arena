document.getElementById("searchButton").addEventListener('click', () => {
    const userInput = document.getElementById("userInput").value.toLowerCase();
    console.log(userInput);
    fetch(`https://openapi.programming-hero.com/api/phones?search=${userInput}`)
    .then(res => res.json())
    .then(data => console.log(data))
})