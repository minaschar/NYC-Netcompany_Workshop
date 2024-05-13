package org.nyc.Entities;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name = "football_match")
public class MatchEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "team_home_name")
    private String teamHomeName;

    @Column(name = "team_home_logo")
    private String teamHomeLogo;

    @Column(name = "team_home_goals")
    private int teamHomeGoals = 0;

    @Column(name = "team_home_ycards")
    private int teamHomeYCards = 0;

    @Column(name = "team_home_fouls")
    private int teamHomeFouls = 0;

    @Column(name = "team_away_name")
    private String teamAwayName;

    @Column(name = "team_away_logo")
    private String teamAwayLogo;

    @Column(name = "team_away_goals")
    private int teamAwayGoals = 0;

    @Column(name = "team_away_ycards")
    private int teamAwayYCards = 0;

    @Column(name = "team_away_fouls")
    private int teamAwayFouls = 0;

    @Column(name = "date")
    private Date date;
}
