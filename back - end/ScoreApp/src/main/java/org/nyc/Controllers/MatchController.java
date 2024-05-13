package org.nyc.Controllers;

import org.nyc.Entities.MatchEntity;
import org.nyc.Services.MatchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import javax.transaction.Transactional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/matches")
public class MatchController {
    private final MatchService matchService;

    public MatchController(MatchService matchService) {
        this.matchService = matchService;
    }

    @PostMapping
    @Transactional
    public MatchEntity createMatch(@RequestBody MatchEntity match) {
        return matchService.createMatch(match);
    }

    @PutMapping("/{id}")
    @Transactional
    public MatchEntity updateMatch(@PathVariable Long id, @RequestBody MatchEntity match) {
        return matchService.updateMatch(id, match);
    }

    @GetMapping
    @Transactional
    public List<MatchEntity> getAllMatches() {
        return matchService.getAllMatches();
    }

    @GetMapping("/{id}")
    @Transactional
    public MatchEntity getMatchById(@PathVariable Long id) {
        return matchService.getMatchById(id);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> deleteMatch(@PathVariable Long id) {
        matchService.deleteMatch(id);
        return ResponseEntity.ok().build();
    }
}
