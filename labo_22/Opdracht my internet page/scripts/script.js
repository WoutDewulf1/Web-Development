const setup = () => {
    let historyList = JSON.parse(localStorage.getItem('searchHistory'));

    if (historyList === null) {
        historyList = [];
    }

    // Geef oude items zonder datum de standaarddatum 1 januari 2026
    for (let i = 0; i < historyList.length; i++) {
        if (!historyList[i].date) {
            historyList[i].date = new Date('2026-01-01T00:00:00').toISOString();
        }
    }

    const renderHistory = () => {
        const container = document.getElementById('historyContainer');
        container.textContent = '';

        for (let i = 0; i < historyList.length; i++) {
            const item = historyList[i];
            let cssklasse = 'bg-secondary';

            if (item.title === 'Google') cssklasse = 'bg-google';
            else if (item.title === 'Youtube') cssklasse = 'bg-youtube';
            else if (item.title === 'Twitter') cssklasse = 'bg-x';
            else if (item.title === 'Instagram') cssklasse = 'bg-instagram';

            const colDiv = document.createElement('div');
            colDiv.className = 'col-md-4 mb-3';

            const cardDiv = document.createElement('div');
            cardDiv.className = `card ${cssklasse} h-100`;

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            const title = document.createElement('h5');
            title.className = 'card-title';
            title.textContent = item.title;

            const text = document.createElement('p');
            text.className = 'card-text';
            text.textContent = item.text;

            // Datum element
            const dateText = document.createElement('p');
            dateText.className = 'card-text klein text-muted';
            const weergaveDatum = new Date(item.date).toLocaleDateString('nl-BE');
            dateText.textContent = `Gezocht op: ${weergaveDatum}`;

            const btn = document.createElement('a');
            btn.className = 'btn btn-dark mt-auto';
            btn.setAttribute('href', item.url);
            btn.setAttribute('target', '_blank');
            btn.textContent = 'Go!';

            cardBody.appendChild(title);
            cardBody.appendChild(text);
            cardBody.appendChild(dateText);
            cardBody.appendChild(btn);

            cardDiv.appendChild(cardBody);
            colDiv.appendChild(cardDiv);

            container.appendChild(colDiv);
        }
    };

    const handleSearch = () => {
        const input = document.getElementById('commandInput').value.trim();

        if (input.charAt(0) !== '/') {
            alert('Invalid command');
            return;
        }

        const prefix = input.substring(0, 2).toLowerCase();

        let title = '';
        let basisUrl = '';
        let zoekterm = input.substring(3).trim();

        if (prefix === '/g') {
            title = 'Google';
            basisUrl = 'https://www.google.com/search?q=';
            zoekterm = zoekterm.replaceAll(' ', '+');
        } else if (prefix === '/y') {
            title = 'Youtube';
            basisUrl = 'https://www.youtube.com/results?search_query=';
            zoekterm = zoekterm.replaceAll(' ', '+');
        } else if (prefix === '/x') {
            title = 'Twitter';
            basisUrl = 'https://x.com/hashtag/';
            zoekterm = zoekterm.replaceAll(' ', '');
        } else if (prefix === '/i') {
            title = 'Instagram';
            basisUrl = 'https://www.instagram.com/explore/tags/';
            zoekterm = zoekterm.replaceAll(' ', '');
        } else {
            alert('Unknown command prefix');
            return;
        }

        const finalUrl = basisUrl + zoekterm;
        window.open(finalUrl, '_blank');

        // Huidige datum opslaan bij de zoekopdracht
        const currentDate = new Date().toISOString();
        historyList.push({ title: title, text: zoekterm, url: finalUrl, date: currentDate });
        localStorage.setItem('searchHistory', JSON.stringify(historyList));

        document.getElementById('commandInput').value = '';
        renderHistory();
    };

    const sorteerOplopend = () => {
        historyList.sort((a, b) => new Date(a.date) - new Date(b.date));
        renderHistory();
    };

    const sorteerAflopend = () => {
        historyList.sort((a, b) => new Date(b.date) - new Date(a.date));
        renderHistory();
    };

    document.getElementById('goBtn').addEventListener('click', handleSearch);
    document.getElementById('btnSortAsc').addEventListener('click', sorteerOplopend);
    document.getElementById('btnSortDesc').addEventListener('click', sorteerAflopend);

    renderHistory();
};

window.addEventListener('load', setup);