# Recipes API

### Base Endpoint

`https://tt75-recipes.herokuapp.com/`

## Routes

- POST`/api/auth/register` - Registers a new user
  - Expects:
    ```
      {
        "username": "",
        "password": ""
      }
    ```
  - Returns:
    ```
      {
        "username": "",
        "password": "" (hashed)
      }
    ```
- POST`/api/auth/login` - Logs in an existing user
  - Expects:
    ```
      {
        "username": "",
        "password": ""
      }
    ```
  - Returns:
    ```
      {
        "message": "",
        "token": ""
      }
    ```
- GET`/api/recipes/` - Returns a list of all recipes - Authorization header required
  - Returns:
    ```
    [
      {
          "recipe_id": ,
          "title": "",
          "source": "",
          "instructions": "",
          "category_id": ,
          "user_id":
      },
      {
          "recipe_id": ,
          "title": "",
          "source": "",
          "instructions": "",
          "category_id": ,
          "user_id":
      },
      {
          "recipe_id": ,
          "title": "",
          "source": "",
          "instructions": "",
          "category_id": ,
          "user_id":
      }
    ]
    ```
- GET `/api/recipes/:id` - takes in a recipe id in the URL and returns that specific recipe - Authorization header required
  - Returns:
    ```
      {
        "recipe_id": ,
        "title": "",
        "source": "",
        "instructions": "",
        "category": "",
        "ingredients": [
            {
                "name": "",
                "measurement": ""
            }
        ],
        "created_by": ""
      }
    ```
- POST`/api/recipes/` - takes in a new recipe and returns the newly created recipe - Authorization header required
  - Expects:
    ```
      {
        "title": "",
        "source": "",
        "instructions": "",
        "ingredients": [ {"name": "", "measurement": ""} ],
        "category": ""
      }
    ```
  - Returns:
    ```
      {
        "recipe_id": ,
        "title": "",
        "source": "",
        "instructions": "",
        "category_id": ,
        "user_id":
      }
    ```
- PUT`/api/recipes/:id` - takes in a recipe id in the URL and a recipe object in the req body - returns newly updated recipe - Authorization header required
  - Expects:
    ```
      {
        "title": "",
        "source": "",
        "instructions": "",
        "ingredients": [ {"name": "", "measurement": ""} ],
        "category": ""
      }
    ```
  - Returns:
    ```
      {
        "recipe_id": ,
        "title": "",
        "source": "",
        "instructions": "",
        "category": "",
        "ingredients": [
            {
                "name": "",
                "measurement": ""
            }
        ],
        "created_by": ""
      }
    ```
- DELETE`/api/recipes/:id` - takes in a recipe id in the URL, returns deleted recipe - Authorization header required
  - Returns:
    ```
      {
        "recipe_id": ,
        "title": "",
        "source": "",
        "instructions": "",
        "category": "",
        "ingredients": [
            {
                "name": "",
                "measurement": ""
            }
        ],
        "created_by": ""
      }
    ```
- GET`/api/categories/` - returns a list of all categories - Authorization header required
  - Returns:
  ```
  [
    {
        "category_id": 1,
        "category_name": "sandwiches"
    },
    {
        "category_id": 2,
        "category_name": "dinner"
    },
    {
        "category_id": 3,
        "category_name": "breakfast"
    }
  ]
  ```
