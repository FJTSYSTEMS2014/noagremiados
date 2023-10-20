document.getElementById('generateButton').addEventListener('click', function () {
    const phoneNumbers = document.getElementById('phoneNumbers').value;
    const phoneNumbersArray = phoneNumbers.split(',').map(phone => phone.trim());

    if (phoneNumbersArray.length === 0 || phoneNumbersArray[0] === "") {
        alert("Por favor, ingrese al menos un número de teléfono.");
        return;
    }

    const resultTable = document.getElementById('resultTable').getElementsByTagName('tbody')[0];
    resultTable.innerHTML = '';

    const xmlDoc = document.implementation.createDocument(null, 'Votacion');
    const votacion = xmlDoc.documentElement;

    let csvData = 'Número de Teléfono, Código, Estado del envío\n';
    const jsonCodes = {};

    phoneNumbersArray.forEach(phone => {
        const code = generateRandomCode(20);

        const row = resultTable.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);

        cell1.innerHTML = phone;
        cell2.innerHTML = code;
        cell3.innerHTML = 'Pendiente';

        const telefono = xmlDoc.createElement('Telefono');
        telefono.appendChild(xmlDoc.createTextNode(phone));

        const codigo = xmlDoc.createElement('Codigo');
        codigo.appendChild(xmlDoc.createTextNode(code));

        votacion.appendChild(telefono);
        votacion.appendChild(codigo);

        csvData += `${phone},${code},Pendiente\n`;

        jsonCodes[code] = false;
    });

    const xmlString = new XMLSerializer().serializeToString(xmlDoc);
    const xmlBlob = new Blob([xmlString], { type: 'application/xml' });
    const xmlUrl = URL.createObjectURL(xmlBlob);
    const xmlDownloadLink = document.getElementById('downloadXmlLink');
    xmlDownloadLink.href = xmlUrl;
    xmlDownloadLink.style.display = 'block';

    const csvBlob = new Blob([csvData], { type: 'text/csv' });
    const csvUrl = URL.createObjectURL(csvBlob);
    const csvDownloadLink = document.getElementById('downloadCsvLink');
    csvDownloadLink.href = csvUrl;
    csvDownloadLink.style.display = 'block';

    const jsonBlob = new Blob([JSON.stringify(jsonCodes)], { type: 'application/json' });
    const jsonUrl = URL.createObjectURL(jsonBlob);
    const jsonDownloadLink = document.getElementById('downloadJsonLink');
    jsonDownloadLink.href = jsonUrl;
    jsonDownloadLink.style.display = 'block';
});


function generateRandomCode(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let code = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
    }
    return code;
}
