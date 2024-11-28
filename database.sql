CREATE DATABASE retro_manager;

CREATE TABLE users (
    user_id BIGSERIAL PRIMARY KEY,
    username VARCHAR(80) NOT NULL,
    email VARCHAR(80) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE teams(
    team_id BIGSERIAL PRIMARY KEY,
    team_name VARCHAR(50) NOT NULL
);

CREATE TABLE inviteteams(
    invite_id BIGSERIAL PRIMARY KEY,
    invited_email VARCHAR(50) NOT NULL,
    invited_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    uuid UUID NOT NULL,
    FOREIGN KEY (team_id) REFERENCES teams (team_id),
    FOREIGN KEY (invited_by) REFERENCES users (user_id)
);

CREATE TABLE dashboard (
    dashboard_id BIGSERIAL PRIMARY KEY,
    created_at DATE DEFAULT CURRENT_DATE,
    participants_count INT DEFAULT 0,
    creator_id BIGINT NOT NULL,
    team_name VARCHAR(50),
    FOREIGN KEY (creator_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE standups(
    standup_id BIGSERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    team_id INTEGER REFERENCES teams(team_id),
    accomplished TEXT,
    not_well TEXT,
    working_on TEXT,
    improvement TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
