package com.example.skillswap.controller;

import com.example.skillswap.entity.Skill;
import com.example.skillswap.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/")
public class WebController {

    @Autowired
    private SkillRepository repo;

    @GetMapping
    public String home(Model model) {
        model.addAttribute("skills", repo.findAll());
        return "index";
    }

    @GetMapping("add")
    public String addSkillForm(Model model) {
        model.addAttribute("skill", new Skill());
        return "add-skill";
    }

    @PostMapping("save")
    public String saveSkill(@ModelAttribute Skill skill) {
        repo.save(skill);
        return "redirect:/";
    }

    @GetMapping("edit/{id}")
    public String editSkillForm(@PathVariable Long id, Model model) {
        repo.findById(id).ifPresent(skill -> model.addAttribute("skill", skill));
        return "edit-skill";
    }

    @PostMapping("update/{id}")
    public String updateSkill(@PathVariable Long id, @ModelAttribute Skill skill) {
        repo.findById(id).ifPresent(existing -> {
            existing.setUsername(skill.getUsername());
            existing.setEmail(skill.getEmail());
            existing.setOffered(skill.getOffered());
            existing.setWanted(skill.getWanted());
            existing.setLevel(skill.getLevel());
            repo.save(existing);
        });
        return "redirect:/";
    }

    @GetMapping("delete/{id}")
    public String deleteSkill(@PathVariable Long id) {
        repo.deleteById(id);
        return "redirect:/";
    }
}
