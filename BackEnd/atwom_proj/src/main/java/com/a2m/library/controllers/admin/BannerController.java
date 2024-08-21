package com.a2m.library.controllers.admin;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.a2m.library.dto.UserDTO;
import com.a2m.library.dto.response.BannerListResponse;
import com.a2m.library.dto.response.MessageResponse;
import com.a2m.library.dto.response.UserListResponse;
import com.a2m.library.dto.response.UserResponse;
import com.a2m.library.model.Banner;
import com.a2m.library.model.Book;
import com.a2m.library.service.admin.BannerService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "api/admin")
public class BannerController {
	@Autowired
	private BannerService bannerService;
	@Autowired
	private ObjectMapper objectMapper;
	
	@Value("${file.upload-dir}")
	private String uploadDir;
	
	@PostMapping("/banner/create")
	public ResponseEntity<?> createBanern(
			@RequestParam(required = true) MultipartFile file,
			@RequestParam("bannerDTO") String bannerDTO
			) throws JsonMappingException, JsonProcessingException {
		
		ObjectMapper objectMapper = new ObjectMapper();
	    Banner banner = objectMapper.readValue(bannerDTO, Banner.class);
		if (file != null && !file.isEmpty()) {
			try {
				String originalFilename = file.getOriginalFilename();
				String timestamp = String.valueOf(System.currentTimeMillis());
				String newFilename = timestamp + "_" + originalFilename;

				final Path directory = Paths.get(uploadDir);
				final Path filePath = Paths.get(uploadDir + newFilename);
				if (!Files.exists(directory)) {
					Files.createDirectories(directory);
				}
				Files.write(filePath, file.getBytes());
				banner.setImage(newFilename);
			} catch (Exception e) {
				e.printStackTrace();
				return ResponseEntity.badRequest().body(new MessageResponse("File upload failed"));
			}
		}

		// Save banner information
		try {
			bannerService.save(banner);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
		}
		return ResponseEntity.ok().body(new MessageResponse("Create successful"));
	}
	
	@DeleteMapping("/banner/delete")
	public ResponseEntity<?> deleteBanner(@RequestParam Long id) {
		try {
			bannerService.deleteBanner(id);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
		}
		return ResponseEntity.ok().body(new MessageResponse("Delete successful"));
	}
	
	@PostMapping("/banner/update")
    public ResponseEntity<?> updateBanner(
    		@Valid @RequestPart("bannerDTO") String bannerJson,
            @RequestParam(required = false) MultipartFile file) throws JsonMappingException, JsonProcessingException {

        Banner banner = new Banner();
        banner = objectMapper.readValue(bannerJson, Banner.class);
        if (banner == null) {
            return ResponseEntity.notFound().build();
        }

        if (file != null && !file.isEmpty()) {
            try {
                // Xóa ảnh cũ nếu có
                String oldFilename = banner.getImage();
                if (oldFilename != null && !oldFilename.isEmpty()) {
                    Path oldFilePath = Paths.get(uploadDir).resolve(oldFilename);
                    if (Files.exists(oldFilePath)) {
                        Files.delete(oldFilePath);
                    }
                }

                String originalFilename = file.getOriginalFilename();
                String timestamp = String.valueOf(System.currentTimeMillis());
                String newFilename = timestamp + "_" + originalFilename;

                Path directory = Paths.get(uploadDir);
                Path filePath = directory.resolve(newFilename);
                if (!Files.exists(directory)) {
                    Files.createDirectories(directory);
                }

                Files.write(filePath, file.getBytes());

                banner.setImage(newFilename);

            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.badRequest().body(new MessageResponse("File upload failed"));
            }
        }

        // Lưu thông tin banner đã cập nhật
        try {
            bannerService.update(banner);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }

        return ResponseEntity.ok().body(new MessageResponse("Update successful"));
    }
	
	@GetMapping("/banner/image/{filename:.+}")
    public ResponseEntity<Resource> getBannerImage(@PathVariable String filename) {
        try {
            Path file = Paths.get(uploadDir).resolve(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
            	 String contentType = Files.probeContentType(file);
                 return ResponseEntity.ok()
                         .contentType(MediaType.parseMediaType(contentType))
                         .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
	
	
	@GetMapping(value = "/banner/getAll")
	public ResponseEntity<BannerListResponse> getAll(@RequestParam(defaultValue = "") String keySearch,
			@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "1") int limit) {
		PageRequest pageRequest = PageRequest.of(page - 1, limit);
		Page<Banner> bannerPage = bannerService.findByBannerContaining(keySearch, pageRequest);
		BannerListResponse response = BannerListResponse.builder().banners(bannerPage.getContent())
				.totalPages(bannerPage.getTotalPages()).totalBanners(bannerPage.getTotalElements()).build();
		return ResponseEntity.ok(response);
	}

}
