var currentCache = 'note-berry';

console.log("Arquivo service-worker rodando")
// No momento, o Chrome está faltando alguns métodos de cache úteis,
// este polyfill os adiciona.
polyfillCache()

// Evento de instalação!
// Isso só acontece uma vez, quando o navegador vê isso
// versão do ServiceWorker pela primeira vez.
self.addEventListener('install', function onServiceWorkerInstall(event) {
  console.log('Evento de Instalação: ', event)
    // Passamos uma promise para event.waitUntil sinalizar como
    // a instalação demora muito e se falhou
  event.waitUntil(
    // Abrimos um cache ...
    caches.open(currentCache).then(function addResourceToCache(cache) {
      return cache.addAll([
        '/src',
        'favicon.ico',
        "/static/js/bundle.js",
        "/static/js/main.chunk.js",
        "/static/js/1.chunk.js",
        "/index.html",
        "/logo.svg",
        "/sockjs-node",
        "/"
      ])
    })
  )
})

// O evento fetch acontece para a solicitação de página com o
// Escopo do ServiceWorker, e qualquer solicitação feita dentro 
// dessa página
self.addEventListener('fetch', function onServiceWorkerFetch(event) {
  console.log('Evento buscar (fetch event): ', event)
    // Chamar event.respondWith significa que estamos no comando
    // de fornecer a resposta. Nós cumprimos uma promessa
    // que resolve com um objeto de resposta
  event.respondWith(
    // Primeiro, verificamos se podemos obter o (talvez atualizado)
    // recurso da rede
    fetch(event.request).then(function updateCacheAndReturnNetworkResponse(networkResponse) {
      console.log('Busca na url(fetch from network for) ' + event.request.url + ' successfull, updating cache')
      caches.open(currentCache).then(function addToCache(cache) {
        return cache.add(event.request)
      })
      return networkResponse
    }).catch(function lookupCachedResponse(reason) {
      // Em caso de falha, procure no cache o recurso solicitado
      console.log('Em caso de falha bucar no url (fetch from network for) ' + event.request.url + ' Falou por: ', reason)
      return caches.match(event.request).then(function returnCachedResponse(cachedResponse) {
        return cachedResponse
      })
    })
  )
})



function polyfillCache() {
  /* eslint-disable */
  if (!Cache.prototype.add) {
    Cache.prototype.add = function add(request) {
      return this.addAll([request])
    }
  }

  if (!Cache.prototype.addAll) {
    Cache.prototype.addAll = function addAll(requests) {
      var cache = this

      // Since DOMExceptions are not constructable:
      function NetworkError(message) {
        this.name = 'NetworkError'
        this.code = 19
        this.message = message
      }
      NetworkError.prototype = Object.create(Error.prototype)

      return Promise.resolve().then(function() {
        if (arguments.length < 1) throw new TypeError()

        // Simulate sequence<(Request or USVString)> binding:
        var sequence = []

        requests = requests.map(function(request) {
          if (request instanceof Request) {
            return request
          }
          else {
            return String(request) // may throw TypeError
          }
        })

        return Promise.all(
          requests.map(function(request) {
            if (typeof request === 'string') {
              request = new Request(request)
            }

            var scheme = new URL(request.url).protocol

            if (scheme !== 'http:' && scheme !== 'https:') {
              throw new NetworkError('Invalid scheme')
            }

            return fetch(request.clone())
          })
        )
      }).then(function(responses) {
        // TODO: check that requests don't overwrite one another
        // (don't think this is possible to polyfill due to opaque responses)
        return Promise.all(
          responses.map(function(response, i) {
            return cache.put(requests[i], response)
          })
        )
      }).then(function() {
        return undefined
      })
    }
  }

  if (!CacheStorage.prototype.match) {
    // This is probably vulnerable to race conditions (removing caches etc)
    CacheStorage.prototype.match = function match(request, opts) {
      var caches = this

      return this.keys().then(function(cacheNames) {
        var match

        return cacheNames.reduce(function(chain, cacheName) {
          return chain.then(function() {
            return match || caches.open(cacheName).then(function(cache) {
              return cache.match(request, opts)
            }).then(function(response) {
              match = response
              return match
            })
          })
        }, Promise.resolve())
      })
    }
  }
}
