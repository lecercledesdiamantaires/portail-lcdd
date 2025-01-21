export default function () {
    const data = ref(null);

   const generateQrCode = async ( promoCode) => {
        try {
            const response = await fetch(`https://quickchart.io/qr?text=https://lecercledesdiamantaires.com/?discount=${promoCode}`);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            data.value = url;
        } catch (error) {
            console.error('Failed to generate QR code:', error);
        }
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