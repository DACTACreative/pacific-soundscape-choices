export interface GameOption {
  text: string;
  theme: string;
  theme_points_Political_Leadership_and_Regionalism?: number;
  theme_points_People_Centered_Development?: number;
  theme_points_Peace_and_Security?: number;
  theme_points_Resource_and_Economic_Development?: number;
  theme_points_Climate_Change_and_Disasters?: number;
  theme_points_Ocean_and_Environment?: number;
  theme_points_Technology_and_Connectivity?: number;
  mitigation_score: number;
}

export interface GameQuestion {
  id: number;
  text: string;
  options: GameOption[];
}

export interface ThemeScores {
  Political_Leadership_and_Regionalism: number;
  People_Centered_Development: number;
  Peace_and_Security: number;
  Resource_and_Economic_Development: number;
  Climate_Change_and_Disasters: number;
  Ocean_and_Environment: number;
  Technology_and_Connectivity: number;
}

export interface ThemeAnswers {
  Political_Leadership_and_Regionalism: string[];
  People_Centered_Development: string[];
  Peace_and_Security: string[];
  Resource_and_Economic_Development: string[];
  Climate_Change_and_Disasters: string[];
  Ocean_and_Environment: string[];
  Technology_and_Connectivity: string[];
}