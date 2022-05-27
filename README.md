# DPSS Data Dash

This project is something I've had in mind for a while, as a University of Michigan alum, as a developer, and someone fascinated with law and crime. The intention is to bring greater utility to a really compelling and interesting dataset that has been long underserved by the method of its original access platform by making a web application around making the data more accessible, interactive, and graphical.

## Origins of Underlying Data

The university has an on-campus police department known as the Department of Public Safety & Security (DPSS), which makes this data available on their website, likely to try and comply with the [Clery Act](https://en.wikipedia.org/wiki/Clery_Act) of 1990, underwhich the federal government requires higher-education institutions that are involved with federal aid programs to hold record of, and report, [a wide variety of crimes](https://www.empowerelearning.com/blog/what-crimes-do-you-need-to-report-under-the-clery-act/). 

## Where's the original source?
Here: [DPSS Daily Crime & Fire Log](http://dpss.umich.edu/content/crime-safety-data/daily-crime-fire-log/).

## What's wrong with the original application?
- Slow response times
- Must navigate via the calender UI component, which only lets you tab back one month at a time. 
    - If you want January 2000's data, and it's January 2022, be prepared to click "back 1 month" about 264 times to see it.
- No ability to see multiple dates worth of data at once
    - You can only see one date at a time by clicking that date on the calendar
    - If you want to see all the records for that month, better be prepared to click, and wait, about 30x
- No ability to search
    - Want to see the history of crimes in a dorm, or your department's campus building? 
    - Want to look up and see if there are certain crimes or keywords popping up in reports to look for trends?
    - To solve cases like these... you really can't, unless you want to click ~8000 dates and gather all that data manually, or write a script to pull all the data and make it more easily available to search, which is how I ended up deciding to work on this project in the first place.

## Intended Features
- Ability to easily request a given date's data
- Ability to request date-range data
- Ability to search to get subsets of data over time that are relevant to given keyword(/s)
- Ability to view the data on a map so trends can be potentially visualized