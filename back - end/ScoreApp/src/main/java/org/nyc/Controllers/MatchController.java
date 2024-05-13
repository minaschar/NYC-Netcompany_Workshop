package org.nyc.Controllers;

import org.nyc.Entities.MatchEntity;
import org.nyc.Services.MatchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/matches")
public class MatchController {
    private final MatchService matchService;

    public MatchController(MatchService matchService) {
        this.matchService = matchService;
    }

    @PostMapping
    public MatchEntity createMatch(@RequestBody MatchEntity match) {
        return matchService.createMatch(match);
    }

    @PutMapping("/{id}")
    public MatchEntity updateMatch(@PathVariable Long id, @RequestBody MatchEntity match) {
        return matchService.updateMatch(id, match);
    }

    @GetMapping
    public List<MatchEntity> getAllMatches() {
        return matchService.getAllMatches();
    }

    @GetMapping("/{id}")
    public MatchEntity getMatchById(@PathVariable Long id) {
        return matchService.getMatchById(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMatch(@PathVariable Long id) {
        matchService.deleteMatch(id);
        return ResponseEntity.ok().build();
    }
}
