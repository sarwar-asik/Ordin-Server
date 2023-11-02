### Ordin Backend

## Technologies Used

###### The server is built using the following technologies:

- Node.js :::  The runtime environment for running JavaScript on the server.

- Express :::  A web application framework for routing and handling HTTP requests.

- PostgreSQL :::  A robust, open-source relational database.

- Prisma :::  An Object-Relational Mapping (ORM) tool for interfacing with the database.
- JWT (JSON Web Tokens) :::  For user authentication and authorization.
- Cookie Parser :::  To handle cookies for user sessions.
- Husky :::  A pre-commit and pre-push hook framework for ensuring code quality.
- SSL-Commerce :::  For payment gateway integration.
- Node Mailer  ::: For sending email with password reset and actions

## API Endpoints and Descriptions

The backend server is built with a focus on modularity, security, and performance. It provides comprehensive functionalities to serve the front-end of the web application, ensuring a seamless and secure user experience. The server's use of Node.js and Express, in combination with other technologies, ensures reliable performance and scalability for a wide range of applications.

### modules


### Auth Module

1. **Create a New User Account**
   - **Endpoint:**

```bash
  POST '/sign-up'
```

- **Description:** Allows users to create a new account with validated user data.

2. **Authenticate a User**

   - **Endpoint:** 
```bash 
    POST '/login`
