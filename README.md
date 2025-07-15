# Database Schema Documentation

Outline structure of the `chatbotbuilder` database, detailing each table, its columns, and how they relate to one another. It’s designed to give you a clear picture of entities, their responsibilities, and interdependencies in simple terms.

## 📋 Tables Overview

- **admin**  
- **chatbotbuilder_users**  
- **agent**  
- **team**  
- **agent_team**  
- **user_conv_journey**  
- **chatbot_instance**   
- **chatbot_data** 
- **tickets_data** 
- **chatbot_files**  

---

## 🔍 Table Details

### 1. admin  
Stores business owner records.  

- **Primary key:** `admin_id`  
- **Key fields:**  
  - `owner_name`, `contact_no`, `email`  
  - `website_url`, `company_name`, `sector`  
  - `is_active`, `subscription_active`  
  - `registration_date`, `expiration_date`  

Unique constraints on `email` and `website_url` prevent duplicates.

---

### 2. chatbotbuilder_users  
Holds login credentials and roles.  

- **Primary key:** `user_id`  
- **Key fields:**  
  - `username`, `email`, `password_hash`  
  - `role` (`admin` or `agent`)  
  - `admin_id` → `admin(admin_id)` (nullable)  
  - `registration_date`, `is_active`, `refresh_token`  

Links users to their admin account.

---

### 3. agent  
Represents staff members under an admin.  

- **Primary key:** `agent_id`  
- **Key fields:**  
  - `first_name`, `last_name`  
  - `admin_id` → `admin(admin_id)`  
  - `user_id` → `chatbotbuilder_users(user_id)`  

Each agent has a user login and belongs to one admin.

---

### 4. team  
Defines groups of agents for assignments.  

- **Primary key:** `team_id`  
- **Key fields:**  
  - `team_name`  
  - `admin_id` → `admin(admin_id)`  

---

### 5. agent_team  
Join table modeling many-to-many between agents and teams.  

- **Composite primary key:** (`agent_id`, `team_id`)  
- **Foreign keys:**  
  - `agent_id` → `agent(agent_id)`  
  - `team_id` → `team(team_id)`  

---

### 6. user_conv_journey  
Tracks each user’s chat session.  

- **Primary key:** `user_conv_journey_id` (VARCHAR)  
- **Key fields:**  
  - `user_conversation` (TEXT)  
  - `conv_started`, `conv_ended`  
  - `chatbot_user_id` (nullable)  

---

### 7. chatbot_instance 
Identifies individual chatbot deployments per admin.  

- **Primary key:** `instance_id`  
- **Key fields:**  
  - `instance_name`  
  - `admin_id` → `admin(admin_id)`  
  - `created_at`  

An admin can have multiple chatbot instances.

---

### 8. chatbot_data 
Stores per-session metrics and metadata.  

- **Primary key:** `chatbot_user_id` (VARCHAR)  
- **Key fields:**  
  - `instance_id` → `chatbot_instance(instance_id)`  
  - `chatbot_user_name`, `contact`, `email`  
  - `satisfaction_level`, `total_levels`, `session_level`  
  - `is_terminated`, `timestamp`  
  - `userquery`, `callback_requested`  
  - `user_conv_journey_id` → `user_conv_journey(user_conv_journey_id)`  
  - `audio_data`, `location`, `feedback_details`  
  - `admin_id` → `admin(admin_id)`  
  - `chatbot_number`, `filename`  

---

### 9. tickets_data 
Captures support tickets raised during chats.  

- **Primary key:** `ticket_id` (VARCHAR)  
- **Key fields:**  
  - `ticket_title`, `ticket_created`  
  - `chatbot_user_id`, `chatbot_user_name`, `contact`, `email`  
  - `callback_requested`, `callback_request_resolution_status`  
  - `userquery`, `user_query_resolved`  
  - `user_conv_journey_id` → `user_conv_journey(user_conv_journey_id)`  
  - `is_ticket_resolved`, `ticket_resolved`, `ticket_starred`  
  - `location`, `feedback_details`  
  - `admin_id` → `admin(admin_id)`  
  - `team_id` → `team(team_id)`  
  - `instance_id` → `chatbot_instance(instance_id)`  

---

### 10. chatbot_files 
Manages files (images, videos, PDFs) uploaded per chatbot instance.  

- **Primary key:** `file_id`  
- **Key fields:**  
  - `instance_id` → `chatbot_instance(instance_id)`  
  - `file_url`, `file_type` (`image`/`video`/`pdf`)  
  - `uploaded_at`  

---

## 🔗 Relationships & Dependencies

| Source Table         | FK Column           | Target Table         | Cardinality              | On Delete  |
|----------------------|---------------------|----------------------|--------------------------|------------|
| chatbotbuilder_users | admin_id            | admin                | Many → One               | SET NULL   |
| agent                | admin_id            | admin                | Many → One               | CASCADE    |
| agent                | user_id             | chatbotbuilder_users | One → One                | CASCADE    |
| team                 | admin_id            | admin                | Many → One               | CASCADE    |
| agent_team           | agent_id            | agent                | Many ↔ Many              | CASCADE    |
| agent_team           | team_id             | team                 | Many ↔ Many              | CASCADE    |
| user_conv_journey    | —                   | —                    | Independent sessions     | —          |
| chatbot_instance     | admin_id            | admin                | Many → One               | CASCADE    |
| chatbot_data         | instance_id         | chatbot_instance     | Many → One               | CASCADE    |
| chatbot_data         | user_conv_journey_id| user_conv_journey    | Many → One               | CASCADE    |
| chatbot_data         | admin_id            | admin                | Many → One               | CASCADE    |
| tickets_data         | instance_id         | chatbot_instance     | Many → One               | CASCADE    |
| tickets_data         | user_conv_journey_id| user_conv_journey    | Many → One               | CASCADE    |
| tickets_data         | team_id             | team                 | Many → One               | SET NULL   |
| tickets_data         | admin_id            | admin                | Many → One               | CASCADE    |
| chatbot_files        | instance_id         | chatbot_instance     | Many → One               | CASCADE    |

---

## 📖 Entity-Relationship Summary

1. **Admins** own everything: users, agents, teams, chatbot instances, session data, tickets, and files.  
2. **Users** authenticate and map to an admin; **Agents** extend users with staff details.  
3. **Teams** group agents; **agent_team** ties them many-to-many.  
4. **Chatbot Instances** represent distinct bots per admin.  
5. **Conversations** live in `user_conv_journey`.  
6. **Session data** (`chatbot_data`) and **tickets** (`tickets_data`) both link to a conversation, instance, and admin.  
7. **Files** uploaded to a bot are tracked in `chatbot_files`, tied to an instance.  

This updated schema ensures each chatbot deployment is uniquely tracked, while preserving clear ownership, conversation flow, support tickets, and file management.
