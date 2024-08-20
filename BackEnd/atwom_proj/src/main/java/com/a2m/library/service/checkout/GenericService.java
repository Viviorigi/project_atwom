package com.a2m.library.service.checkout;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.a2m.library.model.BaseResponse;
import com.a2m.library.model.ListResponse;


public interface GenericService<TDto, TEntity> {
	ListResponse<TDto> findAll(int page, int size, String sort, String filter, String search, boolean all);

    TDto findById(Integer id);

    BaseResponse save(TDto dto);

    TEntity transformDtoToEntity(TDto dto);

    void delete(Integer id);

    void delete(List<Integer> ids);
    List<String> uploadFiles(List<MultipartFile> files,String folder);
}
