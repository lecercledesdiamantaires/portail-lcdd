export default function () {
    const data = ref(null);

   const generateQrCode = async ( promoCode) => {
        fetch(`https://quickchart.io/qr?text=https://lecercledesdiamantaires.com/?discount=${promoCode}`)
        .then(response => response.blob())
        .then(blob => {
            const url = URL.createObjectURL(blob); 
            const img = document.querySelector('.qr-code');
            img.src = url;
            data.value = blob;
        });
        return data;
    }

    const download = () => {
        const url = URL.createObjectURL(data.value); 
        const a = document.createElement('a');
        a.href = url;
        a.download = 'qr.png';
        document.body.appendChild(a);
        a.click();
        alert('QR code has been downloaded');
    }

    return {
        download,
        generateQrCode,
        data
    }
}