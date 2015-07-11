# WhatsANS
Automatic answers to various type of questions asked in whatsapp as message

Run As : Runs using tasker and javascript on an emultor for automatic response for a question.

# Instruction Changes

1. You need to have root permissions in your android phone or emulator to proceed further.
2. Install tasker app, whatsTasker app (for easy integration with whatsapp, without it follow below instructions- beware it will be buggy ) and put the file  "TaskerProfile.prf.xml" at //Tasker/Profiles/ and "FunAPIs.txt", "MagicAnswer.js" at path //Tasker/, "SetGlobals.tsk.xml" at //Tasker/tasks/.
3. Open tasker and at the inital screen - long-click on the tab "Profiles" and then "Import".
4. Open the "TaskerProfile.prf.xml" from //Tasker/Profiles
5. Similarly, long-click on tab "Tasks" and import "SetGlobals.tsk.xml".
6. Click on the task created and long-click on second step and "Enable" it (option at top right). 
7. Now test run it once by clicking on "go" button at bottom left in the shape of traingle, after 2-3 seconds again long-click on second step and "Disable" it (option at top right). 
8. Click on the profile created in the first tab and long-click on the task "MagicAnswer" , then click on "Add Exit task" (if it not appears , click on "Add task").
9. You will see list of tasks and select "SetGlobals" in it.
10. Now test-run the profile by clicking on "MagicAnswer" and triangle button at bottom-left. If you don't get any error notifications, then it will run without any problems.

# Without WhatsTasker

1. Follow same steps as above but on step 4 , select "TaskerProfile_WO_WT.prf.xml" instead of "TaskerProfile.prf.xml".

# Testing

1. Send "#imdb Titanic" from external whatsapp to your phone.
2. It will process the request and send automatic message to external phone about the plot of movie "Titanic"
3. The format should be "#key_word [input_word]" . Other example tests:-
    i.    #imdbRating [movie_name/serial_name]- Imdb Ratings of any movie - movie with spaces should be replaced with     underscores.
    ii.   #dic [word]- Meaning of any word
    iii.  #wiki [any_name]  - Small info about the name mentioned
4.  Add more fun APIs in FunAPIs.txt in the format :-
      API Name |^|#key_word which is unique to all apis and used to differentiate the type of requests |^| #key_word2 alterante keyword which can also be used for the same request |^|API Url ending with '=' - which takes [input_word] as last parameter or it should have {keyWord} in it - which is replaced by [input_word] |^| Javascript function that takes 'data' as parameter and return 'response' which should be the magic answer. |^| GET/POST type of request
