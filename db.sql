CREATE DATABASE chatbotbuilder;

USE chatbotbuilder;

CREATE TABLE `admin` (
  `admin_id` INT NOT NULL AUTO_INCREMENT,
  `owner_name` VARCHAR(50) NOT NULL,
  `contact_no` VARCHAR(10) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `website_url` VARCHAR(255),
  `is_active` TINYINT(1) DEFAULT 0,
  `registration_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `expiration_date` DATETIME,
  `company_name` VARCHAR(100),
  `sector` VARCHAR(100),
  `subscription_active` TINYINT(1) DEFAULT 1,
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `website_url` (`website_url`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `chatbotbuilder_users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` ENUM('admin','agent') NOT NULL,
  `admin_id` INT DEFAULT NULL,
  `registration_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `is_active` TINYINT(1) DEFAULT 0,
  `refresh_token` TEXT,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `admin_id` (`admin_id`),
  CONSTRAINT `fk_users_admin`
    FOREIGN KEY (`admin_id`) REFERENCES `admin`(`admin_id`)
    ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `agent` (
  `agent_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(50) NOT NULL,
  `last_name` VARCHAR(50) NOT NULL,
  `admin_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`agent_id`),
  KEY `admin_id` (`admin_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `fk_agent_admin`
    FOREIGN KEY (`admin_id`) REFERENCES `admin`(`admin_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_agent_user`
    FOREIGN KEY (`user_id`) REFERENCES `chatbotbuilder_users`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `team` (
  `team_id` INT NOT NULL AUTO_INCREMENT,
  `team_name` VARCHAR(100) NOT NULL,
  `admin_id` INT NOT NULL,
  PRIMARY KEY (`team_id`),
  KEY `admin_id` (`admin_id`),
  CONSTRAINT `fk_team_admin`
    FOREIGN KEY (`admin_id`) REFERENCES `admin`(`admin_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Many-to-Many: agents in teams
CREATE TABLE `agent_team` (
  `agent_id` INT NOT NULL,
  `team_id` INT NOT NULL,
  PRIMARY KEY (`agent_id`,`team_id`),
  KEY `team_id` (`team_id`),
  CONSTRAINT `fk_agentteam_agent`
    FOREIGN KEY (`agent_id`) REFERENCES `agent`(`agent_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_agentteam_team`
    FOREIGN KEY (`team_id`) REFERENCES `team`(`team_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `user_conv_journey` (
  `user_conv_journey_id` VARCHAR(7) NOT NULL,
  `user_conversation` TEXT,
  `conv_started` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `conv_ended` DATETIME DEFAULT NULL,
  `chatbot_user_id` VARCHAR(7) DEFAULT NULL,
  PRIMARY KEY (`user_conv_journey_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `chatbot_data` (
  `chatbot_user_id` VARCHAR(7) NOT NULL,
  `chatbot_user_name` VARCHAR(50) NOT NULL,
  `contact` VARCHAR(10) DEFAULT NULL,
  `email` VARCHAR(50) DEFAULT NULL,
  `satisfaction_level` FLOAT DEFAULT NULL,
  `total_levels` INT DEFAULT NULL,
  `session_level` INT DEFAULT NULL,
  `is_terminated` TINYINT(1) DEFAULT NULL,
  `timestamp` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `userquery` TEXT,
  `callback_requested` TINYINT(1) DEFAULT NULL,
  `user_conv_journey_id` VARCHAR(7) DEFAULT NULL,
  `audio_data` BLOB,
  `location` VARCHAR(150) DEFAULT NULL,
  `feedback_details` TEXT,
  `admin_id` INT DEFAULT NULL,
  `chatbot_number` INT DEFAULT '1',
  `filename` VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (`chatbot_user_id`),
  KEY `fk_chatbot_data_journey` (`user_conv_journey_id`),
  KEY `fk_chatbot_data_admin` (`admin_id`),
  CONSTRAINT `fk_chatbot_data_journey`
    FOREIGN KEY (`user_conv_journey_id`) REFERENCES `user_conv_journey`(`user_conv_journey_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_chatbot_data_admin`
    FOREIGN KEY (`admin_id`) REFERENCES `admin`(`admin_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tickets_data` (
  `ticket_id` VARCHAR(7) NOT NULL,
  `ticket_title` VARCHAR(255) DEFAULT NULL,
  `ticket_created` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `chatbot_user_id` VARCHAR(7) NOT NULL,
  `chatbot_user_name` VARCHAR(50) DEFAULT NULL,
  `contact` VARCHAR(10) DEFAULT NULL,
  `email` VARCHAR(50) DEFAULT NULL,
  `callback_requested` TINYINT(1) DEFAULT NULL,
  `callback_request_resolution_status` INT DEFAULT NULL,
  `userquery` TEXT,
  `user_query_resolved` TINYINT(1) DEFAULT NULL,
  `user_conv_journey_id` VARCHAR(7) DEFAULT NULL,
  `is_ticket_resolved` TINYINT(1) DEFAULT NULL,
  `ticket_resolved` DATETIME DEFAULT NULL,
  `ticket_starred` TINYINT(1) DEFAULT NULL,
  `location` VARCHAR(150) DEFAULT NULL,
  `feedback_details` TEXT,
  `admin_id` INT DEFAULT NULL,
  `team_id` INT DEFAULT NULL,
  PRIMARY KEY (`ticket_id`),
  KEY `chatbot_user_id` (`chatbot_user_id`),
  KEY `user_conv_journey_id` (`user_conv_journey_id`),
  KEY `team_id` (`team_id`),
  KEY `ix_tickets_data_location` (`location`),
  CONSTRAINT `fk_tickets_data_business_owner`
    FOREIGN KEY (`admin_id`) REFERENCES `admin`(`admin_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_tickets_data_journey`
    FOREIGN KEY (`user_conv_journey_id`) REFERENCES `user_conv_journey`(`user_conv_journey_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_tickets_data_team`
    FOREIGN KEY (`team_id`) REFERENCES `team`(`team_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;










