require('dotenv').config()
const axios = require('axios')

const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])

const flowImage = addKeyword(['imagen', 'img']).addAnswer('🖼️ Aquí tienes una imagen', {media:''})

const flowButton = addKeyword(['boton', 'btn']).addAnswer('🔘 Aquí tienes un botón', {buttons: 
    [{body:'boton 1'}, 
    {body:'boton 2'}
]})


const flowGracias = addKeyword(['gracias', 'grac']).addAnswer(
    ['De nada', 'encantado de ayudarte'],
    null,
    null,
    [flowSecundario]
)


const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('🙌 Hola, espero que estes muy bien')
    .addAnswer(
        '¿como puedo ayudarte hoy?',
        null,
        null,
        [flowDocs, flowGracias, flowTuto, flowDiscord]
    )

const menuAPI = async() => {
    
}

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal, flowImage, flowButton])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
