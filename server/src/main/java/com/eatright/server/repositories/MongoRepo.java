package com.eatright.server.repositories;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import com.eatright.server.models.Remarks;

@Repository
public class MongoRepo {

    @Autowired
    private MongoTemplate mongoTemplate;

    private static final String REMARKS_COL = "remarks";

    public Remarks insertRemarks(Remarks r) {
        return mongoTemplate.insert(r, REMARKS_COL);
    }
    
    public List<Remarks> getAllRemarks(String recipeId){
        Pageable pageable = PageRequest.of(0, 10);

        Query remarksQuery = new Query()
                    .addCriteria(Criteria.where("recipeId").is(recipeId))
                    .with(pageable);
        List<Remarks> filteredRemarks = 
        mongoTemplate.find(remarksQuery, Remarks.class, REMARKS_COL);
        Page<Remarks> remarksPage = PageableExecutionUtils.getPage(
                filteredRemarks,
                pageable,
                () -> mongoTemplate.count(remarksQuery, Remarks.class));
        return remarksPage.toList();
    }

    public void deleteRemarks(String recipeId) {
        Query remarkQuery = new Query()
                .addCriteria(Criteria.where("recipeId").is(recipeId));
        mongoTemplate.remove(remarkQuery, Remarks.class, REMARKS_COL);
    }
}
