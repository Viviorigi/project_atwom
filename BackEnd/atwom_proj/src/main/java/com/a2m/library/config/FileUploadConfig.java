
package com.a2m.library.config;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import jakarta.annotation.PostConstruct;

@Configuration
public class FileUploadConfig {
	@Value("${file.upload-dir}")
    private String uploadDir;

    private Path resourcePath;
    private Path resourcePathThumb;

    @PostConstruct
    public void init() {
        resourcePath = Paths.get(uploadDir).toAbsolutePath().normalize();
        resourcePathThumb = Paths.get(uploadDir + File.separator + "thumb").toAbsolutePath().normalize();
        try {
            Files.createDirectories(resourcePath);
            Files.createDirectories(resourcePathThumb);
        } catch (IOException e) {
            e.printStackTrace(); // Consider using a logging framework here
        }
    }

    public Path getResourcePath() {
        return resourcePath;
    }

    public Path getResourcePathThumb() {
        return resourcePathThumb;
    }
}
