# API-INSTASTORY-CLONE
An api which provides similar to instagram stories.
link: "https://instastory-clone-api.herokuapp.com/"

<h3>Below are the instructions for using this api with POSTMAN </h3>

<h1> Calls accepted by this API </h1>
<h4> Calls related to the all stories</h4>
<ul>
   <li> Link: "/" , request_type: GET -> gets the homepage </li>
   
   <li> Link: "/story", request_type: GET , params:{page:(the page number) ,limit: (number of items to be shown on the given page number)}--> this returns all the stories persent in the database and present in the given page.</li>
   
   <li> Link: "/story", request_type: POST, body:(form-data), key-value pairs: {caption: (give custom caption),image: (files selected from the local computer), image: (files selected from the local computer)} --> this adds a custom story to the databse.</li>
   
   <li> Link: "/story", request_type: DELETE => Deletes all the stories present in the database.</li>
 </ul>
 
 <h4>Calls related to individual stories </h4>
 <ul>
   <li> Link: "/story/id" , request_type: GET, #id is the object id of the story that needs to be shown, the id can be found out by sending a GET request for all stories and choose the story and put the id in this url ==> returns the story, whose id is used.
   
   <li> Link: "/story/id", request_type: PUT, (id is the object_id of individual story) all possible updation methods are:</li>
          <ul>
            <li> body: (x-www-form-urlencoded), key-value pairs: {caption: (new caption) } => this is used to update the caption only.</li>
            <li> body: (form-data), key-value pairs:{caption: (new caption), image: (new image), number:(the image that should be repplaced)} => here,caption is an optional update and we try to update only one image,and the value of the number: 1 (if the first image of the story needs be replaced) or number: 2 (if second image of the story needs to be replaced).</li>
            <li> body: (form-data), key-value pairs:{caption: (new caption), image: (new image), image: (new image)} => here, caption is optional and we try to update 2 images (so number key is not required here), the order in which the images are uploaded, the same way they replace first and second image.</li>
           </ul>
   
   <li> Link: "/story/id", request_type: DELETE, (id is the object_id of individual story) => Deletes that particular story (whose id is used in the url)
 </ul>
 
 <h4>Calls related to the comments of the stories </h4>
 <ul>
    <li> Link: "/story/id", request_type: POST, body: (x-www-form-urlencoded), key-value pairs: {name: (name of the user who is making a comment),content: (the comment that a user wants to give)}, #here Id is the object_id of the story to which comment should be added ==> this adds the comment with given (name, content) to that particular story.</li>
    <li> Link: "/story/id/comments/id2", request_type: PUT, body: (x-www-form-urlencoded), key-value pairs: {name: (updated name), content: (updated content)}, # here Id is the object_id of the story whose one of its comment is to be updated and Id2 is the id of the comment thta is to be updated ==> this updates the commment of a story.</li>
    <li> Link: "/story/id/comments/id2", request_type: DELETE, #here id is the object_id of the story whose comment needs to be deleted and id2 is the id of the comment which is to be deleted. ==>deletes the comment of a story.</li>
    <li> Link: "/story/id/comments", request_type: DELETE, #here Id is the object_id of that story, whose all comments are to be deleted. ==>deletes all the comments of a story</li>
  </ul>
