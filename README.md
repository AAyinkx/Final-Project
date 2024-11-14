# **Final Project (Ash, Saarah & Hanifah) : MindMatch Quiz App🎮🧠**

## Project Description

An interactive Quiz App incorporated with a social media site

## Problem Domain

How can we foster a social community around quizzes while ensuring a positive user experience?

## Site Link

- [Site Link](https://mind-match-virid.vercel.app/)

## Repo Link

- [Site Link](https://github.com/AAyinkx/Final-Project)

## User Stories🐿️

- 🎯 = MVP 🏹 = Stretch

- As a user I want to be able to have an individual profile on a quiz site where I can login🎯
- As a user I want the questions to be tailored to my preferences ( age, topic, difficulty )🏹
- As a user I would like to be able to CREATE, READ, UPDATE and DELETE data - comments, profile, achievements, quiz history, posts🎯
- As a user I would like to compete against other users who are logged in in real-time (Web Sockets)🏹
- As a parent user, I would like to have parental control over my child's profile🏹
- As a user, I want to have a clean, intuitive UI🎯
- As a user I would like to see my achievements on a leader board🏹
- As a user I would like to follow other users and see who I am following and who is following me🏹
- Add a quiz limit (Time first 🎯, Question Stretch🏹)

## Project Planning

![Trello Board](https://trello.com/b/rTJDbrKn/final-project-%F0%9F%A5%B3%F0%9F%8E%86)

- Wireframes

  ![Login Page](<public/final_project 1.png>)
  ![Quiz Categories](<public/final_project 2.png>)
  ![Profile Page](<public/final_project 3.png>)
  ![Challenge/ Users Page](<public/final_project 4.png>)
  ![Quiz Page](<public/final_project 5.png>)
  ![Quiz Result Page](<public/final_project 6.png>)
  ![Stretch Goal](<public/final_project 7.png>)
  ![Leaderboard](<public/final_project 8.png>)

## Database Schema

![DrawSQL Schema](<public/DrawSQL Schema.png>)
![Database Schema](<public/Database Schema.png>)

## Lighthouse Reports

- Desktop Report
  ![Desktop Lighthouse](<public/LightHouse Desktop.png>)

- Mobile Report
  ![Mobile Lighthouse](<public/LightHouse Mobile.png>)
  ![Mobile Lighthouse Reasons](<public/LightHouse Mobile Reasons.png>)

## Libraries, Frameworks & Packages

- **Next** - Allows for server side rendering utilising ReactJS
- **Clerk** - Provides user authentication for our app
- **Clerk Themes** - Provides themes for our Clerk components on our site
- **Framer Motion** - Provides cool animation components
- **html-entities** - NPM package which allows for html entities to be encoded or decoded.
- **Tailwind** - CSS library to style component by class name
- **DaisyUI** - Pre-styled Tailwind components
- **pg** - NPM package which creates database pool to connect application to the database
- **Supabase** - Allows us to create and query Postgres databases
- **Vercel** - Allows us to deploy our app

## Instruction for our App

- Sign up using Clerk which will then take you to ‘Create profile’ page on the app and follow the instructions! (When you input an image on the form it has to be a secure picture otherwise a default image will appear)
- Once your profile has been created you can ‘add posts’ with images and it will display on the ‘Profile Page’. You can view who you are following, Post news feed and your quiz history on this page also.
- On the ‘Profile’ drop down you are able to; ‘Add New Posts’, view ‘Liked Posts’ and ‘Update Your Profile’.
- The ‘Community page’ will show you all the users on the app and here you are able to click on the user profiles and you can hit the ‘Follow’ button to follow the user and view their profile page, quiz history and like their posts. If you click on the users posts you’ll also be able to leave a lovely comment for them which you’ll be able to see below!

## Project Reflection

- 🎯 We managed to create a fully functioning social media quiz app where there are a variety of wuestion provide for the user from an external API
- 💭 We were very optimistic, and maybe too ambitious, at the beginning of the project as we wanted to apply live challenges, a coding sandbox section and even parental controls for younger users. We were quickly humbled during our project plannig when we did a lot of research before starting
- 💭 We are really happy with what we have accomplished and it was an excellent opportunity to bring together everything we've learnt in the course

## Collaboration Reflection

- We worked really well as team colloborating through trell0, discord and google meets
- Our comunication was excellent as a team. We set out a clear planning at the begining of each day to set the goals we were aiming to acheive.
- The programming method that worked best for us was mob programming. We found that it worked best having one person programming at one time and the other team members directing and researching when we got stuck (One driver 🚗 Two navigators 🗺️)

## What bugs did we encounter? 🪲

-

## Help Links

- https://ably.com/blog/websockets-react-tutorial
- https://daisyui.com/docs/install/
- https://joyofcode.xyz/create-a-coding-sandbox
- https://stackoverflow.com/questions/69416308/how-do-i-restrict-the-allowed-age-when-inputting-date-of-birth
- https://stackoverflow.com/questions/69416308/how-do-i-restrict-the-allowed-age-when-inputting-date-of-birth
- https://www.npmjs.com/package/html-entities
- https://www.youtube.com/watch?v=XRa2I6j0J3Y
- https://www.freecodecamp.org/news/how-to-build-a-quiz-app-using-react/
- https://clerk.com/docs/references/react/use-user
- [Quiz API](https://opentdb.com/)
- https://stackoverflow.com/questions/40385133/retrieve-data-from-a-readablestream-object/74237249#74237249
- https://www.freecodecamp.org/news/check-if-a-javascript-string-is-a-url/
- https://regex101.com/library/gXDhi9?filterFlavors=dotnet&filterFlavors=golang&orderBy=LEAST_POINTS&search=url

Instructions on how to run your app:

Reflections:

Please mention the requirements you met and which goals you achieved for this assignment.

🎯 Were there any requirements or goals that you were not quite able to achieve?

🎯 If so, could you please tell us what was it that you found difficult about these tasks?

What went really well and what could have gone better?
Detailing useful external sources that helped you complete the assignment (e.g Youtube tutorials).
Describing errors or bugs you encountered while completing your assignment.
