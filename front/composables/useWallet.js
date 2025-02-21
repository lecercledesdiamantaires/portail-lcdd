export default function () {

    const { $axios } = useNuxtApp()
    const idWallet = ref(null);

    const cardJson = 
    {
        "passType": "generic",
        "genericType": "GENERIC_TYPE_UNSPECIFIED",
        "cardTitle": "Le Cercle des Diamantaires",
        "subheader": "Nom Prénom",
        "header": "Jean Fils",
        "textModulesData": [
          {
            "id": "r1start",
            "header": "Mon Code",
            "body": "CODE-5HHCI70W5N1V"
          }
        ],
        "barcodeType": "QR_CODE",
        "barcodeValue": "https://lecercledesdiamantaires.com/?discount=CODE-5HHCI70W5N1V",
        "barcodeAltText": "",
        "hexBackgroundColor": "#013320",
        "appleFontColor": "#ffffff",
        "changedAppleFontColor": false,
        "logoUrl": "https://s3.amazonaws.com/i.addtowallet.co/addtowallet-2adca120-a52d-43a7-95d6-d83af9baafeb",
        "linksModuleData": [
          {
            "id": "r1",
            "uri": "mailto:contact@lecercledesdiamantaires.com",
            "description": "email",
            "type": "email"
          },
          {
            "id": "r2",
            "uri": "tel:01 86 04 38 31",
            "description": "phone",
            "type": "phone"
          },
          {
            "id": "r3",
            "uri": "https://lecercledesdiamantaires.com/",
            "description": "website",
            "type": "website"
          },
          {
            "id": "r4",
            "uri": "https://maps.app.goo.gl/1qt5mtRx5yHvTksM7",
            "description": "location",
            "type": "location"
          }
        ],
        "location": {
          "latitude": 48.8565201,
          "longitude": 2.3096562
        },
        "herorawurl": "https://s3.amazonaws.com/i.addtowallet.co/addtowallet-cb3ec298-2f94-4524-b0e9-612b48826539",
        "heroImage": "https://s3.amazonaws.com/i.addtowallet.co/addtowallet-cb3ec298-2f94-4524-b0e9-612b48826539",
        "notificationHeading": null,
        "stateType": "ACTIVE"
    }


    const createCard = async (cardJson, user) => {
        try {
            cardJson.barcodeValue = `https://lecercledesdiamantaires.com/?discount=${user.get("promoCode")}`;
            cardJson.header = `${user.get("firstName")} ${user.get("lastName")}`;
            cardJson.textModulesData[0].body = `${user.get("promoCode")}`;
            const response = await $axios.post(`api/wallet/create`, cardJson);
            return response.data;
        } catch(error) {
            console.error('Erreur lors de la création de la carte :', error.response?.data || error.message);
            throw error
        }
    }

    const deleteWalletCard = async (userId) => {
        try {
            const wallet = await getWalletId(userId);
            const response = await $axios.delete(`api/wallet/delete/${wallet.walletId}`);
            return response.data;
        }catch(error){
            console.error('Erreur lors de la suppression de la carte :', error.response?.data || error.message);
            throw error
        }
    }

    const getWalletId = async (userId) => {
        try{
           const response = await $axios.get(`api/wallet/get/${userId}`);
           idWallet.value = response.data.walletId;
           return response.data;
        }catch(error){
            console.error('Erreur lors de la récupération du walletId :', error);
        }
    }







    return {
        createCard,
        deleteWalletCard,
        idWallet,
        cardJson,
        getWalletId
    }
}