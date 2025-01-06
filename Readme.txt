readme.md 2024-12-16 
Enhanced Music Library Management API 
Overview 
In this assignment, you will develop a Music Library Management API that allows users within an organization to manage their collection of Artists, Tracks, and Albums. Each organization has a single Admin who oversees the system and its users. The API also provides functionality for users to mark their favorite Artists, Albums, and Tracks for quick access and personalization. 
Key Points: 
One Organization, One Admin: Each organization has a single Admin with full control over the system. 
Role-Based Access Control: Users have distinct roles (Admin, Editor, Viewer), with permissions tailored to their responsibilities. 
Entity Relationships: Albums belong to Artists, and Tracks are associated with Albums and Artists. 
Favorites: Users can personalize their experience by marking items as favorites for easy retrieval. Your Task 
Your task is to develop a RESTful API that allows users to manage their music library. The API should support the features listed below. Ensure you follow best practices for API development, including proper status codes, error handling, and response payloads. 
Evaluation Criteria 
API correctness: Ensure all 25(0 to 24) endpoints function as expected with proper request and response handling. 
Code structure and cleanliness. 
Error handling and status code implementation. 
Adherence to best practices in RESTful API design. 
Use Node.js for the backend and any database of your choice. 
Submission 
Create a new repository on GitHub and push your code to it. 
Deploy your API to a hosting service (e.g. Render Heroku, Vercel, AWS, etc.) 
Render is a free hosting service which you can use to deploy your API https://render.com/docs/free Submit the repository link and the hosted API URL/Hosted URL(baseUrl). 
Make sure you proved your hosted URL(baseUrl) in the submission based on that we will check the endpoints; example: base-url:https://your-hosted-url/ or base-url:https://your-hosted url/api/v1 
Based on the base-url we will check the endpoints, Base-url/logout, Base-url/signup, base-url/users, etc. API responses must be in JSON format. 
For GET requests, ensure the response structure matches the examples provided. 
use same endpoint as below
1 / 34 
readme.md 2024-12-16 
Features 
Authentication and Authorization 
Implement authentication and role-based access control using a method of your choice. Roles: 
Admin: Full CRUD operations on all entities, including user management. 
Editor: Can edit and delete Artists, Albums, Tracks, and their own details (e.g., updating their password). 
Viewer: Read-only access to all entities. 
The first user registered in the system automatically becomes an Admin. 
Entity Management 
1. Users: 
Admins can manage users by adding, deleting, and updating their roles (except for other Admins). 2. Artists, Albums, Tracks: 
Full CRUD operations based on role permissions. 
3. Favorites: 
Users can add or remove their favorite Artists, Albums, and Tracks. 
Database Schema 
You are encouraged to design the tables based on the requirements provided. Below are hints for the schema structure. 
1. User Table 
Column Name Type Description 
user_id UUID Unique identifier for the user. 
email VARCHAR User's email address. 
password VARCHAR Encrypted password. 
role ENUM Role (Admin, Editor, Viewer). 
2. Artist Table 
Column Name Type Description 
artist_id UUID Unique identifier for the artist. 
name VARCHAR Name of the artist. 
grammy BOOLEAN Indicates Grammy award status. 
hidden BOOLEAN Visibility toggle. 
3. Album Table
2 / 34 
readme.md 2024-12-16 
Column Name Type Description 
album_id UUID Unique identifier for the album. 
name VARCHAR Album name. 
year INTEGER Release year. 
hidden BOOLEAN Visibility toggle. 
4. Track Table 
Column Name Type Description 
track_id UUID Unique identifier for the track. 
name VARCHAR Track name. 
duration INTEGER Track duration in seconds. 
hidden BOOLEAN Visibility toggle. 
5. Favorites Table 
Column Name Type Description 
favorite_id UUID Reference to the favorite entity. 
Quick Summary of Endpoints: 
Response Format 
All responses must be in JSON format. 
For GET requests, ensure the response structure matches the examples provided. 
Status Codes 
Below is a brief summary of all the endpoints and their key response codes: these status codes will be checked for each endpoint,a nd all get requests should return the same response format as below 
Use the correct HTTP status codes for each operation. 
Handle edge cases with appropriate error messages and status codes (e.g., 400 for bad requests, 401 for unauthorized access, etc.). 
0. GET BASEURL/Logout: 200, 400 
1. POST BASEURL/signup: 201, 400, 409 
2. POST BASEURL/login: 200, 400, 404 
3. GET BASEURL/users: 200, 400, 401 
4. POST BASEURL/users/add-user: 201, 400, 401, 403, 409 
5. DELETE BASEURL/users/:id: 200, 400, 401, 403, 404 
6. PUT BASEURL/users/update-password: 204, 400, 401, 403, 404 
7. GET BASEURL/artists: 200, 400, 401
3 / 34 
readme.md 2024-12-16 
8. GET BASEURL/artists/:id: 200, 401, 403, 404 
9. POST BASEURL/artists/add-artist: 201, 400, 401 
10. PUT BASEURL/artists/:id: 204, 400, 401, 403, 404 
11. DELETE BASEURL/artists/:id: 200, 400, 401, 403, 404 
12. GET BASEURL/albums: 200, 400, 401, 403, 404 
13. GET BASEURL/albums/:id: 200, 401, 403, 404 
14. POST BASEURL/albums/add-album: 201, 400, 401, 403, 400 15. PUT BASEURL/albums/:id: 204, 400, 401, 403, 404 
16. DELETE BASEURL/albums/:id: 200, 400, 401, 403, 404 
17. GET BASEURL/tracks: 200, 400, 401, 403, 404 
18. GET BASEURL/tracks/:id: 200, 400, 401, 403, 404 
19. POST BASEURL/tracks/add-track: 201, 400, 401, 403, 404 20. PUT BASEURL/tracks/:id: 204, 400, 401, 403, 404 
21. DELETE BASEURL/tracks/:id: 200, 400, 401, 403, 404 
22. GET BASEURL/favorites/:category: 200, 400, 401, 403 
23. POST BASEURL/favorites/add-favorite: 201, 400, 401, 403, 404 24. DELETE BASEURL/favorites/remove-favorite/:id: 200, 400, 401, 403, 404 
Endpoints 
Base URL: your-hosted-url/api/v1 
0. GET /logout - Logout a user 
Description: This endpoint is used to logout a user from the system. Request Headers: 
{ 
 "Authorization": "Bearer <token>" 
} 
Request Endpoint: 
GET BASE-URL/logout 
Response Codes to Consider: 
200: User logged out successfully. 
400: Bad Request. 
Responses: 
a. 200 - User Logged Out Successfully
4 / 34 
readme.md 2024-12-16 
{ 
 "status": 200, 
 "data": null, 
 "message": "User logged out successfully.", 
 "error": null 
} 
b. 400 - Bad Request 
{ 
 "status": 400, 
 "data": null, 
 "message": "Bad Request", 
 "error": null 
} 
1. POST /signup - Register a new user 
Description: This endpoint is used to register a new user in the system. Request Endpoint: 
POST BASE-URL/signup 
Request Body: 
{ 
 "email": "admin@example.com", 
 "password": "password" 
} 
Response Codes to Consider: 
201: User created successfully. 
400: Missing fields, Bad Request, Etc. 
409: Email already exists. 
Responses: 
a. 201 - User Created Successfully
5 / 34 
readme.md 2024-12-16 
{ 
 "status": 201, 
 "data": null, 
 "message": "User created successfully.", 
 "error": null 
} 
b. 400 - Bad Request 
{ 
 "status": 400, 
 "data": null, 
 "message": "Bad Request, Reason:${Missing Field}",  "error": null 
} 
c. 409 - Email Already Exists 
{ 
 "status": 409, 
 "data": null, 
 "message": "Email already exists.", 
 "error": null 
} 
2. POST /login - Login a user 
Description: This endpoint is used to login a user in the system. Request Endpoint: 
POST BASE-URL/login 
Request Body: 
{ 
 "email": "admin@example.com", 
 "password": "securePassword123" 
} 
Response Codes to Consider:
6 / 34 
readme.md 2024-12-16 
200: User logged in successfully. 
400: Missing fields, Bad Request, Etc. 
404: User not found. 
Responses: 
a. 200 - User Logged In Successfully 
{ 
 "status": 200, 
 "data": { 
 "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." 
 }, 
 "message": "Login successful.", 
 "error": null 
} 
b. 400 - Bad Request 
{ 
 "status": 400, 
 "data": null, 
 "message": "Bad Request, Reason:${Missing Field}", 
 "error": null 
} 
c. 404 - User Not Found 
{ 
 "status": 404, 
 "data": null, 
 "message": "User not found.", 
 "error": null 
} 
3. GET /users - Retrieve All Users 
Description: Retrieve a list of all users under the same Admin. This endpoint can only be accessed by the Admin user. Pagination is supported using limit and offset. 
Query Parameters: 
limit (optional): Number of records to fetch. Default is 5. 
offset (optional): Number of records to skip. Default is 0. 
role (optional): Filter users by role (Editor or Viewer).
7 / 34 
readme.md 2024-12-16 
Request Headers: 
{ 
 "Authorization": "Bearer <token>" 
} 
Request Endpoint: 
GET BASE-URL/users?limit=5&offset=0&role=Editor or 
GET BASE-URL/users 
Response Codes to Consider: 
200: Users fetched successfully. 
400: Bad Request. 
401: Unauthorized Access. 
Responses: 
a. 200 - Users Fetched Successfully 
{ 
 "status": 200, 
 "data": [ 
 { 
 "user_id": "123e4567-e89b-12d3-a456-426614174000",  "email": "editor1@example.com", 
 "role": "editor", 
 "created_at": "2024-12-03T10:00:00Z" 
 }, 
 ...4 more 
 ], 
 "message": "Users retrieved successfully.",  "error": null 
} 
b. 400 - Bad Request
8 / 34 
readme.md 2024-12-16 
{ 
 "status": 400, 
 "data": null, 
 "message": "Bad Request", 
 "error": null 
} 
c. 401 - Unauthorized Access 
{ 
 "status": 401, 
 "data": null, 
 "message": "Unauthorized Access", 
 "error": null 
} 
4. POST /users/add-user - Add a new user 
Description: Only the Admin can create new users by providing their email, password, and role. The role cannot be "admin" when creating a new user, and users can only create other users with the "editor" or "viewer" roles. 
Request Headers: 
{ 
 "Authorization": "Bearer <token>" 
} 
Request Endpoint: 
POST BASE-URL/users/add-user 
Request Body: 
{ 
 "status": 409, 
 "data": null, 
 "message": null, 
 "error": "Email already exists." 
}
9 / 34 
readme.md 2024-12-16 
Response Codes to Consider: 
201: User created successfully. 
400: Bad Request. 
401: Unauthorized Access. 
403: Forbidden Access. 
409: Email already exists. 
Responses: 
a. 201 - User Created Successfully 
{ 
 "status": 201, 
 "data": null, 
 "message": "User created successfully.", 
 "error": null 
} 
b. 400 - Bad Request 
{ 
 "status": 400, 
 "data": null, 
 "message": "Bad Request", 
 "error": null 
} 
c. 401 - Unauthorized Access 
{ 
 "status": 401, 
 "data": null, 
 "message": "Unauthorized Access", 
 "error": null 
} 
d. 403 - Forbidden Access 
{ 
 "status": 403, 
 "data": null, 
 "message": "Forbidden Access/Operation not allowed.",  "error": null 
}
10 / 34 
readme.md 2024-12-16 
e. 409 - Email Already Exists 
{ 
 "status": 409, 
 "data": null, 
 "message": "Email already exists.", 
 "error": null 
} 
5. DELETE /users/:id - Delete a user 
Description: Only the Admin can delete a user by providing their user ID. Request Headers: 
{ 
 "Authorization": "Bearer <token>" 
} 
Request Endpoint: 
DELETE BASE-URL/users/:user_id 
or 
DELETE BASE-URL/users/123e4567-e89b-12d3-a456-426614174000 
Response Codes to Consider: 
200: User deleted successfully. 
400: Bad Request. 
401: Unauthorized Access. 
403: Forbidden Access. 
404: User not found. 
Responses: 
a. 200 - User Deleted Successfully
11 / 34 
readme.md 2024-12-16 
{ 
 "status": 200, 
 "data": null, 
 "message": "User deleted successfully.", 
 "error": null 
} 
b. 400 - Bad Request : Same as above 
c. 401 - Unauthorized Access : Same as above 
d. 403 - Forbidden Access : Same as above 
e. 404 - User Not Found 
{ 
 "status": 404, 
 "data": null, 
 "message": "User not found.", 
 "error": null 
} 
6. PUT /users/update-password - Update user password 
Description: The user of any role can update their password by providing the old password and a new password. 
Request Headers: 
{ 
 "Authorization": "Bearer <token>" 
} 
Request Endpoint: 
PUT BASE-URL/users/update-password 
Request Body: 
{ 
 "old_password": "oldPassword", 
 "new_password": "newPassword" 
}
12 / 34 
readme.md 2024-12-16 
Response Codes to Consider: 
204: Password updated successfully. 
400: Bad Request. 
401: Unauthorized Access. 
403: Forbidden Access. 
404: User not found. 
Responses: 
a. 204 - Password Updated Successfully 
// No response body 
or 
<empty response> 
b. 400 - Bad Request : Same as above 
c. 401 - Unauthorized Access : Same as above 
d. 403 - Forbidden Access : Same as above 
e. 404 - User Not Found : Same as above 
7. GET /artists - Retrieve All Artists 
Description: Retrieve a list of all artists. 
You can filter artists by Grammy status, visibility, and control the number of records returned using limit and offset. 
Query Parameters: 
limit : Number of records to fetch. Default is 5. 
offset : Number of records to skip. Default is 0. 
grammy : Filter artists by number of Grammy awards artist has won(0 or 10). 
hidden : Filter artists by visibility status(true or false). 
Request Headers: 
{ 
 "Authorization": "Bearer <token>"
13 / 34 
readme.md 2024-12-16 
} 
Request Endpoint: 
GET BASE-URL/artists?limit=5&offset=0&grammy=10&hidden=false or 
GET BASE-URL/artists 
Response Codes to Consider: 
200: Artists fetched successfully. 
400: Bad Request. 
401: Unauthorized Access. 
Responses: 
a. 200 - Artists Fetched Successfully 
{ 
 "status": 200, 
 "data": [ 
 { 
 "artist_id": "123e4567-e89b-12d3-a456-426614174000",  "name": "Adele", 
 "grammy": 5, 
 "hidden": false, 
 }, 
 ...4 more 
 ], 
 "message": "Artists retrieved successfully.", 
 "error": null 
} 
b. 400 - Bad Request : Same as above 
c. 401 - Unauthorized Access : Same as above 
8. GET /artists/:id - Retrieve an Artist 
Description: Retrieve a single artist by providing their artist ID. Request Headers:
14 / 34 
readme.md 2024-12-16 
{ 
 "Authorization": "Bearer <token>" 
} 
Request Endpoint: 
GET BASE-URL/artists/:artist_id 
or 
GET BASE-URL/artists/123e4567-e89b-12d3-a456-426614174000 
Response Codes to Consider: 
200: Artist fetched successfully. 
401: Unauthorized Access. 
403: Forbidden Access. 
404: Artist not found. 
Responses: 
a. 200 - Artist Fetched Successfully 
{ 
 "status": 200, 
 "data": { 
 "artist_id": "123e4567-e89b-12d3-a456-426614174000",  "name": "Adele", 
 "grammy": 5, 
 "hidden": false 
 }, 
 "message": "Artist retrieved successfully.",  "error": null 
} 
b. 401 - Unauthorized Access : Same as above 
c. 403 - Forbidden Access : Same as above 
d. 404 - Artist Not Found: Same as above 
9. POST /artists/add-artist - Add a new Artist
15 / 34 
readme.md 2024-12-16 
Description: Add a new artist to the system. 
Request Headers: 
{ 
 "Authorization": "Bearer <token>" 
} 
Request Endpoint: 
POST BASE-URL/artists/add-artist 
Request Body: 
{ 
 "name": "Eminem", 
 "grammy": 15, 
 "hidden": false 
} 
Response Codes to Consider: 
201: Artist created successfully. 
400: Bad Request. 
401: Unauthorized Access. 
Responses: 
a. 201 - Artist Created Successfully 
{ 
 "status": 201, 
 "data": null, 
 "message": "Artist created successfully.",  "error": null 
} 
b. 400 - Bad Request : Same as above 
c. 401 - Unauthorized Access : Same as above 10. PUT /artists/:id - Update an Artist
16 / 34 
readme.md 2024-12-16 
Description: Update an artist by providing their artist ID, details such as name, Grammy status, and visibility(hidden). 
Request Headers: 
{ 
 "Authorization": "Bearer <token>" 
} 
Request Endpoint: 
PUT BASE-URL/artists/:artist_id 
or 
PUT BASE-URL/artists/123e4567-e89b-12d3-a456-426614174000 
Request Body: 
{ 
 "name": "Eminem", 
 "grammy": 18, 
 "hidden": false 
} 
or any of the fields you want to update. 
{ 
 "name": "Eminem (Slim Shady)" 
} 
Response Codes to Consider: 
204: Artist updated successfully. 
400: Bad Request. 
401: Unauthorized Access. 
403: Forbidden Access. 
404: Artist not found. 
Responses:
17 / 34 
readme.md 2024-12-16 
a. 204 - Artist Updated Successfully : Same as above 
b. 400 - Bad Request : Same as above 
c. 401 - Unauthorized Access : Same as above 
d. 403 - Forbidden Access : Same as above 
e. 404 - Artist Not Found: Same as above 
11. DELETE /artists/:id - Delete an Artist 
Description: Delete an artist by providing their artist ID. 
Request Headers: 
{ 
 "Authorization": "Bearer <token>" 
} 
Request Endpoint: 
DELETE BASE-URL/artists/:artist_id 
Response Codes to Consider: 
200: Artist deleted successfully. 
400: Bad Request. 
401: Unauthorized Access. 
403: Forbidden Access. 
404: Artist not found. 
Responses: 
a. 200 - Artist Deleted Successfully 
{ 
 "status": 200, 
 "data": { 
 "artist_id": "123e4567-e89b-12d3-a456-426614174000"  }, 
 "message": "Artist:${artist_name} deleted successfully.",  "error": null 
}
18 / 34 
readme.md 2024-12-16 
b. 400 - Bad Request : Same as above 
c. 401 - Unauthorized Access : Same as above 
d. 403 - Forbidden Access : Same as above 
e. 404 - Artist Not Found: Same as above 
12. GET /albums - Retrieve All Albums 
Description: Retrieve a list of all albums, can filter the albums by artist and visibility(hidden), and control the number of records returned using limit and offset. 
Query Parameters: 
limit : Number of records to fetch. Default is 5. 
offset : Number of records to skip. Default is 0. 
artist_id : Filter albums by artist ID. 
hidden : Filter albums by visibility status(true or false). 
Request Headers: 
{ 
 "Authorization": "Bearer <token>" 
} 
Request Endpoint: 
GET BASE-URL/albums?limit=5&offset=0&artist_id=123e4567-e89b-12d3-a456- 426614174000&hidden=false 
or 
GET BASE-URL/albums 
Response Codes to Consider: 
200: Albums fetched successfully. 
400: Bad Request. 
401: Unauthorized Access. 
403: Forbidden Access. 
404: Artist not found, not valid artist ID. 
Responses:
19 / 34 
readme.md 2024-12-16 
a. 200 - Albums Fetched Successfully 
{ 
 "status": 200, 
 "data": [ 
 { 
 "album_id": "123e4567-e89b-12d3-a456-426614174000",  "artist_name": "Eminem", 
 "name": "Recovery", 
 "year": 2010, 
 "hidden": false, 
 }, 
 ...4 more 
 ], 
 "message": "Albums retrieved successfully.",  "error": null 
} 
b. 400 - Bad Request : Same as above 
c. 401 - Unauthorized Access : Same as above 
d. 403 - Forbidden Access : Same as above 
13. GET /albums/:id - Retrieve an Album 
Description: Retrieve a single album by providing its album ID. Request Headers: 
{ 
 "Authorization": "Bearer <token>" 
} 
Request Endpoint: 
GET BASE-URL/albums/:album_id 
or 
GET BASE-URL/albums/123e4567-e89b-12d3-a456-426614174000 Response Codes to Consider:
20 / 34 
readme.md 2024-12-16 
200: Album fetched successfully. 
401: Unauthorized Access. 
403: Forbidden Access. 
404: Resource Doesn't Exist. 
Responses: 
a. 200 - Album Fetched Successfully 
{ 
 "status": 200, 
 "data": { 
 "album_id": "123e4567-e89b-12d3-a456-426614174000",  "artist_name": "Eminem", 
 "name": "Recovery", 
 "year": 2010, 
 "hidden": false 
 }, 
 "message": "Album retrieved successfully.",  "error": null 
} 
b. 401 - Unauthorized Access : Same as above 
c. 403 - Forbidden Access : Same as above 
d. 404 - Resource Doesn't Exist: Same as above 
14. POST /albums/add-album - Add a new Album Description: Add a new album to the system. 
Request Headers: 
{ 
 "Authorization": "Bearer <token>" 
} 
Request Endpoint: 
POST BASE-URL/albums/add-album 
Request Body:
21 / 34 
readme.md 2024-12-16 
{ 
 "artist_id": "123e4567-e89b-12d3-a456-426614174000", 
 "name": "Marshall Mathers LP", 
 "year": 2000, 
 "hidden": false 
} 
Response Codes to Consider: 
201: Album created successfully. 
400: Bad Request. 
401: Unauthorized Access. 
403: Forbidden Access. 
404: Resource Doesn't Exist. 
Responses: 
a. 201 - Album Created Successfully 
{ 
 "status": 201, 
 "data": null, 
 "message": "Album created successfully.", 
 "error": null 
} 
b. 400 - Bad Request : Same as above 
c. 401 - Unauthorized Access : Same as above 
d. 403 - Forbidden Access : Same as above 
e. 404 - Resource Doesn't Exist: Same as above 
15. PUT /albums/:id - Update an Album 
Description: Update an album by providing its album ID, details such as name, year, and visibility(hidden). 
{ 
 "Authorization": "Bearer <token>" 
} 
Request Endpoint:
22 / 34 
readme.md 2024-12-16 
PUT BASE-URL/albums/:album_id 
or 
PUT BASE-URL/albums/123e4567-e89b-12d3-a456-426614174000 Request Body: 
{ 
 "name": "Marshall Mathers LP 2", 
 "year": 2013, 
 "hidden": false 
} 
or any of the fields you want to update. 
{ 
 "name": "Marshall Mathers LP 2" 
} 
Response Codes to Consider: 
204: Album updated successfully. 
400: Bad Request. 
401: Unauthorized Access. 
403: Forbidden Access. 
404: Resource Doesn't Exist. 
Responses: 
a. 204 - Album Updated Successfully : Same as above b. 400 - Bad Request : Same as above 
c. 401 - Unauthorized Access : Same as above 
d. 403 - Forbidden Access : Same as above 
e. 404 - Resource Doesn't Exist: Same as above 
16. DELETE /albums/:id - Delete an Album 
Description: Delete an album by providing its album ID.
23 / 34 
readme.md 2024-12-16 
Request Headers: 
{ 
 "Authorization": "Bearer <token>" 
} 
Request Endpoint: 
DELETE BASE-URL/albums/:album_id 
or 
DELETE BASE-URL/albums/123e4567-e89b-12d3-a456-426614174000 
Response Codes to Consider: 
200: Album deleted successfully. 
400: Bad Request. 
401: Unauthorized Access. 
403: Forbidden Access. 
404: Resource Doesn't Exist. 
Responses: 
a. 200 - Album Deleted Successfully 
{ 
 "status": 200, 
 "data": null, 
 "message": "Album:${album_name} deleted successfully.",  "error": null 
} 
b. 400 - Bad Request : Same as above 
c. 401 - Unauthorized Access : Same as above 
d. 403 - Forbidden Access : Same as above 
e. 404 - Resource Doesn't Exist: Same as above
24 / 34 
readme.md 2024-12-16 
17. GET /tracks - Retrieve All Tracks 
Description: Retrieve a list of all tracks, can filter the tracks by artist, album, and visibility(hidden), and control the number of records returned using limit and offset. 
Query Parameters: 
limit : Number of records to fetch. Default is 5. 
offset : Number of records to skip. Default is 0. 
artist_id : Filter tracks by artist ID. 
album_id : Filter tracks by album ID. 
hidden : Filter tracks by visibility status(true or false). 
Request Headers: 
{ 
 "Authorization": "Bearer <token>" 
} 
Request Endpoint: 
GET BASE-URL/tracks?limit=5&offset=0&artist_id=123e4567-e89b-12d3-a456- 426614174000&album_id=123e4567-e89b-12d3-a456-426614174000&hidden=false 
or 
GET BASE-URL/tracks 
Response Codes to Consider: 
200: Tracks fetched successfully. 
400: Bad Request. 
401: Unauthorized Access. 
403: Forbidden Access. 
404: Resource Doesn't Exist. 
Responses: 
a. 200 - Tracks Fetched Successfully 
{ 
 "status": 200, 
 "data": [
25 / 34 
readme.md 2024-12-16 
 { 
 "track_id": "123e4567-e89b-12d3-a456-426614174000",  "artist_name": "Eminem", 
 "album_name": "Recovery", 
 "name": "Not Afraid", 
 "duration": 263, 
 "hidden": false, 
 }, 
 ...4 more 
 ], 
 "message": "Tracks retrieved successfully.",  "error": null 
} 
b. 400 - Bad Request : Same as above 
c. 401 - Unauthorized Access : Same as above 
d. 403 - Forbidden Access : Same as above 
e. 404 - Resource Doesn't Exist: Same as above 
18. GET /tracks/:id - Retrieve a Track 
Description: Retrieve a single track by providing its track ID. Request Headers: 
Request Headers: 
{ 
 "Authorization": "Bearer <token>" 
} 
Request Endpoint: 
GET BASE-URL/tracks/:track_id 
or 
GET BASE-URL/tracks/123e4567-e89b-12d3-a456-426614174000 
Response Codes to Consider: 
200: Track fetched successfully.
26 / 34 
readme.md 2024-12-16 
400: Bad Request. 
401: Unauthorized Access. 
403: Forbidden Access. 
404: Resource Doesn't Exist. 
Responses: 
a. 200 - Track Fetched Successfully 
{ 
 "status": 200, 
 "data": { 
 "track_id": "123e4567-e89b-12d3-a456-426614174000",  "artist_name": "Eminem", 
 "album_name": "Recovery", 
 "name": "Not Afraid", 
 "duration": 263, 
 "hidden": false 
 }, 
 "message": "Track retrieved successfully.",  "error": null 
} 
b. 400 - Bad Request : Same as above 
c. 401 - Unauthorized Access : Same as above 
d. 403 - Forbidden Access : Same as above 
e. 404 - Resource Doesn't Exist: Same as above 
19. POST /tracks/add-track - Add a new Track 
Description: Add a new track to the system. 
Request Headers: 
{ 
 "Authorization": "Bearer <token>" 
} 
Request Endpoint: 
POST BASE-URL/tracks/add-track
27 / 34 
readme.md 2024-12-16 
Request Body: 
{ 
 "artist_id": "123e4567-e89b-12d3-a456-426614174000", 
 "album_id": "123e4567-e89b-12d3-a456-426614174000", 
 "name": "Not Afraid", 
 "duration": 263, 
 "hidden": false 
} 
Response Codes to Consider: 
201: Track created successfully. 
400: Bad Request. 
401: Unauthorized Access. 
403: Forbidden Access. 
404: Resource Doesn't Exist. 
Responses: 
a. 201 - Track Created Successfully 
{ 
 "status": 201, 
 "data": null, 
 "message": "Track created successfully.", 
 "error": null 
} 
b. 400 - Bad Request : Same as above 
c. 401 - Unauthorized Access : Same as above 
d. 403 - Forbidden Access : Same as above 
e. 404 - Resource Doesn't Exist: Same as above 
20. PUT /tracks/:id - Update a Track 
Description: Update a track by providing its track ID, details such as name, duration, and visibility(hidden). 
{ 
 "Authorization": "Bearer <token>" 
}
28 / 34 
readme.md 2024-12-16 
Request Endpoint: 
PUT BASE-URL/tracks/:track_id 
or 
PUT BASE-URL/tracks/123e4567-e89b-12d3-a456-426614174000 Request Body: 
{ 
 "name": "Not Afraid (Explicit)", 
 "duration": 263, 
 "hidden": false 
} 
or any of the fields you want to update. 
{ 
 "name": "Not Afraid (Explicit)" 
} 
Response Codes to Consider: 
204: Track updated successfully. 
400: Bad Request. 
401: Unauthorized Access. 
403: Forbidden Access. 
404: Resource Doesn't Exist. 
Responses: 
a. 204 - Track Updated Successfully : Same as above 
b. 400 - Bad Request : Same as above 
c. 401 - Unauthorized Access : Same as above 
d. 403 - Forbidden Access : Same as above
29 / 34 
readme.md 2024-12-16 
e. 404 - Resource Doesn't Exist: Same as above 
21. DELETE /tracks/:id - Delete a Track 
Description: Delete a track by providing its track ID. 
Request Headers: 
{ 
 "Authorization": "Bearer <token>" 
} 
Request Endpoint: 
DELETE BASE-URL/tracks/:track_id 
or 
DELETE BASE-URL/tracks/123e4567-e89b-12d3-a456-426614174000 
Response Codes to Consider: 
200: Track deleted successfully. 
400: Bad Request. 
401: Unauthorized Access. 
403: Forbidden Access. 
404: Resource Doesn't Exist. 
Responses: 
a. 200 - Track Deleted Successfully 
{ 
 "status": 200, 
 "data": null, 
 "message": "Track:${track_name} deleted successfully.",  "error": null 
}
30 / 34 
readme.md 2024-12-16 
b. 400 - Bad Request : Same as above 
c. 401 - Unauthorized Access : Same as above 
d. 403 - Forbidden Access : Same as above 
e. 404 - Resource Doesn't Exist: Same as above 
22. GET /favorites/:category - Retrieve Favorites 
Description: Retrieve the user's favorite items based on the category(artist, album, or track) provided. Query Parameters: 
category : Category of favorites to retrieve (artist, album, track). 
limit : Number of records to fetch. Default is 5. 
offset : Number of records to skip. Default is 0. 
Request Headers: 
{ 
 "Authorization": "Bearer <token>" 
} 
Request Endpoint: 
GET BASE-URL/favorites/:category?limit=5&offset=0 
or 
GET BASE-URL/favorites/artist 
Response Codes to Consider: 
200: Favorites fetched successfully. 
400: Bad Request. 
401: Unauthorized Access. 
403: Forbidden Access. 
Responses: 
a. 200 - Favorites Fetched Successfully
31 / 34 
readme.md 2024-12-16 
{ 
 "status": 200, 
 "data": [ 
 { 
 "favorite_id": "123e4567-e89b-12d3-a456-426614174000", 
 "category": "artist", 
 "item_id": "123e4567-e89b-12d3-a456-426614174000", // item_id based on category type (artist_id, album_id, track_id) 
 "name": "Eminem", 
 "created_at": "2024-12-03T10:00:00Z" 
 }, 
 ...4 more 
 ], 
 "message": "Favorites retrieved successfully.", 
 "error": null 
} 
b. 400 - Bad Request : Same as above 
c. 401 - Unauthorized Access : Same as above 
d. 403 - Forbidden Access : Same as above 
23. POST /favorites/add-favorite - Add a Favorite 
Description: Add a new favorite item to the user's list. 
Request Headers: 
{ 
 "Authorization": "Bearer <token>" 
} 
Request Endpoint: 
POST BASE-URL/favorites/add-favorite 
Request Body: 
{ 
 "category": "artist", // artist, album, track 
 "item_id": "123e4567-e89b-12d3-a456-426614174000" // item_id based on category type (artist_id, album_id, track_id) 
}
32 / 34 
readme.md 2024-12-16 
Response Codes to Consider: 
201: Favorite added successfully. 
400: Bad Request. 
401: Unauthorized Access. 
403: Forbidden Access. 
404: Resource Doesn't Exist. 
Responses: 
a. 201 - Favorite Added Successfully 
{ 
 "status": 201, 
 "data": null, 
 "message": "Favorite added successfully.", 
 "error": null 
} 
b. 400 - Bad Request : Same as above 
c. 401 - Unauthorized Access : Same as above 
d. 403 - Forbidden Access : Same as above 
e. 404 - Resource Doesn't Exist: Same as above 
24. DELETE /favorites/remove-favorite/:id - Remove a Favorite 
Description: Remove a favorite item from the user's list by providing its favorite ID. Request Headers: 
{ 
 "Authorization": "Bearer <token>" 
} 
Request Endpoint: 
DELETE BASE-URL/favorites/remove-favorite/:favorite_id 
or 
DELETE BASE-URL/favorites/remove-favorite/123e4567-e89b-12d3-a456-426614174000
33 / 34 
readme.md 2024-12-16 
Response Codes to Consider: 
200: Favorite removed successfully. 
400: Bad Request. 
401: Unauthorized Access. 
Responses: 
a. 200 - Favorite Removed Successfully 
{ 
 "status": 200, 
 "data": null, 
 "message": "Favorite removed successfully.",  "error": null 
} 
b. 400 - Bad Request : Same as above 
c. 401 - Unauthorized Access : Same as above d. 403 - Forbidden Access : Same as above 
e. 404 - Resource Doesn't Exist: Same as above
34 / 34 
