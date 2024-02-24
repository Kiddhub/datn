package com.project.config;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DateTimeConfig {
    public static LocalDateTime formatDateTime(LocalDateTime dateTime) {
        String pattern = "yyyy/MM/dd HH:mm";
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
        String formattedString = dateTime.format(formatter);
        return LocalDateTime.parse(formattedString, formatter);
    }
}
