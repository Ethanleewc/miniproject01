package com.eatright.server.repositories;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class SqlRepo {

    private static final String INSERT_POSTS_TBL = "INSERT INTO posts (recipe_id, remarks) VALUES(?, ?)";
    private static final String DELETE_REMARKS_BY_RECIPE_ID = "DELETE FROM posts WHERE recipe_id=?";

    // private static final String SQL_GET_POST_BY_RECIPE_ID = "select id, recipe_id, remarks from posts where recipe_id=?";

    // @Autowired
    // private JdbcTemplate template;

    @Autowired
    private DataSource dataSource;

    public void uploadPost(Integer recipeId, String remarks) throws SQLException, IOException {

        try (Connection con = dataSource.getConnection();
            PreparedStatement pstmt = con.prepareStatement(INSERT_POSTS_TBL)) {
            pstmt.setInt(1, recipeId);
            pstmt.setString(2, remarks);
            pstmt.executeUpdate();
        }

    }

    public void deletePost(Integer recipeId) throws SQLException {
        try (Connection con = dataSource.getConnection();
             PreparedStatement pstmt = con.prepareStatement(DELETE_REMARKS_BY_RECIPE_ID)) {
            pstmt.setInt(1, recipeId);
            pstmt.executeUpdate();
        }
    }
    
}
