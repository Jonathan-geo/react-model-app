export default function swDev()

{
  
    let swUrl = `${process.env.PUBLIC_URL}/service-worker.js`
  /*
    navigator.serviceWorker.register(swUrl)
        .then((response) => {
            console.warn("resposta: -----", response)
        })
  */



    if ('serviceWorker' in navigator) {
        console.log('------------ARQUIVO SWDEV RODANDO---------------')
        navigator.serviceWorker.register(swUrl).then(function onRegister(registration) {
          // Registration was successful
          console.log('ServiceWorker registrado com sucesso no escopo: ', registration.scope)
        }).catch(function onRegistrationFailure(err) {
          // registration failed :(
          console.error('ServiceWorker não registrado: ', err)
        })
    } else {
        console.log('Não há suporte para service work :-(')
    }
}