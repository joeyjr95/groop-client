This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Groop Client

[Live App](https://grooplist.com/)  
Demo username: username1  
Demo password: Password1!  
[Client Repo](https://github.com/joeyjr95/groop-client)  
[API Repo](https://github.com/quasarwei/groop-api)

## Tech Stack

Front-end: React, SCSS
Backend: Node, Express, Knex, PostgreSQL, Mocha, Chai

## Overview

Groop is a task manager for family, friends, or work. Organize
tasks and members from multiple groups and view a scoreboard to
effectively finish tasks done on time. Members accumulate points
based on a finished task's priority level. Get status updates and
weekly reminders with optional email notifications.

## Screenshots

<p align="center">
<img src="./src/images/mobile/groop_landing_rs.jpg" width="200"> 
<img src="./src/images/mobile/groop_about_rs.jpg" width="200"> 
<img src="./src/images/mobile/groop_agenda_new_rs.jpg" width="200"> 
<img src="./src/images/mobile/groop_agenda_all_rs.jpg" width="200"> 
<img src="./src/images/mobile/groop_filter_rs.jpg" width="200"> 
<img src="./src/images/mobile/groop_sidebar_dash_rs.jpg" width="200"> 
<img src="./src/images/mobile/groop_sidebar_group_rs.jpg" width="200"> 
<img src="./src/images/mobile/groop_add_task_rs.jpg" width="200"> 
<img src="./src/images/mobile/groop_edit_task_rs.jpg" width="200"> 
<img src="./src/images/mobile/groop_group_settings_rs.jpg" width="200"> 
<img src="./src/images/mobile/groop_account_settings_rs.jpg" width="200"> 
</p>

### Landing Page

The Landing page has access to Login and Signup while also displaying what each page on the app does in the about section

### Dashboard

Allows users access to create a group, view their specific tasks, view all their different group's tasks, filter by group, category, group members, priority, and also search for tasks by description and taskname. Users also have access to editing their tasks and deleting them from this page.

### Group Page

Allows users access to create tasks, filter and search categories, group members, priorities, descriptions, and tasknames. There is also a chart that compares all the Users by their tasks weighted by priority. Users also have access to editing their tasks and deleting them from this page.

### Group Settings

Allows users to create and delete categories, add and remove users from the group, and also has an option to delete the group.

### Settings

Allows users to change their email and their password, and also opt out of the email notifications
