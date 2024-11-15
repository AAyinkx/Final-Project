# **Final Project (Ash, Saarah & Hanifah) : MindMatch Quiz App🎮🧠**

## Project Description

An interactive Quiz App incorporated with a social media site

## Problem Domain

How can we foster a social community around quizzes while ensuring a positive user experience?

## Site Link

- [Site Link](https://mind-match-virid.vercel.app/)

## Repo Link

- [Repo Link](https://github.com/AAyinkx/Final-Project)

## Presentation Link

- [Presentation Link](https://www.canva.com/design/DAGWiH92C-s/6mmq_qEESv5XXSx9ArDTXQ/edit?utm_content=DAGWiH92C-s&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

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

- [Trello Board](https://trello.com/b/rTJDbrKn/final-project-%F0%9F%A5%B3%F0%9F%8E%86)

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

## Route Map

![Route Map 1](<public/route map.png>)
![Route Map 2](<public/route map 2.png>)

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

## Instructions to use App 📝

- Sign up using Clerk which will then take you to ‘Create profile’ page on the app and follow the instructions! (When you input an image on the form it has to be a secure picture otherwise a default image will appear)
- Once your profile has been created you can ‘add posts’ with images and it will display on the ‘Profile Page’. You can view who you are following, Post news feed and your quiz history on this page also.
- On the ‘Profile’ drop down you are able to; ‘Add New Posts’, view ‘Liked Posts’ and ‘Update Your Profile’.
- The ‘Community page’ will show you all the users on the app and here you are able to click on the user profiles and you can hit the ‘Follow’ button to follow the user and view their profile page, quiz history and like their posts. If you click on the users posts you’ll also be able to leave a lovely comment for them which you’ll be able to see below!
- Under ‘Matching activities’ you will have a drop down with ‘cities challenge’ and ‘coding challenge’ both of these challenges have the same concept where you have to click on the correct question box and answer and if its correct the boxes will turn green
- ‘Quiz categories’ Here is where you can see all of our cool categories for our quiz! Click on a category of your choosing and start the quiz
- Finally we have our leaderboard where you can view the scores of the top 10 users. We have split the leaderboard so you can view the category of the quiz, the score percentage and when they attempted the quiz!
- Enjoy!

## Instructions to set up our App on your local machine 📝💻

1.  Go to GitHub repo and fork our Project
2.  Clone your project down to your local computer
3.  Run npm i to get all of the node modules used in our project
4.  Add an '.env.local' file to the root of your project (Your will need to add _your_ clerk publishable key, clerk secret key and your unique database url from supabase here )
    - **You will also need the folling to your 'env' file:**
    - NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/profile
    - NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/createprofile
5.  Go to Supabase and set up a new project
6.  Add you connection string to your 'env' file with the variable name **NEXT_PUBLIC_DATABASE_URL=**
7.  Go to Clerk and set up a new project
8.  Add your Clerk publishable key and secret key to your env file with the variable names **NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=** and **CLERK_SECRET_KEY=**
9.  Go to _src/components/QuizApi5Hanifah.jsx_ line 25 and replace `https://mind-match-virid.vercel.app/api/quiz/?q=${numberOfQuestions}&c=${category}` with `http://localhost:3000/api/quiz/?q=${numberOfQuestions}&c=${category}`
10. Go to _src/components/QuizResults.jsx_ line 31 and replace `https://mind-match-virid.vercel.app/api/add-quiz-results` with `http://localhost:3000/api/add-quiz-results`
11. **NOTE: We do not actually use this page in our site** however, you may also want to change line 18 in _src/hooks/useQuiz.js_ from `https://mind-match-virid.vercel.app/api/quiz/?q=${numberOfQuestions}` to `http://localhost:3000/api/quiz/?q=${numberOfQuestions}`
12. Run npm run dev in your terminal and enjoy!

## Project Reflection

- 🎯 We managed to create a fully functioning social media quiz app where there are a variety of question provide for the user from an external API
- 💭 We were very optimistic, and maybe too ambitious, at the beginning of the project as we wanted to apply live challenges, a coding sandbox section and even parental controls for younger users. We were quickly humbled during our project plannig when we did a lot of research before starting
- 💭 We are really happy with what we have accomplished and it was an excellent opportunity to bring together everything we've learnt in the course

## Collaboration Reflection

- We worked really well as team colloborating through trello, discord and google meets
- Our comunication was excellent as a team. We set out a clear planning at the begining of each day to set the goals we were aiming to acheive.
- The programming method that worked best for us was mob programming. We found that it worked best having one person programming at one time and the other team members directing and researching when we got stuck (One driver 🚗 Two navigators 🗺️)
- We set up git rules and best practices at the start of the project (no push to main, need a review by one other member to merge a branch etc). This proved very useful and reduced possible conflicts.
- We delegated responsibility for different tasks/external applications amongst the group. In general, everyone was kept involved throughout the project.

## What went really well ?

- The collaboration and communication was great, which ensured an efficient workflow and lack of conflicts.
- Git version control was applied regularly and our rules helped with this
- Our planning was thorough and helped keep us organized.
- We utilized skills and knowledge we picked up all throughout the course
- We had numerous bugs/technical challenges we had to overcome. We didn’t panic, were persistent and managed to come up with ways to overcome those challenges.

## What could have gone better

- If we had more time we could have added some of our stretch goals like implementing web sockets

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

## What bugs did we encounter? 🪲

- **The particular api we used did not always return any data** – we fixed this by introducing a time delay and fetching the data again IF the response was empty in our api route.js.
- **In the component that rendered our quiz, for some reason the api data was fetched twice within a few seconds of each other at the start of the quiz**, resulting in a change of questions. Our solution was to introduce a loading page that was visible while this was happening. After the loading page is finished our quiz component is stable.
- **Some pages were failing due to incorrect image urls being chosen by users** – The Next Image component did not like this. We created a custom image component that verified the image url. If the url is unsuitable a default image is used, if the url is fine it is used in the Image component.
- **We initially had some trouble requesting dynamic data from our api route.js from our client component.** We found a solution using Search Params that worked well.
