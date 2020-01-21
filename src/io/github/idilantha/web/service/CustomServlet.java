package io.github.idilantha.web.service;

import io.github.idilantha.web.db.DBConnection;

import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@WebServlet(urlPatterns = "/api/v1/custom")
public class CustomServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Connection connection = DBConnection.getDbConnection().getConnection();
        try {

            ResultSet resultSet = connection.createStatement().executeQuery("SELECT COUNT(*) FROM Customer");
            ResultSet resultSet1 = connection.createStatement().executeQuery("SELECT COUNT(*) FROM Item");
            ResultSet resultSet2 = connection.createStatement().executeQuery("SELECT COUNT(*) FROM `Order`");

            resultSet.next();
            resp.setIntHeader("C-Count",resultSet.getInt(1));

            resultSet1.next();
            resp.setIntHeader("I-Count",resultSet1.getInt(1));

            resultSet2.next();
            resp.setIntHeader("O-Count",resultSet2.getInt(1));

            resp.setContentType("application/json");
            resp.getWriter().println();
        } catch (SQLException e) {
            e.printStackTrace();

        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }

}
