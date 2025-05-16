const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

// memory
let postsData = {
  count: 2,
  posts: [
    {
      id: "1",
      title: "Check out my cat",
      content: "This is my cat whiskers, he is the best cat in the world",
      imageUrl: "https://github.com/mxrguspxrt/mobile/raw/main/cat1.jpeg"
    },
    {
      id: "2",
      title: "My cat is the best",
      content: "My cat is the best cat in the world, he is so cute and fluffy",
      imageUrl: "https://github.com/mxrguspxrt/mobile/raw/main/cat2.jpeg"
    }
  ]
};

let commentsData = [
  {
    postId: "1",
    name: "Tester 1",
    comment: "Hey, nice cat"
  },
  {
    postId: "2",
    name: "Catlover",
    comment: "Love this cat"
  },
  {
    postId: "1",
    name: "Cat hater",
    comment: "I hate this cat   "
  }
];

// Get all posts
app.get('/posts', (req, res) => {
  res.json(postsData);
});

// Add a comment
app.post('/add-comment', (req, res) => {
  console.log("Received post on ", req.body);
  commentsData.push(req.body);
  res.json({ success: true });
});

// Get a single post by ID
app.get('/post/:postId', (req, res) => {
  res.json(postsData.posts.find(x => x.id == req.params.postId));
});

// Get comments for a post
app.get('/post/:postId/comments', (req, res) => {
  res.json(commentsData.filter(x => x.postId == req.params.postId));
});

// Create a new post
app.post('/add-post', (req, res) => {
  const { title, content, imageUrl } = req.body;
  if (!title || !content || !imageUrl) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  // Generate a new unique id
  const newId = (parseInt(postsData.posts[postsData.posts.length - 1]?.id || "0") + 1).toString();
  const newPost = { id: newId, title, content, imageUrl };
  postsData.posts.push(newPost);
  postsData.count = postsData.posts.length;
  res.json(newPost);
});

// Delete a post by ID
app.delete('/post/:postId', (req, res) => {
  const { postId } = req.params;
  const index = postsData.posts.findIndex(p => p.id === postId);
  if (index === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }
  // Remove post
  postsData.posts.splice(index, 1);
  postsData.count = postsData.posts.length;
  commentsData = commentsData.filter(c => c.postId !== postId);
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});