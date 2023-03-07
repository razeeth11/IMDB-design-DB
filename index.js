import express from "express";
import { MongoClient } from "mongodb";

const movies = [
  {
    "id": 1,
    "title": "Bajirao Mastani",
    "year": 2015,
    "trailer": "https://www.youtube.com/watch?v=eHOc-4D8fJY",
    "reviews": [
      {
        "source": "The Times of India",
        "quote": "A grand cinematic experience that should not be missed",
      },
      {
        "source": "Hindustan Times",
        "quote":
          "An epic masterpiece with a brilliant performance by Ranveer Singh.",
      },
    ],
    "artists": [
      {
        "role": "Actor",
        "name": "Ranveer Singh",
      },
      {
        "role": "Actress",
        "name": "Deepika Padukone",
      },
      {
        "role": "Actor",
        "name": "Priyanka Chopra",
      },
    ],
    "genre": "Drama",
    "poster":
      "https://m.media-amazon.com/images/M/MV5BMTg3NTU2ODQ2NF5BMl5BanBnXkFtZTgwNTA4NDY4NjE@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
  },
  {
    "id": 2,
    "title": "Bajrangi Bhaijaan",
    "year": 2013,
    "trailer": "https://www.youtube.com/watch?v=vyX4toD395U",
    "reviews": [
      {
        "source": "The Times of India",
        "quote": "A perfect family entertainer that you must not miss",
      },
      {
        "source": "Hindustan Times",
        "quote":
          "A heart-warming and heartfelt story with a brilliant performance by Salman Khan.",
      },
    ],
    "artists": [
      {
        "role": "Actor",
        "name": "Salman Khan",
      },
      {
        "role": "Actress",
        "name": "Kareena Kapoor",
      },
      {
        "role": "Actress",
        "name": "Harshaali Malhotra",
      },
    ],
    "genre": "Comedy-Drama",
    "poster":
      "https://m.media-amazon.com/images/M/MV5BMTUxMzQ1MjQ1NV5BMl5BanBnXkFtZTgwNjU1NzE3NjE@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
  },
  {
    "id": 3,
    "title": "Sanju",
    "year": 2018,
    "trailer": "https://www.youtube.com/watch?v=1JQ2jw2jctY",
    "reviews": [
      {
        "source": "The Times of India",
        "quote": "A must watch for all Ranbir Kapoor fans",
      },
      {
        "source": "Hindustan Times",
        "quote":
          "A brilliantly made biopic with a stellar performance by Ranbir Kapoor.",
      },
    ],
    "artists": [
      {
        "role": "Actor",
        "name": "Ranbir Kapoor",
      },
      {
        "role": "Actress",
        "name": "Sonam Kapoor",
      },
      {
        "role": "Actor",
        "name": "Anushka Sharma",
      },
    ],
    "genre": "Biography-Drama",
    "poster":
      "https://m.media-amazon.com/images/M/MV5BMjMxOTM4MzU5M15BMl5BanBnXkFtZTgwNjIzNjU2NTM@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
  },
  {
    "id": 4,
    "title": "Dangal",
    "year": 2011,
    "trailer": "https://www.youtube.com/watch?v=x_7YlGv9u1g",
    "reviews": [
      {
        "source": "The Times of India",
        "quote": "An inspiring and motivational story that you must watch",
      },
      {
        "source": "Hindustan Times",
        "quote": "A brilliant masterpiece that you cannot afford to miss",
      },
    ],
    "artists": [
      {
        "role": "Actor",
        "name": "Aamir Khan",
      },
      {
        "role": "Actress",
        "name": "Fatima Sana Shaikh",
      },
      {
        "role": "Actress",
        "name": "Sanya Malhotra",
      },
    ],
    "genre": "Sports-Drama",
    "poster":
      "https://m.media-amazon.com/images/M/MV5BMTQ4MzQzMzM2MV5BMl5BanBnXkFtZTgwMTQ1NzU3MDI@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
  },
  {
    "id": 5,
    "title": "Udta Punjab",
    "year": 2013,
    "trailer": "https://www.youtube.com/watch?v=T2OWizTtP8k",
    "reviews": [
      {
        "source": "The Times of India",
        "quote": "An intense and gripping movie that you must watch",
      },
      {
        "source": "Hindustan Times",
        "quote":
          "A brilliant movie with a powerful performance by Shahid Kapoor and Alia Bhatt.",
      },
    ],
    "artists": [
      {
        "role": "Actor",
        "name": "Shahid Kapoor",
      },
      {
        "role": "Actress",
        "name": "Alia Bhatt",
      },
      {
        "role": "Actor",
        "name": "Kareena Kapoor Khan",
      },
    ],
    "genre": "Crime-Drama",
    "poster":
      "https://m.media-amazon.com/images/M/MV5BMjE5MzI2NDQ3NV5BMl5BanBnXkFtZTgwMjU3MjU2ODE@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
  },
  {
    "id": 6,
    "title": "Sultan",
    "year": 2017,
    "trailer": "https://www.youtube.com/watch?v=wPxqcq6Byq0",
    "reviews": [
      {
        "source": "The Times of India",
        "quote":
          "A brilliantly made movie with a powerful performance by Salman Khan",
      },
      {
        "source": "Hindustan Times",
        "quote":
          "A perfect blend of emotion and drama with a brilliant performance by Salman Khan",
      },
    ],
    "artists": [
      {
        "role": "Actor",
        "name": "Salman Khan",
      },
      {
        "role": "Actress",
        "name": "Anushka Sharma",
      },
      {
        "role": "Actor",
        "name": "Amit Sadh",
      },
    ],
    "genre": "Sports-Drama",
    "poster":
      "https://m.media-amazon.com/images/M/MV5BMTU3NTg1ODQ3M15BMl5BanBnXkFtZTgwMTE3MjU2ODE@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
  },
  {
    "id": 7,
    "title": "Kaabil",
    "year": 2019,
    "trailer": "https://www.youtube.com/watch?v=jK9rOZV_hT0",
    "reviews": [
      {
        "source": "The Times of India",
        "quote": "A brilliantly made revenge story that you must not miss",
      },
      {
        "source": "Hindustan Times",
        "quote": "A powerful and gripping performance by Hrithik Roshan",
      },
    ],
    "artists": [
      {
        "role": "Actor",
        "name": "Hrithik Roshan",
      },
      {
        "role": "Actress",
        "name": "Yami Gautam",
      },
      {
        "role": "Actor",
        "name": "Ronit Roy",
      },
    ],
    "genre": "Drama-Thriller",
    "poster":
      "https://m.media-amazon.com/images/M/MV5BZTJiYmYzYzQtN2QzYS00YmVjLTlkMmEtNDNhMDU1YzY3MjI3XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
  },
  {
    "id": 8,
    "title": "Dilwale",
    "year": 2019,
    "trailer": "https://www.youtube.com/watch?v=R8cemOdH2xM",
    "reviews": [
      {
        "source": "The Times of India",
        "quote":
          "A perfect family drama with a brilliant performance by Shah Rukh Khan",
      },
      {
        "source": "Hindustan Times",
        "quote":
          "A light-hearted and fun-filled movie with a great chemistry between Shah Rukh Khan and Kajol",
      },
    ],
    "artists": [
      {
        "role": "Actor",
        "name": "Shah Rukh Khan",
      },
      {
        "role": "Actress",
        "name": "Kajol",
      },
      {
        "role": "Actress",
        "name": "Kriti Sanon",
      },
    ],
    "genre": "Romance-Comedy",
    "poster":
      "https://m.media-amazon.com/images/M/MV5BMjQ1NDQ5Njk3OV5BMl5BanBnXkFtZTgwMzk4NjE2NjE@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
  },
  {
    "id": 9,
    "title": "Airlift",
    "year": 2015,
    "trailer": "https://www.youtube.com/watch?v=K75pH9XV7Ng",
    "reviews": [
      {
        "source": "The Times of India",
        "quote":
          "A brilliantly made movie with a powerful performance by Akshay Kumar",
      },
      {
        "source": "Hindustan Times",
        "quote":
          "A brilliantly written and directed movie with an amazing performance by Akshay Kumar",
      },
    ],
    "artists": [
      {
        "role": "Actor",
        "name": "Akshay Kumar",
      },
      {
        "role": "Actress",
        "name": "Nimrat Kaur",
      },
      {
        "role": "Actor",
        "name": "Lena",
      },
    ],
    "genre": "Thriller-Drama",
    "poster":
      "https://m.media-amazon.com/images/M/MV5BMTg0NDQ2MzQ2M15BMl5BanBnXkFtZTgwNzI3MTg3NjE@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
  },
  {
    "id": 10,
    "title": "Rustom",
    "year": 2014,
    "trailer": "https://www.youtube.com/watch?v=n_hXUv2AnHg",
    "reviews": [
      {
        "source": "The Times of India",
        "quote":
          "A brilliantly made movie with a powerful performance by Akshay Kumar",
      },
      {
        "source": "Hindustan Times",
        "quote": "A gripping story with a brilliant performance by Akshay Kumar",
      },
    ],
    "artists": [
      {
        "role": "Actor",
        "name": "Akshay Kumar",
      },
      {
        "role": "Actress",
        "name": "Ileana DCruz",
      },
      {
        "role": "Actor",
        "name": "Arjan Bajwa",
      },
    ],
    "genre": "Crime-Drama",
    "poster":
      "https://m.media-amazon.com/images/M/MV5BMTU2ODc2MzkzMV5BMl5BanBnXkFtZTgwNzg5MzY5ODE@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
  },
];

