# Spree

## Overview
Spree is a Chrome extension that allows you to find on campus events, directly catered to your schedule and interests. The pages we have chosen to implement are the Profile page and Add Events page, showing how the extension could work from two different perspectives. A user, or someone looking for events, can upload personal information and customize the types of events they'd like to see by selecting preferences. An organization may post events with crucial information such as the date, time, location, description, and more. This project uses Firebase Firestore for storing event data. The firebase configuration is included in `firebase.js` and is already set up.


#### Some notes about the pages: 
Although there is a navigation sidebar, it functions independently from the two pages i.e. the pages do not interact with each other. On the Profile page, the only icon that will make a pop-up appear is the Profile icon; all other icons will just make this pop-up disappear. The Add Events page functions similarly. Clicking the Add icon on the Profile page will not make the "add-events" popup appear. You may click on the "x" button on a card to make it disappear, and then click on icon to make it reappear. A fully implemented version, where the pages indeed interact with each other, would have different popups appear depending on the icon you selected. 

The implemented pages do not function directly with a Chrome extension but the idea is that the fully implemented version would be a Chrome extension that works with Google Calendar.

In `profile.html`, the profile picture will appear after saving changes and refreshing the page. 

## Instructions
1. Unzip the project. 
2. Open a terminal inside the project directory and run `npx serve`.
3. Follow the link provided. 
4. Open `profile.html` to access the Profile page or `add-event.html` to access the Add Event page. You can also navigate between the two by changing the end of the URL to `/profile` or `/add-event`.

## Tools/Acknowledgements  
- HTML, CSS, JavaScript
- Firebase Firestore for backend 
- Google Fonts (Erica One, Istok Web)
- SVG icons designed in Figma 