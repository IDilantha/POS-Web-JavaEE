package io.github.idilantha.web.service;

import io.github.idilantha.web.db.DBConnection;

import javax.json.*;
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
import java.util.Date;

@WebServlet(urlPatterns = "/api/v1/orders")
public class OrderServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Connection connection = DBConnection.getDbConnection().getConnection();
        try {
            int page = req.getParameter("page") == null ? 0 : Integer.parseInt(req.getParameter("page"));
            int size = req.getParameter("size") == null ? 5 : Integer.parseInt(req.getParameter("size"));
            PreparedStatement ps = connection.prepareStatement("SELECT * FROM `Order` LIMIT ? OFFSET ?");
            ps.setObject(1,size);
            ps.setObject(2,page * size);
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
            ResultSet resultSet = connection.createStatement().executeQuery("SELECT COUNT(*) FROM `Order`");
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
            PreparedStatement ps1 = con.prepareStatement("SELECT id FROM `Order` Order By id DESC LIMIT 1");
            ResultSet oid = ps1.executeQuery();

            if (oid.next()){
                System.out.println("Order Id : "+oid.getString(1));

                String cusId = req.getParameter("cusId");
                int orderID = Integer.valueOf(oid.getString(1))+1;
                PreparedStatement ps = con.prepareStatement("INSERT INTO `Order` VALUES(?,?,?)");
                ps.setObject(1,orderID);
                ps.setObject(2,new java.sql.Date(new Date().getTime()));
                ps.setObject(3,cusId);

                int i = ps.executeUpdate();
                System.out.println("Order Placed : "+i);

                JsonArray jsonValues = Json.createReader(req.getReader()).readArray();
                System.out.println("Order Details size : "+jsonValues.size());
                if (i>0){
                    for (int j=0;j< jsonValues.size();j++){
                        JsonObject jsonObject = jsonValues.getJsonObject(j);

                        PreparedStatement ps2 = con.prepareStatement("INSERT INTO OrderDetail VALUES(?,?,?,?)");
                        ps2.setObject(1,jsonObject.getString("code"));
                        ps2.setObject(2,orderID);
                        ps2.setObject(3,jsonObject.getString("qtyOnHand"));
                        ps2.setObject(4,jsonObject.getString("unitPrice"));
                        ps2.executeUpdate();
                    }
                }
            }

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
        try {
            JsonObject jsonObject = Json.createReader(req.getReader()).readObject();

            PreparedStatement ps = con.prepareStatement("DELETE FROM Item WHERE code=?");
            ps.setObject(1,jsonObject.getString("code"));

            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }

    }
}
