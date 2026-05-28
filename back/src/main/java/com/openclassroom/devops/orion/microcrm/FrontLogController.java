package com.openclassroom.devops.orion.microcrm;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/logs")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost", "http://localhost:80"})
public class FrontLogController {

    private static final Logger log = LoggerFactory.getLogger(FrontLogController.class);

    @PostMapping
    public void receiveFrontLog(@RequestBody LogRequestDTO payload) {
        String logMessage = "[FRONTEND] " + payload.getMessage();

        if ("ERROR".equalsIgnoreCase(payload.getLevel())) {
            log.error(logMessage);
        } else if ("WARN".equalsIgnoreCase(payload.getLevel())) {
            log.warn(logMessage);
        } else {
            log.info(logMessage);
        }
    }
}