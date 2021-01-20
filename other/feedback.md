## Bill

 

* (target flower cover): If looking at proportion of “patch”, the patch area needs to be specified. On Form it’s given as 50 x 50 cm. Might be good to use both metric and Imperial “(about 20 x 20 inches)”…



# Natalia

* some information about the profile of the citizen scientist would be interesting I suggest including a "Edit Profile" option Date of birth, scholarity degree, gender.... would be interesting to ask
* a map with the distribuition of the citizen scientist own coutings would be nice 
* is it possible to include more than one target photo
* Cover page: Please select the picture that best represents the area of the patch covered by your target flower
* I would remove the "pause" button, so that the counting is performed without interruptions and avoiding coutings that begin, for example, in the morning and end in the afternoon....
* isn't there a possibility of including a screen with the surveys of other citizen scientists?? data sharing and openness is one important feature of citizen science projects
* is there a possibility of creating a "Projects" option. For example, some schools may promote an event or a project with a group of students and they can all contribute to this same project, so it would be interesting to allow the users to create and join existing projects.
* habitat could be subdivided in two 1) the habitat type - garden, grassland, forest.... 2) the identification of the localtion - school, house, church, protected area....
* The idea here is to use a pre-defined list of species because people generally make mistakes when typing the names. This is a big issue in biological apps. There are several predefined lists (which are called "classification trees") that can be used to minimize this kind of problem. They generally use what is called the "Darwin Core"



# Ed



* location matching can be used to automatically select the most common species/groups to show on the species panel. 

* it would be useful if a "map view" of surveys is included, where are surveyed locations are shown as icons on a map, icons reflecting the number of surveys on that location, and even some visualization of temporal coverage of each location.

* Species page: this section should have at least two levels, with group icons for higher level taxa (wasps, bees, flies, etc.) that lead to "morphospecies" level entries. Since this will be purely based on visual id, it would be great to curate the local species list to aggregate all species that are visually similar and unlikely to be told apart by naked eye observation or photographs. Users should be able to tag "favorite" species, and there might be some badges on the corners of each species square showing things like achievements, number of observations, or special notes.

* Instructions and tutorials: the app could have an optional "training mode" in which tutorial screens with instructions are shown interactively as the survey is started. Ideally, these tutorials should be designed to be language-agnostic, like IKEA assembly manuals. 

* Habitat: this sounds tricky, as the number of options might escalate to the point it becomes an issue to find the right habitat. I suggest very broad categories that can be later refined server-side by matching location to GIS datasets on landscape.

* Target flower recognition: I like the idea of AI-based image suggestions (based both on image analysis and geolocation matching), but there should be room allowing for uncertainty (for example, a checkbox saying "Looks like..." to flag ids that might need additional confirmation). Would it be possible to have a function to send the picture to something like iNat, so community IDs become an option?

* Counting step: before starting the timer, present a large green "Start" button, so the user starts whenever they are ready. Having a "Pause"/"Resume" button helps deal with interruptions during the count. 
* Having several user customizable options rather than going for a fixed, designer-side choice. Basic options are a tiled view as in the mock-up, or a list (with or without pictures). When using a tile, the tile-size might autoscale to the number of available options. When more than one screen is needed, **let the users decide whether they want to scroll or swipe**.
*  Consider different ways of sorting the items: alphabetically, by known relative abundance, by number previously observed in previous surveys, by number observed in current survey, random, etc.

* A Walking Trail (WT) function can be build by adding a geotracking function (akin to running trackers) and having the clicks on the counting screen be timestamped and geostamped. Also, if flower resources are to be included in the WT, then a second counting screen for plants would be needed. Insect and plant counting screens can be shown together in a split screen, or have only the insect screen displayed but including a button to quickly access the plant screen (since the user has more time to register a plant than a passing insect). Perhaps a less structured "single report" module could be added so users can upload observations they deem worthy even outside of structured surveys. This might help detecting rarer species and unique observations (as infrequent interaction events).




##  Meeting 1

•       The ten-minute timer has a pause and resume option – is this needed? 

•       The location setting will need a manual over-ride - Lat/Lon or GridRef?

•       Auto-select for plant names is unhelpful, easier for user to make the choice

•       For counting flower numbers as floral units within the 50x50cm quadrat, the current PoMS protocol asks for an actual count as an integer, but other approaches could be considered, e.g.using a DAFOR scale, or providing number categories (e.g. 1 flower, < 10 flowers, 10-50 flowers, 50-100 flowers, or > 100 flowers)

