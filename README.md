# This is chotha

## Why?

So that we don't waste time before exam by reading the whole book and asking each other "এইটা একটু বুঝা/ এইটা কেমনে হইল/ এইটা বাদ দিমু না পরমু"

## For this we need a website that:

- that provides all the necessary notes/links/refs about certain topic (mostly hard to understand) in a student-friendly way.
- that also provides bangla explanation but technical terms used in english.
- that have question bank (and possible solution of them) from renowed unsversities.

## Essential features:

- To be able to post notes.
- Adding like-dislike or upvote-downvote system to rate a certain note/post.
- Different category of topics for different subjects from different department. For example "pipelining" from "computer architecture" from "CSE".
- Contribution feature. Since all the notes/chothas will be from "kind hearted people" we need to implement a feature where people can send note in markdown format and we publish it as a post. Which format they send is a debatable topic.
- Comment section for queries.
- Being able to request update. (This will be challenging)
- Separate question-bank section.

## TODOs:
### Frontend:
- [ ] post component
- [ ] image support
- [ ] comment section
- [ ] math symbol, equations support
- [ ] image optimization? next-optimized-image
### Backend:
- [ ] image processing (Where do I save images?) in imagekit, settings in imagekit done.
- [ ] version control (Post can be modified. We will store the primary version and last 5 modifications)


## How to:
This is a website similar to blog website or forum idk.\
Some links:\
[Example from next for blog type website](https://github.com/vercel/next.js/tree/canary/examples/blog-with-comment)

![](https://ik.imagekit.io/tpzipiqc99p/87d37fcd83718a93d9698b304_g-DXDTKdJ.png?tr=c-at_max)

![](https://ik.imagekit.io/tpzipiqc99p/87d37fcd83718a93d9698b307_n-ByPyQ5G.png)

```javascript
import { login } from '../../../lib/controllers/user';
import dbConnect from '../../../lib/middlewares/mongoose';

export default async function handle(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'POST': {
      await login(req, res);
      break;
    }
    default: {
      res.json({
        message: 'failed!',
        error: 'Can not handle requests other than POST you better lose yourself in the music the moment you own it you better never let it go go go. you get only one shot do not miss your chance to blow this opportunity comes once in a lifetime yo',
      });
    }
  }
}

```