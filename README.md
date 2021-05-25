# Cars register

**FR** 

Should be able register a new car.

Should be able list all categories.

**BR**

Should not be able register a car with an existent license plate.

Should not be able change the license plate of an registered car.

The should be register with availability true as default.

The user wich will register the should be an admin.

<br/>

# List cars

**FR**

Should be able list all available cars.

Should be able lista all cars by category.

Should be able list all cars by cars name

Should e able list all cars by brand

**BR**

User should not be logined to list cars.

<br/>

# Cars especification register

**FR**

Should be possible register a specification to a car.

Should be able list all specifications.

**BR**

Should not be able register an specification to a nonexistent car.

Should not be possible register an existent specification to the same car.

The user wich will register the should be an admin.


<br/>

# Register car images

**FR**

Should be able register the cars images.

Should be able lista **all** cars

**NFR**

Use multer to upload files.

**BR**

The use should be able to regster more than 1 image to the car.

The user wich will register the should be an admin.


<br/>

# Schedule rent

**RF**

Should be able register a rent.


**BR**

The rent should dure at least 24 hours.

Should not be able register a new rent if the user has a rent open.

Should not be able to regist two or more rents to the same car.
