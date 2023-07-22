"use strict";

const _SOCKET = io();

const chat = (() => {
    const _elementos = {
        mensajes: $("#listaMensajes"),
        escribiendo: $("#escribiendo"),
        inputMensaje: $("#mensaje")
    }

    const _utils = {
        crearHTML: ((mensaje, fecha) => {
            return `
            <li class="left clearfix">
                <div class="chat-body clearfix">
                    <div class="header">
                        <strong class="primary-font">Anónimo</strong>
                        <small class="pull-right text-muted">
                            <span class="glyphicon glyphicon-time"></span>${fecha}
                        </small>
                    </div>
                    <p>${mensaje}</p>
                </div>
            </li>`;
        }),

        scroolListaMensajes: (() => {
            $(".card-body").animate({
                scrollTop: $(this).height()
            }, "slow");
        })
    }

    const _eventos = {
        enviarMensaje: (() => {
            $("form").submit((e) => {
                e.preventDefault();

                if (!_elementos.inputMensaje.val() ||_elementos.inputMensaje.val() === "") return false;

                _SOCKET.emit("chat message", _elementos.inputMensaje.val());

                let html = _utils.crearHTML(_elementos.inputMensaje.val(), "justo ahora");

                _elementos.mensajes.append(html);

                _elementos.inputMensaje.val("");

                _utils.scroolListaMensajes();

                return false;
            });
        }),

        obtenerMensaje: (() => {
            _SOCKET.on("received", data => {
                let html = _utils.crearHTML(data.message, "justo ahora");
                _elementos.mensajes.append(html);
                _utils.scroolListaMensajes();
            });
        }),

        cargarMensajes: (() => {
            fetch("/chat").then(data => {
                return data.json();
            }).then(json => {
                json.map(data => {
                    let html = _utils.crearHTML(data.message, formatTimeAgo(data.createdAt));
                    _elementos.mensajes.append(html);
                });
                _utils.scroolListaMensajes();
            });
        }),

        detectarEscribir: (() => {
            _elementos.inputMensaje.on("keypress", () => {
                _SOCKET.emit("typing", {
                    user: "Someone",
                    message: "is typing..."
                });
            });

            _SOCKET.on("notifyTyping", data => {
                _elementos.escribiendo.html(data.user + " " + data.message);
            });
        }),

        detectarDejarEscribir: (() => {
            _elementos.inputMensaje.on("keyup", () => {
                _SOCKET.emit("stopTyping", "");
            });

            _SOCKET.on("notifyStopTyping", () => {
                _elementos.escribiendo.html("&nbsp;");
            })
        })
    }

    const inicializar = (() => {
        _eventos.enviarMensaje();
        _eventos.obtenerMensaje();
        _eventos.cargarMensajes();
        _eventos.detectarEscribir();
        _eventos.detectarDejarEscribir();
    });

    return {
        inicializar: inicializar
    }
})();

(() => {
    chat.inicializar();
})();