•       It might be beneficial to ask participants to take a photo of the whole quadrat to provide a further check for the flower count data provided

•       Insect count: how best to display all taxon groups so that the user can enter counts as quickly and easily as possible, avoiding the need for excessive scrolling while ensuring that icons or other data entry buttons are sufficiently large to avoid mis-entered data? Difficult to strike the best balance. Suggestion that there should be no more than four or six icons per screen? Possibly also a swipe across would be easier than a scroll down to reach other taxon groups (to avoid accidentally adding to counts while trying to scroll down).

•       BC’s Big Butterfly Count app presents users with a long scroll up/down list of the 19 butterfly species covered. But for each species there are + and - buttons that people use to adjust the total seen. This greatly reduces accidental taps during scrolling in my experience [Richard Fox]

•       Insect count: numbers entered need to be easy to edit or delete (if entered by mistake) – the ‘long tap’ option was considered difficult for users, and a manual over-ride might work better

•       Weather API not accurate at local level – unhelpful to have to correct inaccurate info, may be best to insist that users enter data themselves, providing appropriate guidance/illustrations to facilitate this (risk of people submitting records with pre-populated weather data even if this is not an accurate representation of the weather at their location)

•       If weather data is captured automatically it should be as an addition to user data, not a replacement

•       App will capture time of day for the count start/finish

•       It would be desirable to add Help buttons for each element on each page

•       Discussion over how best to handle not recorded/null choices, to make it clear that the user had chosen not to enter the data, rather than accepting a default value simply to complete the survey

•       Claire later thought: the question presented in iRecord to tag counts is not currently featured in the mock-up screens eg. “How did you hear about the FIT Count”? with a dropdown including partner organisations of projects eg. BC, Buglife – this is our way of tracking impact of promotion activities and allowing data from a particular project or group to be collated for feedback.



Francisco E. Fontúrbel : The number of flowers may have 4 categories: < 10 flowers, 10-50 flowers, 50-100 flowers, or > 100 flowers

Carvell, Claire : FF: add 3 option graphics to weather variables to make it clear they DO have to select before hitting Finish

Richard Fox : If the weather defaults are blank rather than having a value then it wouldn't create false data if people just click Finish

Richard Comont : Far better a true lack of data than misleading data!

Richard Fox : Also, need to be sure that we want all the data that are being asked for. Do we really want user-gathered (let alone api generated) weather data for FIT counts? Is it used in analysis of FIT count data?

Richard Fox : I like the big buttons too. But there doesn't seem to be any way to remove accidental taps - that might frustrate users.

Richard Fox : Yes Martin, a long scroll up/down list of the 19 species. But for each species there are + and - buttons that people use to adjust the total seen. This greatly reduces accidental taps during scrolling in my experience

**Cyprus team PoMSKy meeting 7th Dec 2020**

Chat saved:

Carvell, Claire : If anyone wants to type comments into the Chat I will save it and send round afterwards, with the recording.

Carvell, Claire : I have a design template with 3-4 different logo ideas to send round afterwards with the recording as well. We aim to have a common logo but an option to change the wording eg. FIT Count / Pollinator Count etc. 

Carvell, Claire : Species should say "Insects" or "Insect groups" or "Pollinators" (for Chile to include birds) to make it clear that for now, FIT Counts do not record to species level.

Peyton, Jodey M. : Hey Kelly - is it worth sharing this with Elli and Andri too?

Martinou Lab : Once we have the app in Greek sure. I think elli is very busy at the moment with the phd

Peyton, Jodey M. : how about andri?

Carvell, Claire : PoMS UK is also developing a verificaiton tool to be used separately to test and train verifiers to increase the capacity to deal with photographic records

Good to clarify that mini-PoMS-Ky may have to come later, so for now we are focusing on the 10-minute PoMS-Ky count

Pocket guides to plants and insect groups and ability to retain paper forms is good!

Target flower cover, screen 4: maybe remove the option for 'not recorded' from here and transfer it to screen 5 so the user does not have to specify the type of floral units.

A photo of the specific target flower species is important, as well as maybe a second photo of the 50x50 quadrat taken from above to allow scheme organisers to count number of floral units afterwards (this may contain more than one flowering species).

Hey all, thank you very much for this morning! I am sorry, I have a finance meeting I have to go to :(. Have a lovely day :)

The mock up on the browser can be opened on a mobile device to use full screen and tap forward as in the demo!