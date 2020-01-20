package io.github.idilantha.web.filter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter(urlPatterns = {"/api/v1/customers","/api/v1/items","/api/v1/orders"})
public class CORSFilter extends HttpFilter {
    @Override
    protected void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        response.setHeader("Access-Control-Allow-Origin","*");
        response.setHeader("Access-Control-Allow-Methods","OPTIONS, GET, PUT, POST, DELETE");
        response.setHeader("Access-Control-Allow-Headers","Content-Type, X-Count");
        response.setHeader("Access-Control-Expose-Headers","X-Count");
        super.doFilter(request, response, chain);
    }

}
