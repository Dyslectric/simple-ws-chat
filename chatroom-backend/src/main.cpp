// crow_server.cpp
#include "crow/app.h"
#include <crow/websocket.h>

int main() {
    crow::SimpleApp app;

    std::vector<crow::websocket::connection*> connections;

    CROW_WEBSOCKET_ROUTE(app, "/chatroom-api/ws")
        .onopen([&](crow::websocket::connection& conn) {
            CROW_LOG_INFO << "New websocket connection!";
            connections.push_back(&conn);
        })
        .onclose([&](crow::websocket::connection& conn, const std::string& reason) {
            CROW_LOG_INFO << "Websocket connection closed: " << reason;
            connections.erase(
                std::remove(connections.begin(), connections.end(), &conn),
                connections.end()
            );
        })
        .onmessage([&](crow::websocket::connection& conn, const std::string& data, bool is_binary) {
            CROW_LOG_INFO << "Received message: " << data;
            // Echo the received message back to the client
            for (auto* client_conn : connections) {
                if (client_conn != &conn) {
                    client_conn->send_text("Broadcast message: " + data);
                }
            }
            conn.send_text("Server response: " + data);
        });

    // Define the port and bind address
    app.port(4000).multithreaded().run();
}


