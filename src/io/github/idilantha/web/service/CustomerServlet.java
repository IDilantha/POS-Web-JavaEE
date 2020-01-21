package io.github.idilantha.web.service;

import io.github.idilantha.web.db.DBConnection;

import javax.json.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.*;

@WebServlet(urlPatterns = "/api/v1/customers")
public class CustomerServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Connection connection = DBConnection.getDbConnection().getConnection();
        try {
            int page = req.getParameter("page") == null ? 0 : Integer.parseInt(req.getParameter("page"));
            int size = req.getParameter("size") == null ? 5 : Integer.parseInt(req.getParameter("size"));
            PreparedStatement ps = connection.prepareStatement("SELECT * FROM Customer LIMIT ? OFFSET ?");
            ps.setObject(1,size);
            ps.setObject(2,page * size);
            ResultSet rst = ps.executeQuery();
            JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();
            while (rst.next()){
                String id = rst.getString(1);
                String name = rst.getString(3);
                String address = rst.getString(2);
                JsonObjectBuilder ob = Json.createObjectBuilder();
                ob.add("id",id);
                ob.add("name",name);
                ob.add("address",address);
                arrayBuilder.add(ob.build());
            }
            ResultSet resultSet = connection.createStatement().executeQuery("SELECT COUNT(*) FROM Customer");
            resultSet.next();
            resp.setIntHeader("X-Count",resultSet.getInt(1));
            resp.setContentType("application/json");
            resp.getWriter().println(arrayBuilder.build().toString());
        } catch (SQLException e) {
            e.printStackTrace();

        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Connection con = DBConnection.getDbConnection().getConnection();
        try {
            JsonObject jsonObject = Json.createReader(req.getReader()).readObject();

            PreparedStatement ps = con.prepareStatement("INSERT INTO Customer VALUES(?,?,?)");
            ps.setObject(1,jsonObject.getString("id"));
            ps.setObject(2,jsonObject.getString("address"));
            ps.setObject(3,jsonObject.getString("name"));

            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Connection con = DBConnection.getDbConnection().getConnection();
        try {
            JsonObject jsonObject = Json.createReader(req.getReader()).readObject();

            PreparedStatement ps = con.prepareStatement("UPDATE Customer SET address=?, name=? WHERE customerId = ?");
            ps.setObject(3,jsonObject.getString("id"));
            ps.setObject(1,jsonObject.getString("address"));
            ps.setObject(2,jsonObject.getString("name"));

            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Connection con = DBConnection.getDbConnection().getConnection();
        String customerId = req.getParameter("customerId");
        try {
            PreparedStatement ps = con.prepareStatement("DELETE FROM Customer WHERE customerId=?");
            ps.setObject(1,customerId);
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

}
