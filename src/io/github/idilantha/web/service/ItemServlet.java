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
import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@WebServlet(urlPatterns = "/api/v1/items")
public class ItemServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Connection connection = DBConnection.getDbConnection().getConnection();
        try {
            int page = req.getParameter("page") == null ? 0 : Integer.parseInt(req.getParameter("page"));
            int size = req.getParameter("size") == null ? 5 : Integer.parseInt(req.getParameter("size"));
            PreparedStatement ps = connection.prepareStatement("SELECT * FROM Item ");
            /*ps.setObject(1,size);
            ps.setObject(2,page * size);*/
            ResultSet rst = ps.executeQuery();
            JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();
            while (rst.next()){
                String code = rst.getString(1);
                String description = rst.getString(2);
                String qtyOnHand = rst.getString(3);
                String unitPrice = rst.getString(4);
                JsonObjectBuilder ob = Json.createObjectBuilder();
                ob.add("code",code);
                ob.add("description",description);
                ob.add("qtyOnHand",qtyOnHand);
                ob.add("unitPrice",unitPrice);
                arrayBuilder.add(ob.build());
            }
            ResultSet resultSet = connection.createStatement().executeQuery("SELECT COUNT(*) FROM Item");
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

            PreparedStatement ps = con.prepareStatement("INSERT INTO Item VALUES(?,?,?,?)");
            ps.setObject(1,jsonObject.getString("code"));
            ps.setObject(2,jsonObject.getString("description"));
            ps.setObject(3,jsonObject.getString("qtyOnHand"));
            ps.setObject(4,jsonObject.getString("unitPrice"));

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

            PreparedStatement ps = con.prepareStatement("UPDATE Item SET description=?, qtyOnHand=?, unitPrice=? WHERE code = ?");
            ps.setObject(4,jsonObject.getString("code"));
            ps.setObject(1,jsonObject.getString("description"));
            ps.setObject(2,jsonObject.getString("qtyOnHand"));
            ps.setObject(3,jsonObject.getString("unitPrice"));

            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Connection con = DBConnection.getDbConnection().getConnection();
        String code = req.getParameter("code");
        try {
            PreparedStatement ps = con.prepareStatement("DELETE FROM Item WHERE code=?");
            ps.setObject(1,code);
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }

    }
}
