# iChallenge

A site were you can challenge everybody on the world wide web


### User Stories
Minimum that users should be able to do.

- be able to browse all the challenges
- be able browse by category
- Create a Challenge
- Enter a Challenge

Additional actions users should be able to do
- Sign in/up
- View Profiles with Users recent entries and recently created Challenges
- Vote on entries
- Edit/Delere their own entry and created Challenges

## Unrealized Features
- User Auth
- Profiles
- Ranking system based on points gained from voting on entries,entering/placing/createing challenges
- Ordering entries by votes or time
- Live stream challenges with live chat
- comments on challenges and/or entries
- Topics/Catagories for challenges ex(Sports, Food, Gaming, Photography, Memes...)

## The Process

[pic]: https://imagebin.ca/v/3U9qKW4RRNsv.jpeg

It started with and idea and a memory, idea was originally a live feed challenge site. That was simplified to the current set up.
A design sketch was made... [pic]
and then work started...
### Hurdles and Issues
Angular can be finicky,

nested schemas can be tricky,

just keep trying till it works..(y)

Building the api routes in Express was the easy part. Getting react to play nice was the hard part. Coding the project in React quickly stalled and for the sake of time I switched to Angular(1.x.x) **two way data binding for the win!** which I am more familiar with. 

-Bugs
Interesting one when implementing voting and orderBy. Passing $index into a function to find the object to update. When one entry gets enough votes to overtake and other its vote buttons no longer relate to to object. Removed the feature

The Show box as some sizing irregularites

need to prevent blank form input


