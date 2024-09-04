package com.chappelly.gym.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/")
public class ClientController {

    @GetMapping("/{path:^(?!index\\.html|.*\\.js|.*\\.css|.*\\.png$).*$}")
    public String index() {
        return "forward:/index.html";
    }
}