```
   - **Description:** Handles user authentication and generates a JSON Web Token (JWT) for further API access.

3. **Change Password**

   - **Endpoint:** 
```bash
PATCH '/change-password'
```

   - **Description:** Enables users to change their passwords securely and is protected.


4. **Retrieve User Profile**

   - **Endpoint:** 

```bash 
GET '/profile'
```
   - **Description:** Retrieves the user's profile (protected).

5. **Get All Users**

   - **Endpoint:** 

```bash 
GET '/allUsers'
```
   - **Description:** Lists all users and is protected for admin users to prevent unauthorized access to user data.

6. **Update User Profile**

   - **Endpoint:** 

```bash 
PATCH '/update-profile'
```

   - **Description:** Allows users to securely update their profiles. It is protected and includes request validation.

7. **Create Admin User**

   - **Endpoint:** 

```bash
POST ' /create-admin'
```

   - **Description:** Creates admin users  is protected for super-admin users.

8. **Delete User**

   - **Endpoint:** 

```bash
DELETE '/:id'
```

   - **Description:** Permits the deletion of user accounts and is protected by admin and super-admin roles to maintain data integrity.

9. **Get Single User Data**
   - **Endpoint:** 

```bash
GET '/:id'
```
   - **Description:** Allows super-admin and admin roles to retrieve the data of a single user securely.

### Blogs Module

10. **Create a New Blog**

- **Endpoint:**

```bash
POST '/create'
```
- **Description:** Allows admin and super-admin users to create new blog posts.

11. **Get All Blogs**

- **Endpoint:**

```bash
GET '/all-blogs'
```
- **Description:** Retrieves a list of all blog posts.

12. **Delete a Blog**

- **Endpoint:** 

```bash
DELETE '/:id'
```
- **Description:** Permits the deletion of a specific blog post. This endpoint is protected by admin and super-admin roles.

### Categories Module

13. **Create a New Category**

- **Endpoint:** 

```bash
POST '/categories'
```
- **Description:** Allows authorized users to create new categories for blog posts.

14. **Get All Categories**

- **Endpoint:** 

```bash
GET '/categories'
```
- **Description:** Retrieves a list of all available categories.

15. **Get Single Category Data**

- **Endpoint:** 

```bash
GET  '/categories/:id'
```
- **Description:** Allows users to retrieve data of a specific category.

16. **Update Category**

- **Endpoint:** 

```bash 
PATCH /categories/:id
```

- **Description:** Permits users to update the details of a specific category.

17. **Delete Category**

- **Endpoint:** 

```bash
DELETE '/categories/:id'
```

- **Description:** Allows users to delete a specific category.

### Services Module

18. **Create a New Service**

- **Endpoint:** 

```bash
POST '/services'
```
- **Description:** Allows authorized users to create new services.

19. **Get All Services**

- **Endpoint:** 

```bash
GET '/services'
```
- **Description:** Retrieves a list of all available services.

20. **Get Single Service Data**

- **Endpoint:** 
```bash
GET '/services/:id'
```

- **Description:** Allows users to retrieve data of a specific service.

21. **Update Service**

- **Endpoint:** 

```bash 
PATCH '/services/:id'
```
- **Description:** Permits users to update the details of a specific service.

22. **Delete Service**

- **Endpoint:** `DELETE /services/:id`
- **Description:** Allows users to delete a specific service.

### Cart Module

23. **Create a New Cart Item**

- **Endpoint:** 

```bash
POST '/cart'
```
- **Description:** Allows users to add items to their shopping cart and is protected for user, admin, and super-admin roles.

24. **Get All Cart Items**

- **Endpoint:** 
```bash 
GET' /cart'
```
- **Description:** Lists all items in the user's shopping cart and is protected for user, admin, and super-admin roles.

25. **Get Single Cart Item**

- **Endpoint:** 

```bash 
GET /cart/:id
```
- **Description:** Allows users to retrieve data of a single cart item.

26. **Update Cart Item**

- **Endpoint:** 

```bash 
PATCH '/cart/:id'
```

- **Description:** Permits users to update the details of a specific cart item and is protected for user, admin, and super-admin roles.

27. **Delete Cart Item**

- **Endpoint:** 
```bash
DELETE '/cart/:id'
```

- **Description:** Allows users to delete a specific cart item and is protected for user, admin, and super-admin roles.

#### Booking Module

28. **Get All Bookings**

- **Endpoint:** 

```bash
GET '/bookings'
```
- **Description:** Retrieves a list of all bookings, protected for admin and super-admin roles.

29. **Get User's Booking**

- **Endpoint:** 

```bash 
GET '/bookings/userBooking'
```
- **Description:** Lists all bookings for a user.

30. **Get Booking by Service**

- **Endpoint:** 

```bash 
GET '/bookings/:serviceId'
```
- **Description:** Retrieves user bookings for a specific service.

31. **Get Single Booking Data**

- **Endpoint:** 

```bash
GET '/bookings/:id'
```
- **Description:** Allows users to retrieve data of a single booking.

32. **Delete Booking**

- **Endpoint:** 

```bash 
DELETE '/bookings/:id'
```
- **Description:** Permits users to delete a specific booking and is protected for admin, super-admin, and user roles.

33. **Update Booking**

- **Endpoint:** 

```bash 
PATCH '/bookings/:id'
```
- **Description:** Allows users to update the details of a specific booking and is protected for super-admin and admin roles.

### Reviews Module

34. **Create a New Review**

- **Endpoint:** 

```bash
POST' /reviews'
```
- **Description:** Enables users to create new reviews and is protected for user, admin, and super-admin roles.

35. **Get All Reviews**

- **Endpoint:** 

```bash
GET '/reviews'
```
- **Description:** Retrieves a list of all reviews.

36. **Get User's Reviews**

- **Endpoint:** 

```bash
GET '/reviews/userReview'
```
- **Description:** Lists all reviews for a user.

37. **Get Reviews by Service**

- **Endpoint:** 

```bash
GET '/reviews/userReview/:serviceId'
```
- **Description:** Retrieves user reviews for a specific service.

38. **Get Single Review Data**

- **Endpoint:** 

```bash
GET '/reviews/:id'
```
- **Description:** Allows users to retrieve data of a single review.

39. **Update Review**

- **Endpoint:** 

```bash
PATCH '/reviews/:id'
```
- **Description:** Permits users to update the details of a specific review and is protected for admin, user, and super-admin roles.

40. **Delete Review**

- **Endpoint:** 

```bash
DELETE '/reviews/:id'
```
- **Description:** Allows users to delete a specific review and is protected for admin, user, and super-admin roles.

### FAQ Module

41. **Create a New FAQ**

- **Endpoint:** 

```bash
POST '/faq'
```
- **Description:** Allows authorized users to create new FAQs.

42. **Get All FAQs**

- **Endpoint:** 

```bash
GET '/faq'
```
- **Description:** Retrieves a list of all frequently asked questions.

43. **Get Single FAQ Data**

- **Endpoint:** 

```bash
GET '/faq/:id'
```
- **Description:** Allows users to retrieve data of a specific FAQ.

44. **Update FAQ**

- **Endpoint:** 

```bash
GET '/faq/:id'
```
- **Description:** Permits users to update the details of a specific FAQ.

45. **Delete FAQ**

- **Endpoint:** 

```bash
DELETE '/faq:id'
```

- **Description:** Allows users to delete a specific FAQ.

### Payment Module

46. **Initialize Payment**

- **Endpoint:** 

```bash
POST '/payment'
```
- **Description:** Initiates the payment process for services.

47. **Handle Webhook**

- **Endpoint:** 

```bash
POST '/payment/webhook'
```
- **Description:** Handles incoming webhooks from the payment gateway.

48. **Get All Payments**

- **Endpoint:** 
```bash
GET '/payment'
```
- **Description:** Retrieves a list of all payments, protected for admin and super-admin roles.

49. **Get User's Payments**

- **Endpoint:** 

```bash
POST '/payment/userPayment'
```


*** -------------------------------------------Updating payment ------------------------------------***
