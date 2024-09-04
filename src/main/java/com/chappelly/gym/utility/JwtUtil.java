package com.chappelly.gym.utility;

import com.chappelly.gym.entities.User;
import com.chappelly.gym.services.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.Cookie;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Date;
import java.util.Optional;

@Service
public class JwtUtil {

    private final UserService userService;

    public JwtUtil(UserService userService) {
        this.userService = userService;
    }

    private static final String JWT_SECRET = System.getenv("JWT_SECRET");
    private static final int JWT_EXPIRE = Integer.parseInt(System.getenv("JWT_EXPIRE"));
    private final SecretKey key = new SecretKeySpec(JWT_SECRET.getBytes(), SignatureAlgorithm.HS256.getJcaName());

    public String generateJwtToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + JWT_EXPIRE))
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    public String parseJwtToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public String validateJwtToken(Cookie[] cookies) {
        if (cookies == null) return null;

        String jwt = null;
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("JWT_TOKEN")) {
                jwt = cookie.getValue();
            }
        }
        if (jwt == null) return null;
        return parseJwtToken(jwt);
    }

    public Optional<User> getUserFromJwtToken(Cookie[] cookies) {
        String email = validateJwtToken(cookies);
        if (email == null) return Optional.empty();

        User user = userService.getUserByEmail(email);
        if (user == null) return Optional.empty();

        return Optional.of(user);
    }
}
