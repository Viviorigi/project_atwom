package com.a2m.library.util;

import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.data.jpa.domain.Specification;

import io.github.perplexhub.rsql.RSQLJPASupport;


public class SearchUtil {
    public static <T> Specification<T> pars(String search,
            Map<String, String> fieldTypes) {
        if (search == null || search.isBlank() || fieldTypes == null || fieldTypes.isEmpty()) {
            return RSQLJPASupport.toSpecification("");
        }

        String rsqlQuery = fieldTypes.keySet().stream()
                .map(field -> {
                    String type = fieldTypes.get(field);
                    if ("number".equals(type)) {
                        // Assuming a numeric search value should be applied here
                        try {
                            Double.parseDouble(search.trim());
                            return field + "==" + search.trim();
                        } catch (NumberFormatException e) {
                            return ""; // Skip invalid numeric values
                        }
                    } else {
                        return field + "=like='" + search.trim() + "'";
                    }
                })
                .filter(query -> !query.isEmpty())
                .collect(Collectors.joining(","));

        return RSQLJPASupport.toSpecification(rsqlQuery);
    }
}
