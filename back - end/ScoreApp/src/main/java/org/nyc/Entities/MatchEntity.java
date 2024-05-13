package org.nyc.Entities;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "football_match")
public class MatchEntity {
	
    public MatchEntity() {}

	public MatchEntity(Long id, String teamHomeName, String teamHomeLogo, int teamHomeGoals, int teamHomeYCards,
			int teamHomeFouls, String teamAwayName, String teamAwayLogo, int teamAwayGoals, int teamAwayYCards,
			int teamAwayFouls, Date date) {
		super();
		this.id = id;
		this.teamHomeName = teamHomeName;
		this.teamHomeLogo = teamHomeLogo;
		this.teamHomeGoals = teamHomeGoals;
		this.teamHomeYCards = teamHomeYCards;
		this.teamHomeFouls = teamHomeFouls;
		this.teamAwayName = teamAwayName;
		this.teamAwayLogo = teamAwayLogo;
		this.teamAwayGoals = teamAwayGoals;
		this.teamAwayYCards = teamAwayYCards;
		this.teamAwayFouls = teamAwayFouls;
		this.date = date;
	}

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

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTeamHomeName() {
		return teamHomeName;
	}

	public void setTeamHomeName(String teamHomeName) {
		this.teamHomeName = teamHomeName;
	}

	public String getTeamHomeLogo() {
		return teamHomeLogo;
	}

	public void setTeamHomeLogo(String teamHomeLogo) {
		this.teamHomeLogo = teamHomeLogo;
	}

	public int getTeamHomeGoals() {
		return teamHomeGoals;
	}

	public void setTeamHomeGoals(int teamHomeGoals) {
		this.teamHomeGoals = teamHomeGoals;
	}

	public int getTeamHomeYCards() {
		return teamHomeYCards;
	}

	public void setTeamHomeYCards(int teamHomeYCards) {
		this.teamHomeYCards = teamHomeYCards;
	}

	public int getTeamHomeFouls() {
		return teamHomeFouls;
	}

	public void setTeamHomeFouls(int teamHomeFouls) {
		this.teamHomeFouls = teamHomeFouls;
	}

	public String getTeamAwayName() {
		return teamAwayName;
	}

	public void setTeamAwayName(String teamAwayName) {
		this.teamAwayName = teamAwayName;
	}

	public String getTeamAwayLogo() {
		return teamAwayLogo;
	}

	public void setTeamAwayLogo(String teamAwayLogo) {
		this.teamAwayLogo = teamAwayLogo;
	}

	public int getTeamAwayGoals() {
		return teamAwayGoals;
	}

	public void setTeamAwayGoals(int teamAwayGoals) {
		this.teamAwayGoals = teamAwayGoals;
	}

	public int getTeamAwayYCards() {
		return teamAwayYCards;
	}

	public void setTeamAwayYCards(int teamAwayYCards) {
		this.teamAwayYCards = teamAwayYCards;
	}

	public int getTeamAwayFouls() {
		return teamAwayFouls;
	}

	public void setTeamAwayFouls(int teamAwayFouls) {
		this.teamAwayFouls = teamAwayFouls;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}
}
