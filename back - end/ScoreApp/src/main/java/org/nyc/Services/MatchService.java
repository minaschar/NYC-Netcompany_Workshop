package org.nyc.Services;

import org.nyc.Entities.MatchEntity;
import org.nyc.Repositories.MatchRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MatchService {
    private final MatchRepository matchRepository;

    public MatchService(MatchRepository matchRepository) {
        this.matchRepository = matchRepository;
    }

    public MatchEntity createMatch(MatchEntity match) {
        return matchRepository.save(match);
    }

    public MatchEntity updateMatch(Long id, MatchEntity updatedMatch) {
        return matchRepository.findById(id)
                .map(match -> {
                    match.setTeamHomeGoals(updatedMatch.getTeamHomeGoals());
                    match.setTeamHomeYCards(updatedMatch.getTeamHomeYCards());
                    match.setTeamHomeFouls(updatedMatch.getTeamHomeFouls());
                    match.setTeamAwayGoals(updatedMatch.getTeamAwayGoals());
                    match.setTeamAwayYCards(updatedMatch.getTeamAwayYCards());
                    match.setTeamAwayFouls(updatedMatch.getTeamAwayFouls());
                    return matchRepository.save(match);
                })
                .orElseThrow(() -> new RuntimeException("Match not found with id " + id));
    }

    public List<MatchEntity> getAllMatches() {
        return matchRepository.findAll();
    }

    public MatchEntity getMatchById(Long id) {
        return matchRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Match not found with id " + id));
    }

    public void deleteMatch(Long id) {
        matchRepository.deleteById(id);
    }
}