const app = express();
const PORT = 4150;

// const MONGO_URL = "mongodb://127.0.0.1";
const MONGO_URL = "mongodb+srv://IMDB:imdb123@cluster0.mxmqnga.mongodb.net";
const client = new MongoClient(MONGO_URL); // dial
// Top level await
await client.connect(); // call
console.log("Mongo is connected !!!  ");

app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});

app.post("/movies", express.json() , async function (request, response) {
  const  data  = request.data
  console.log(data);

  const result = await client
    .db("IMDB")
    .collection("designDB")
    .insertMany(data)

    response.send(result)
});

app.get("/movies",async function (request, response) {
  const data = await client.db("IMDB").collection("designDB").find({}).toArray()

  response.send(data);
});

app.get("/movies/:title", async function (request, response) {
  const { title } = request.params;
  // console.log(title);
  const finData = await client
    .db("IMDB")
    .collection("designDB")
    .findOne({ title: title });
  {
    finData
      ? response.send(finData)
      : response
          .status(404)
          .send({ message: "Try first letter caps or movie not exist" });
  }
});

app.put("/movies/:title",express.json(), async function (request, response) {
  const { title } = request.params;
  const data = request.body;
  console.log(data);
  console.log(title);
  const finData = await client
    .db("IMDB")
    .collection("designDB")
    .updateOne({ title: title }, { $set:  data });
  {
    finData
      ? response.send({ message: "successfully updated" })
      : response
          .status(404)
          .send({ message: "Try first letter caps or movie not exist" });
  }
});

app.get("/movies/:title/review", async function (request, response) {
  const { title } = request.params;
  // console.log(title);
  const finData = await client
    .db("IMDB")
    .collection("designDB")
    .findOne({ title : title },{rating : 1,trailer : 1});
  {
    finData
      ? response.send(finData)
      : response
          .status(404)
          .send({ message: "Try first letter caps or movie not exist" });
  }
});


app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
