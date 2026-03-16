const isGetal = (tekst) => !isNaN(tekst);

function valideer(event) {
    event.preventDefault();

    let allesGeldig = true;

    function toonFout(id, bericht) {
        document.getElementById(id).classList.add('fout-kader');
        document.getElementById('err-' + id).textContent = bericht;
        allesGeldig = false;
    }

    function wisFout(id) {
        document.getElementById(id).classList.remove('fout-kader');
        document.getElementById('err-' + id).textContent = '';
    }

    wisFout('voornaam');
    let vn = document.getElementById('voornaam').value.trim();
    if (vn.length > 30) toonFout('voornaam', 'max. 30 karakters');

    wisFout('familienaam');
    let fn = document.getElementById('familienaam').value.trim();
    if (fn === '') toonFout('familienaam', 'verplicht veld');
    else if (fn.length > 50) toonFout('familienaam', 'max 50 karakters');

    wisFout('datum');
    let datum = document.getElementById('datum').value.trim();
    if (datum === '') {
        toonFout('datum', 'verplicht veld');
    } else {
        let formaatOk = false;
        if (datum.length === 10 && datum[4] === '-' && datum[7] === '-') {
            let delen = datum.split('-');
            if (delen.length === 3) {
                let j = delen[0], m = delen[1], d = delen[2];
                if (j.length === 4 && isGetal(j) &&
                    m.length === 2 && isGetal(m) && Number(m) > 0 &&
                    d.length === 2 && isGetal(d) && Number(d) > 0) {
                    formaatOk = true;
                }
            }
        }
        if (!formaatOk) toonFout('datum', 'formaat is niet jjjj-mm-dd');
    }

    wisFout('email');
    let em = document.getElementById('email').value.trim();
    if (em === '') {
        toonFout('email', 'verplicht veld');
    } else {
        let atAantal = em.split('@').length - 1;
        if (atAantal !== 1) {
            toonFout('email', 'geen geldig email adres');
        } else {
            let delen = em.split('@');
            if (delen[0].length < 1 || delen[1].length < 1) {
                toonFout('email', 'geen geldig email adres');
            }
        }
    }

    wisFout('kinderen');
    let kind = document.getElementById('kinderen').value.trim();
    if (kind === '' || !isGetal(kind) || Number(kind) < 0) {
        toonFout('kinderen', 'is geen positief getal');
    } else if (Number(kind) >= 99) {
        toonFout('kinderen', 'is te vruchtbaar');
    }

    if (allesGeldig) {
        alert('proficiat!');
    }
}

document.getElementById('mijnFormulier').addEventListener('submit', valideer);