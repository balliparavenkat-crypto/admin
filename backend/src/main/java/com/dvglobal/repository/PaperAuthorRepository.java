package com.dvglobal.repository;

import com.dvglobal.entity.PaperAuthor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaperAuthorRepository extends JpaRepository<PaperAuthor, Long> {
    List<PaperAuthor> findByPaperId(Long paperId);
}
