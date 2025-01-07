import axios from 'axios';

export default function () {
    const data = ref(null);
    const getSales = (code) => {
        axios
            .get(`http://localhost:4000/shopify/sales/${code}`)
            .then((response) => {
                data.value = response.data[0];
                return data.value;
            })
            .catch((error) => {
                console.error(error);
            });
    };
    
    return {
        data,
        getSales,
    };
}