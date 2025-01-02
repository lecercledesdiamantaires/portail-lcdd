export default function ( promoCode) {
    const data = ref(null);

    onMounted(function generateQrCode () {
        fetch(`https://quickchart.io/qr?text=${promoCode}`)
        .then(response => response.blob())
        .then(blob => {
            const url = URL.createObjectURL(blob); 
            const img = document.querySelector('img');
            img.src = url;
            data.value = blob;
        });
        return data;
    })

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
        data,
        download,
    }
}