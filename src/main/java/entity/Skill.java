package com.example.skillswap.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "skills")
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String email;
    private String offered;
    private String wanted;
    private String level;

    public Skill() {}

    public Skill(Long id, String username, String email, String offered, String wanted, String level) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.offered = offered;
        this.wanted = wanted;
        this.level = level;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getOffered() { return offered; }
    public void setOffered(String offered) { this.offered = offered; }
    public String getWanted() { return wanted; }
    public void setWanted(String wanted) { this.wanted = wanted; }
    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }
}