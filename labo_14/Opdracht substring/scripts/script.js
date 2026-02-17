function showSubstring() {
    // 1. Get the values from the input fields
    const text = document.getElementById('userInput').value;
    const start = document.getElementById('startIndex').value;
    const end = document.getElementById('endIndex').value;

    // 2. Use the substring function
    const result = text.substring(start, end);

    // 3. Display the result in the output span
    document.getElementById('output').innerText = result;
}