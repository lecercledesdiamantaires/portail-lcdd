module.exports = {
    apps: [
        {
            name: "back-lcdd",
            script: "index.js",
            env: {
                DATABASE_URL: "mysql://debian-sys-maint:PnNGmrGmDTVzIIlY@localhost:3306/portail_lcdd",
                PORT: 4000,
                JWT_SECRET: "feurfeurfeurfeurfeur",

                SHOP_NAME: "cercledesdiamantaires",
                SHOPIFY_BASE_URL: "cercledesdiamantaires.myshopify.com",
                SHOPIFY_API_KEY: "129692bb59df11b09f8bcc3bb6ee558c",
                SHOPIFY_PASSWORD: "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",
                API_VERSION: "2024-01",
                EMAIL_USER: "lecercledesdiamantaires@gmail.com",
                EMAIL_PASS: "came mzmw fzdt mzmy",

                FRONT_URL: "https://partenaire.lecercledesdiamantaires.com",
                BACK_URL: "https://partenaire.lecercledesdiamantaires.com"
            }
        }
    ]
};
