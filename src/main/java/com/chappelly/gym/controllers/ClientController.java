package com.chappelly.gym.controllers;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/")
public class ClientController implements ErrorController {

    @GetMapping("/{path:^(?!index\\.html|.*\\.js|.*\\.css|.*\\.png$).*$}")
    public String index() {
        return "forward:/index.html";
    }

    @GetMapping("/error")
    public String error() {
        return "forward:/index.html";
    }
}
