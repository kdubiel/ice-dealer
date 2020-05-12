import Papa from 'papaparse';

export default (objects: Object[], filename: string) => {
  if (
    window.Blob === undefined ||
    window.URL === undefined ||
    window.URL.createObjectURL === undefined
  ) {
    alert("Your browser doesn't support Blobs");
    return;
  }

  const csv = Papa.unparse(objects, {
    delimiter: ';',
  });

  const csvFile = new Blob([csv], { type: 'text/csv' });
  const downloadLink = document.createElement('a');

  downloadLink.download = filename;
  downloadLink.href = window.URL.createObjectURL(csvFile);
  downloadLink.style.display = 'none';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};
