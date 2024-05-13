package org.nyc;

import org.nyc.Entities.MatchEntity;
import org.nyc.Services.MatchService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer implements CommandLineRunner {

    private final MatchService matchService;

    public DataInitializer(MatchService matchService) {
        this.matchService = matchService;
    }

    @Override
    public void run(String... args) throws Exception {
        // Creating dummy match 1
        MatchEntity match1 = new MatchEntity();
        match1.setTeamHomeName("Home Team A");
        match1.setTeamHomeLogo("https://example.com/homeA-logo.png");
        match1.setTeamHomeGoals(2);
        match1.setTeamHomeYCards(1);
        match1.setTeamHomeFouls(3);
        match1.setTeamAwayName("Away Team A");
        match1.setTeamAwayLogo("https://example.com/awayA-logo.png");
        match1.setTeamAwayGoals(1);
        match1.setTeamAwayYCards(2);
        match1.setTeamAwayFouls(2);

        // Creating dummy match 2
        MatchEntity match2 = new MatchEntity();
        match2.setTeamHomeName("Home Team B");
        match2.setTeamHomeLogo("https://example.com/homeB-logo.png");
        match2.setTeamHomeGoals(3);
        match2.setTeamHomeYCards(0);
        match2.setTeamHomeFouls(1);
        match2.setTeamAwayName("Away Team B");
        match2.setTeamAwayLogo("https://example.com/awayB-logo.png");
        match2.setTeamAwayGoals(0);
        match2.setTeamAwayYCards(1);
        match2.setTeamAwayFouls(3);

        // Save these matches using the MatchService
        matchService.createMatch(match1);
        matchService.createMatch(match2);
    }
}
