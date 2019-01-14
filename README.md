# Question 1

The SQL written for question one is in the file question_one.sql at the end.
The file can be executed for using SQLite with the following:

```bash
  $> cat question_one.sql | sqlite3 db
```

# Question 2

## Running the app:

If you don't have yarn, then `npm install -g yarn`. Then:

```bash
  $> yarn install
  $> yarn start
```

The app uses [parcel](https://parceljs.org/) to build it.


## About the App:

Based on the simplicity of the problem, instead of going way overkill with a framework like rails, or even having a backend whatsoever, it felt like the right thing to simply use javascript here. In that vain, I avoided any runtime dependencies, even jQuery. Though I often prefer using libraries like Ramda to simplify things. Note that the built js here is <3kb.

Because of this, I believe it may not look like most MVC things you see, but the division of concerns should be very clear here, in that some basic code acts as the controller- just by attaching handlers to the form. Then we generate a model from the input, and use that model to generate a view.

I did something, that I believe to also be unusual here by returning a class as a `Valid` or `Invalid` constructor. The inclination to do this came from my background using a typed language- specifically Elm.
