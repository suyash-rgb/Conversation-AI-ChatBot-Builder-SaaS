# Database Schema Documentation

Outline structure of the `chatbotbuilder` database, detailing each table, its columns, and how they relate to one another. It’s designed to give you a clear picture of entities, their responsibilities, and interdependencies in simple terms.

---

## Tables Overview

- **admin**  
- **chatbotbuilder_users**  
- **agent**  
- **team**  
- **agent_team**  
- **user_conv_journey**  
- **chatbot_data**  
- **tickets_data**  

---

## Table Details

### admin

- Columns:  
  - `admin_id` (PK, auto-increment)  
  - `owner_name`, `contact_no`, `email`  
  - `website_url`, `company_name`, `sector`  
  - `is_active`, `subscription_active`  
  - `registration_date`, `expiration_date`  

This table holds business owner records. Each owner has contact details, subscription status, and activation flags. Unique constraints on email and website URL ensure no duplicates.

---

### chatbotbuilder_users

- Columns:  
  - `user_id` (PK, auto-increment)  
  - `username`, `email`, `password_hash`  
  - `role` (`admin` or `agent`)  
  - `admin_id` (FK → `admin.admin_id`)  
  - `registration_date`, `is_active`, `refresh_token`  

Users log into the system as either administrators or agents. They link back to an admin record (nullable) and manage authentication via hashed passwords and tokens.

---

### agent

- Columns:  
  - `agent_id` (PK, auto-increment)  
  - `first_name`, `last_name`  
  - `admin_id` (FK → `admin.admin_id`)  
  - `user_id` (FK → `chatbotbuilder_users.user_id`)  

Agents represent staff members under an admin. Each agent ties to both an `admin` record (ownership) and a `chatbotbuilder_users` entry (login credentials).

---

### team

- Columns:  
  - `team_id` (PK, auto-increment)  
  - `team_name`  
  - `admin_id` (FK → `admin.admin_id`)  

Teams are organizational groups created by an admin. They allow clustering of agents for ticket assignments or reporting.

---

### agent_team

- Columns:  
  - `agent_id` (PK, FK → `agent.agent_id`)  
  - `team_id` (PK, FK → `team.team_id`)  

This join table models the many-to-many relationship between agents and teams. An agent can belong to multiple teams, and a team can have multiple agents.

---

### user_conv_journey

- Columns:  
  - `user_conv_journey_id` (PK, VARCHAR)  
  - `user_conversation` (TEXT)  
  - `conv_started`, `conv_ended`  
  - `chatbot_user_id` (nullable)  

Each record captures one user’s chat session, with timestamps and a transcript of the exchange.

---

### chatbot_data

- Columns:  
  - `chatbot_user_id` (PK, VARCHAR)  
  - `chatbot_user_name`, `contact`, `email`  
  - `satisfaction_level`, `total_levels`, `session_level`  
  - `is_terminated`, `timestamp`  
  - `userquery`, `callback_requested`  
  - `user_conv_journey_id` (FK → `user_conv_journey.user_conv_journey_id`)  
  - `audio_data` (BLOB), `location`, `feedback_details`  
  - `admin_id` (FK → `admin.admin_id`)  
  - `chatbot_number`, `filename`  

This table stores per-user session metrics and metadata, linking back to a conversation journey and the admin who owns that data.

---

### tickets_data

- Columns:  
  - `ticket_id` (PK, VARCHAR)  
  - `ticket_title`, `ticket_created`  
  - `chatbot_user_id`, `chatbot_user_name`, `contact`, `email`  
  - `callback_requested`, `callback_request_resolution_status`  
  - `userquery`, `user_query_resolved`  
  - `user_conv_journey_id` (FK → `user_conv_journey.user_conv_journey_id`)  
  - `is_ticket_resolved`, `ticket_resolved`, `ticket_starred`  
  - `location`, `feedback_details`  
  - `admin_id` (FK → `admin.admin_id`)  
  - `team_id` (FK → `team.team_id`)  

Support tickets raised by users are recorded here, with status flags, resolution info, and links to the owning admin, team, and conversation journey.

---

## Relationships and Dependencies

| Source Table           | Foreign Key              | Target Table         | Cardinality               | On Delete Action |
|------------------------|--------------------------|----------------------|---------------------------|------------------|
| chatbotbuilder_users   | `admin_id`               | admin                | Many users → One admin    | SET NULL         |
| agent                  | `admin_id`               | admin                | Many agents → One admin   | CASCADE          |
| agent                  | `user_id`                | chatbotbuilder_users | One agent → One user      | CASCADE          |
| team                   | `admin_id`               | admin                | Many teams → One admin    | CASCADE          |
| agent_team             | `agent_id`               | agent                | Many-to-many              | CASCADE          |
| agent_team             | `team_id`                | team                 | Many-to-many              | CASCADE          |
| chatbot_data           | `user_conv_journey_id`   | user_conv_journey    | Many data rows → One journey | CASCADE       |
| chatbot_data           | `admin_id`               | admin                | Many data rows → One admin   | CASCADE       |
| tickets_data           | `admin_id`               | admin                | Many tickets → One admin     | CASCADE       |
| tickets_data           | `user_conv_journey_id`   | user_conv_journey    | Many tickets → One journey   | CASCADE       |
| tickets_data           | `team_id`                | team                 | Many tickets → One team      | SET NULL      |

---

## Entity-Relationship Summary

Admins sit at the top of the hierarchy, owning users, agents, teams, session data, and tickets. Users serve as login accounts and may be linked to an admin. Agents are special users assigned to an admin and may belong to multiple teams. Conversation journeys record each chat session, while `chatbot_data` and `tickets_data` capture session metrics and support tickets linked to those journeys. The many-to-many `agent_team` table allows flexible team assignments, and cascading deletes ensure data integrity as records are removed.

This modular design keeps authentication, session tracking, agent management, and ticketing neatly separated yet cohesively linked through clear foreign-key relationships.
