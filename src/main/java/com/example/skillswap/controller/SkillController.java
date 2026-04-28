package com.example.skillswap.controller;

import com.example.skillswap.entity.Skill;
import com.example.skillswap.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/skills")
@CrossOrigin(origins = "*")
public class SkillController {

    @Autowired
    private SkillRepository repo;

    @PostMapping
    public ResponseEntity<Skill> create(@RequestBody Skill skill) {
        return new ResponseEntity<>(repo.save(skill), HttpStatus.CREATED);
    }

    @GetMapping
    public List<Skill> getAll() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Skill> getById(@PathVariable Long id) {
        return repo.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Skill> update(@PathVariable Long id, @RequestBody Skill updated) {
        return repo.findById(id).map(skill -> {
            skill.setUsername(updated.getUsername());
            skill.setEmail(updated.getEmail());
            skill.setOffered(updated.getOffered());
            skill.setWanted(updated.getWanted());
            skill.setLevel(updated.getLevel());
            return ResponseEntity.ok(repo.save(skill));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}